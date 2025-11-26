import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/**
 * Migration: Create DISCOM-style billing schema
 * Based on BEST Undertaking bill structure
 */
async function migrateBillingSchema() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Check if sites table exists
    const sitesTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'sites'
      );
    `);

    console.log('📋 Creating billing_accounts table...');
    const siteIdColumn = sitesTableExists.rows[0].exists 
      ? 'site_id UUID REFERENCES sites(site_id) ON DELETE SET NULL,'
      : 'site_id UUID,';
    
    const billingAccountsSQL = 
      `CREATE TABLE IF NOT EXISTS billing_accounts (
        billing_account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        ${siteIdColumn}
        consumer_number VARCHAR(50) UNIQUE NOT NULL,
        ca_number VARCHAR(50),
        service_number VARCHAR(50),
        installation_number VARCHAR(50),
        tariff_category VARCHAR(20) NOT NULL DEFAULT 'LT I B',
        supply_type VARCHAR(10) DEFAULT '1P',
        ward VARCHAR(50),
        cycle VARCHAR(10),
        book_folio_number VARCHAR(50),
        sanctioned_load_kw DECIMAL(10, 3),
        security_deposit DECIMAL(10, 2),
        billing_address TEXT,
        supply_address TEXT,
        meter_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_billing_account_user FOREIGN KEY (user_id) REFERENCES users(user_id)
      );`;
    
    await client.query(billingAccountsSQL);

    await client.query('CREATE INDEX IF NOT EXISTS idx_billing_accounts_user_id ON billing_accounts(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_billing_accounts_consumer_number ON billing_accounts(consumer_number)');
    console.log('✅ billing_accounts table created\n');

    console.log('📋 Creating bills table (DISCOM-style)...');
    // Check if old bills table exists and drop it if it doesn't have billing_account_id
    const billsTableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'bills' 
        AND column_name = 'billing_account_id'
      );
    `);
    
    if (billsTableCheck.rows[0].exists === false) {
      // Old bills table exists without billing_account_id, we'll create a new one
      // For now, rename old table to bills_old
      const oldBillsExists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'bills'
        );
      `);
      
      if (oldBillsExists.rows[0].exists) {
        console.log('  ⚠️  Old bills table exists, renaming to bills_old...');
        await client.query('ALTER TABLE IF EXISTS bills RENAME TO bills_old;');
      }
    }
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS bills (
        bill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        billing_account_id UUID NOT NULL REFERENCES billing_accounts(billing_account_id) ON DELETE CASCADE,
        bill_month VARCHAR(20) NOT NULL,
        bill_period_start DATE NOT NULL,
        bill_period_end DATE NOT NULL,
        bill_date DATE NOT NULL,
        invoice_number VARCHAR(100) UNIQUE,
        due_date DATE,
        current_charges_raw DECIMAL(10, 2) DEFAULT 0,
        other_charges DECIMAL(10, 2) DEFAULT 0,
        total_current_charges DECIMAL(10, 2) DEFAULT 0,
        previous_bill_amount DECIMAL(10, 2) DEFAULT 0,
        payment_received_amount DECIMAL(10, 2) DEFAULT 0,
        payment_received_date DATE,
        net_arrears DECIMAL(10, 2) DEFAULT 0,
        total_bill DECIMAL(10, 2) DEFAULT 0,
        rounded_bill_amount DECIMAL(10, 2) DEFAULT 0,
        bill_amount_before_due DECIMAL(10, 2),
        bill_amount_after_due DECIMAL(10, 2),
        status VARCHAR(20) DEFAULT 'pending',
        paid_at TIMESTAMP,
        is_synthetic BOOLEAN DEFAULT false,
        raw_bill_json JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_bills_billing_account_id ON bills(billing_account_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bills_bill_month ON bills(bill_month)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bills_status ON bills(status)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bills_due_date ON bills(due_date)');
    console.log('✅ bills table created\n');

    console.log('📋 Creating bill_line_items table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS bill_line_items (
        line_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        bill_id UUID NOT NULL REFERENCES bills(bill_id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        description TEXT,
        amount DECIMAL(10, 2) NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_bill_line_items_bill FOREIGN KEY (bill_id) REFERENCES bills(bill_id)
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_bill_line_items_bill_id ON bill_line_items(bill_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bill_line_items_type ON bill_line_items(type)');
    console.log('✅ bill_line_items table created\n');

    console.log('📋 Creating meter_readings table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS meter_readings (
        reading_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        billing_account_id UUID NOT NULL REFERENCES billing_accounts(billing_account_id) ON DELETE CASCADE,
        bill_id UUID REFERENCES bills(bill_id) ON DELETE SET NULL,
        meter_number VARCHAR(50) NOT NULL,
        reading_date DATE NOT NULL,
        previous_reading DECIMAL(10, 2),
        current_reading DECIMAL(10, 2),
        multiplier DECIMAL(5, 2) DEFAULT 1.0,
        units_consumed_kwh DECIMAL(10, 2) NOT NULL,
        contract_demand_kva DECIMAL(10, 2),
        connected_load_kw DECIMAL(10, 2),
        power_factor DECIMAL(5, 3),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_meter_readings_billing_account FOREIGN KEY (billing_account_id) REFERENCES billing_accounts(billing_account_id)
      );
    `);

    await client.query('CREATE INDEX IF NOT EXISTS idx_meter_readings_billing_account_id ON meter_readings(billing_account_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_meter_readings_bill_id ON meter_readings(bill_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_meter_readings_reading_date ON meter_readings(reading_date)');
    console.log('✅ meter_readings table created\n');

    await client.query('COMMIT');
    console.log('✅ Billing schema migration completed successfully!\n');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run migration
migrateBillingSchema()
  .then(() => {
    console.log('Migration completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration error:', error);
    process.exit(1);
  });
