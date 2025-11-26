import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/**
 * Migration: Create DISCOM-related tables for net-metering workflow
 */
async function migrateDiscomSchema() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    console.log('📋 Creating discom_applications table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS discom_applications (
        application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        application_number VARCHAR(50) UNIQUE NOT NULL,
        application_type VARCHAR(50) DEFAULT 'net_metering',
        status VARCHAR(50) DEFAULT 'submitted',
        solar_capacity_kw DECIMAL(10, 2),
        property_type VARCHAR(50),
        property_address TEXT,
        electricity_provider VARCHAR(100),
        consumer_number VARCHAR(50),
        sanctioned_load_kw DECIMAL(10, 2),
        roof_area_sqft DECIMAL(10, 2),
        installation_type VARCHAR(50) DEFAULT 'rooftop',
        notes TEXT,
        estimated_approval_date DATE,
        approved_at TIMESTAMP,
        grid_connected_at TIMESTAMP,
        rejection_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query('CREATE INDEX IF NOT EXISTS idx_discom_applications_user_id ON discom_applications(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_discom_applications_status ON discom_applications(status)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_discom_applications_number ON discom_applications(application_number)');
    console.log('✅ discom_applications table created\n');

    console.log('📋 Creating discom_application_history table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS discom_application_history (
        history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES discom_applications(application_id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL,
        message TEXT,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query('CREATE INDEX IF NOT EXISTS idx_discom_history_application_id ON discom_application_history(application_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_discom_history_status ON discom_application_history(status)');
    console.log('✅ discom_application_history table created\n');

    console.log('📋 Creating grid_sync_status table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS grid_sync_status (
        sync_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        meter_id UUID UNIQUE,
        sync_status VARCHAR(50) DEFAULT 'not_configured',
        export_enabled BOOLEAN DEFAULT false,
        last_sync TIMESTAMP,
        grid_voltage DECIMAL(10, 2),
        frequency DECIMAL(10, 3),
        total_export_kwh DECIMAL(15, 3) DEFAULT 0,
        total_import_kwh DECIMAL(15, 3) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query('CREATE INDEX IF NOT EXISTS idx_grid_sync_meter_id ON grid_sync_status(meter_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_grid_sync_status ON grid_sync_status(sync_status)');
    console.log('✅ grid_sync_status table created\n');

    // Seed sample DISCOM applications for demo users
    console.log('📋 Seeding sample DISCOM applications...');
    
    // Get demo users
    const usersResult = await client.query(
      "SELECT user_id, email FROM users WHERE email LIKE 'demo%@eaas.com' ORDER BY email"
    );
    
    if (usersResult.rows.length > 0) {
      const statuses = ['grid_connected', 'approved', 'site_inspection_completed', 'under_review', 'submitted'];
      
      for (let i = 0; i < Math.min(usersResult.rows.length, 5); i++) {
        const user = usersResult.rows[i];
        const status = statuses[i] || 'submitted';
        
        // Check if user already has an application
        const existingApp = await client.query(
          'SELECT application_id FROM discom_applications WHERE user_id = $1',
          [user.user_id]
        );
        
        if (existingApp.rows.length === 0) {
          const appNumber = `NM-${Date.now()}-${i}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
          
          const appResult = await client.query(
            `INSERT INTO discom_applications (
              user_id, application_number, application_type, status,
              solar_capacity_kw, property_type, property_address,
              electricity_provider, consumer_number, sanctioned_load_kw,
              roof_area_sqft, installation_type,
              estimated_approval_date, approved_at, grid_connected_at, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING application_id`,
            [
              user.user_id,
              appNumber,
              'net_metering',
              status,
              5 + (i * 2), // 5kW to 13kW
              i % 2 === 0 ? 'residential' : 'commercial',
              `${100 + i} Solar Street, Green City`,
              'State Electricity Board',
              `CONS-${100000 + i}`,
              3 + i, // 3kW to 7kW sanctioned load
              500 + (i * 100), // 500 to 900 sqft
              'rooftop',
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
              status === 'approved' || status === 'grid_connected' ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) : null,
              status === 'grid_connected' ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) : null,
              new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000) // Staggered creation dates
            ]
          );
          
          const applicationId = appResult.rows[0].application_id;
          
          // Add history entries based on status
          const allStatuses = ['submitted', 'under_review', 'document_verification', 'site_inspection_scheduled', 
                              'site_inspection_completed', 'technical_approval', 'meter_installation', 
                              'grid_sync_pending', 'approved', 'grid_connected'];
          const statusIndex = allStatuses.indexOf(status);
          
          for (let j = 0; j <= statusIndex; j++) {
            const historyMessages = {
              'submitted': 'Application submitted successfully.',
              'under_review': 'Application under review by DISCOM officials.',
              'document_verification': 'Documents verified successfully.',
              'site_inspection_scheduled': 'Site inspection scheduled.',
              'site_inspection_completed': 'Site inspection completed.',
              'technical_approval': 'Technical feasibility approved.',
              'meter_installation': 'Net meter installation completed.',
              'grid_sync_pending': 'Awaiting grid synchronization.',
              'approved': 'Application approved by DISCOM.',
              'grid_connected': 'System connected to grid. Export enabled!'
            };
            
            await client.query(
              `INSERT INTO discom_application_history (application_id, status, message, created_at)
               VALUES ($1, $2, $3, $4)`,
              [
                applicationId,
                allStatuses[j],
                historyMessages[allStatuses[j]],
                new Date(Date.now() - (statusIndex - j) * 24 * 60 * 60 * 1000) // Staggered timestamps
              ]
            );
          }
          
          console.log(`  ✅ Created application for ${user.email} with status: ${status}`);
        } else {
          console.log(`  ⏭️  Skipping ${user.email} - already has application`);
        }
      }
    }
    
    await client.query('COMMIT');
    console.log('\n✅ DISCOM schema migration completed successfully!\n');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run migration
migrateDiscomSchema()
  .then(() => {
    console.log('Migration completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration error:', error);
    process.exit(1);
  });

