import pool from '../config/database.js';

/**
 * DISCOM Controller
 * Handles net-metering applications and grid synchronization simulation
 */

// Status progression for applications
const APPLICATION_STATUSES = [
  'submitted',
  'under_review', 
  'document_verification',
  'site_inspection_scheduled',
  'site_inspection_completed',
  'technical_approval',
  'meter_installation',
  'grid_sync_pending',
  'approved',
  'grid_connected'
];

/**
 * Get all DISCOM applications for a user
 */
export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      `SELECT * FROM discom_applications 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

/**
 * Get a specific application by ID
 */
export const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    
    const result = await pool.query(
      `SELECT da.*, 
              json_agg(
                json_build_object(
                  'status', dah.status,
                  'message', dah.message,
                  'timestamp', dah.created_at
                ) ORDER BY dah.created_at ASC
              ) as timeline
       FROM discom_applications da
       LEFT JOIN discom_application_history dah ON da.application_id = dah.application_id
       WHERE da.application_id = $1
       GROUP BY da.application_id`,
      [applicationId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

/**
 * Submit a new net-metering application
 */
export const submitApplication = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { 
      user_id,
      application_type = 'net_metering',
      solar_capacity_kw,
      property_type,
      property_address,
      electricity_provider,
      consumer_number,
      sanctioned_load_kw,
      roof_area_sqft,
      installation_type = 'rooftop',
      notes
    } = req.body;

    await client.query('BEGIN');

    // Generate application number
    const appNumber = `NM-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create application
    const applicationResult = await client.query(
      `INSERT INTO discom_applications (
        user_id, application_number, application_type, status,
        solar_capacity_kw, property_type, property_address,
        electricity_provider, consumer_number, sanctioned_load_kw,
        roof_area_sqft, installation_type, notes,
        estimated_approval_date, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
      RETURNING *`,
      [
        user_id,
        appNumber,
        application_type,
        'submitted',
        solar_capacity_kw,
        property_type,
        property_address,
        electricity_provider,
        consumer_number,
        sanctioned_load_kw,
        roof_area_sqft,
        installation_type,
        notes,
        new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
      ]
    );

    const application = applicationResult.rows[0];

    // Add initial history entry
    await client.query(
      `INSERT INTO discom_application_history (application_id, status, message)
       VALUES ($1, $2, $3)`,
      [application.application_id, 'submitted', 'Application submitted successfully. Under initial review.']
    );

    await client.query('COMMIT');

    // Schedule automatic progression (for demo purposes)
    scheduleApplicationProgress(application.application_id);

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  } finally {
    client.release();
  }
};

/**
 * Get application status with timeline for a user
 */
export const getApplicationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get the most recent application
    const appResult = await pool.query(
      `SELECT * FROM discom_applications 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );
    
    if (appResult.rows.length === 0) {
      return res.json({ 
        hasApplication: false,
        application: null,
        timeline: [],
        currentStatusIndex: -1,
        allStatuses: APPLICATION_STATUSES
      });
    }

    const application = appResult.rows[0];
    
    // Get timeline
    const timelineResult = await pool.query(
      `SELECT status, message, created_at as timestamp
       FROM discom_application_history
       WHERE application_id = $1
       ORDER BY created_at ASC`,
      [application.application_id]
    );
    
    const currentStatusIndex = APPLICATION_STATUSES.indexOf(application.status);
    
    res.json({
      hasApplication: true,
      application,
      timeline: timelineResult.rows,
      currentStatusIndex,
      allStatuses: APPLICATION_STATUSES,
      progressPercentage: Math.round(((currentStatusIndex + 1) / APPLICATION_STATUSES.length) * 100)
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ error: 'Failed to fetch application status' });
  }
};

/**
 * Process application (advance to next status) - for demo/simulation
 */
export const processApplication = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { applicationId } = req.params;
    
    await client.query('BEGIN');
    
    // Get current application
    const appResult = await client.query(
      'SELECT * FROM discom_applications WHERE application_id = $1',
      [applicationId]
    );
    
    if (appResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Application not found' });
    }
    
    const application = appResult.rows[0];
    const currentIndex = APPLICATION_STATUSES.indexOf(application.status);
    
    if (currentIndex >= APPLICATION_STATUSES.length - 1) {
      await client.query('ROLLBACK');
      return res.json({ 
        message: 'Application already fully approved',
        application 
      });
    }
    
    const nextStatus = APPLICATION_STATUSES[currentIndex + 1];
    const statusMessages = {
      'under_review': 'Application is being reviewed by DISCOM officials.',
      'document_verification': 'Documents are being verified.',
      'site_inspection_scheduled': 'Site inspection has been scheduled for verification.',
      'site_inspection_completed': 'Site inspection completed successfully.',
      'technical_approval': 'Technical feasibility approved.',
      'meter_installation': 'Net meter installation in progress.',
      'grid_sync_pending': 'Meter installed. Awaiting grid synchronization.',
      'approved': 'Application approved! Net metering agreement generated.',
      'grid_connected': 'System is now connected to the grid. Export enabled!'
    };
    
    // Update application status
    await client.query(
      `UPDATE discom_applications 
       SET status = $1, updated_at = NOW()
       WHERE application_id = $2`,
      [nextStatus, applicationId]
    );
    
    // Add history entry
    await client.query(
      `INSERT INTO discom_application_history (application_id, status, message)
       VALUES ($1, $2, $3)`,
      [applicationId, nextStatus, statusMessages[nextStatus] || `Status updated to ${nextStatus}`]
    );
    
    // If approved, update grid sync status
    if (nextStatus === 'grid_connected') {
      await client.query(
        `UPDATE discom_applications 
         SET approved_at = NOW(), grid_connected_at = NOW()
         WHERE application_id = $1`,
        [applicationId]
      );
    }
    
    await client.query('COMMIT');
    
    // Get updated application
    const updatedResult = await pool.query(
      'SELECT * FROM discom_applications WHERE application_id = $1',
      [applicationId]
    );
    
    res.json({
      message: `Application advanced to: ${nextStatus}`,
      application: updatedResult.rows[0],
      previousStatus: application.status,
      newStatus: nextStatus
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error processing application:', error);
    res.status(500).json({ error: 'Failed to process application' });
  } finally {
    client.release();
  }
};

/**
 * Get grid sync status for a meter
 */
export const getGridSyncStatus = async (req, res) => {
  try {
    const { meterId } = req.params;
    
    const result = await pool.query(
      `SELECT gs.*, m.meter_id, m.serial_number 
       FROM grid_sync_status gs
       JOIN meters m ON gs.meter_id = m.meter_id
       WHERE gs.meter_id = $1`,
      [meterId]
    );
    
    if (result.rows.length === 0) {
      // Return default status if not found
      return res.json({
        meter_id: meterId,
        sync_status: 'not_configured',
        export_enabled: false,
        last_sync: null,
        grid_voltage: null,
        frequency: null
      });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching grid sync status:', error);
    res.status(500).json({ error: 'Failed to fetch grid sync status' });
  }
};

/**
 * Update grid sync status (simulation)
 */
export const updateGridSync = async (req, res) => {
  try {
    const { meterId } = req.params;
    const { sync_status = 'synced', export_enabled = true } = req.body;
    
    // Simulate grid parameters
    const gridVoltage = 230 + (Math.random() * 10 - 5); // 225-235V
    const frequency = 50 + (Math.random() * 0.2 - 0.1); // 49.9-50.1 Hz
    
    const result = await pool.query(
      `INSERT INTO grid_sync_status (meter_id, sync_status, export_enabled, last_sync, grid_voltage, frequency)
       VALUES ($1, $2, $3, NOW(), $4, $5)
       ON CONFLICT (meter_id) 
       DO UPDATE SET 
         sync_status = $2,
         export_enabled = $3,
         last_sync = NOW(),
         grid_voltage = $4,
         frequency = $5
       RETURNING *`,
      [meterId, sync_status, export_enabled, gridVoltage.toFixed(1), frequency.toFixed(2)]
    );
    
    res.json({
      message: 'Grid sync updated',
      gridSync: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating grid sync:', error);
    res.status(500).json({ error: 'Failed to update grid sync' });
  }
};

/**
 * Schedule automatic progress for demo (simulates DISCOM processing time)
 */
const scheduleApplicationProgress = async (applicationId) => {
  // Progress every 30 seconds for demo purposes
  const progressIntervals = [30, 60, 90, 120, 150, 180, 210, 240, 270]; // seconds
  
  progressIntervals.forEach((delay, index) => {
    setTimeout(async () => {
      try {
        const client = await pool.connect();
        
        try {
          const appResult = await client.query(
            'SELECT status FROM discom_applications WHERE application_id = $1',
            [applicationId]
          );
          
          if (appResult.rows.length === 0) return;
          
          const currentStatus = appResult.rows[0].status;
          const currentIndex = APPLICATION_STATUSES.indexOf(currentStatus);
          
          // Only progress if we haven't reached the end
          if (currentIndex < APPLICATION_STATUSES.length - 1) {
            const nextStatus = APPLICATION_STATUSES[currentIndex + 1];
            const statusMessages = {
              'under_review': 'Application is being reviewed by DISCOM officials.',
              'document_verification': 'Documents are being verified.',
              'site_inspection_scheduled': 'Site inspection scheduled.',
              'site_inspection_completed': 'Site inspection completed.',
              'technical_approval': 'Technical feasibility approved.',
              'meter_installation': 'Net meter installation in progress.',
              'grid_sync_pending': 'Meter installed. Awaiting grid sync.',
              'approved': 'Application approved!',
              'grid_connected': 'Connected to grid!'
            };
            
            await client.query('BEGIN');
            
            await client.query(
              `UPDATE discom_applications SET status = $1, updated_at = NOW() WHERE application_id = $2`,
              [nextStatus, applicationId]
            );
            
            await client.query(
              `INSERT INTO discom_application_history (application_id, status, message) VALUES ($1, $2, $3)`,
              [applicationId, nextStatus, statusMessages[nextStatus]]
            );
            
            if (nextStatus === 'grid_connected') {
              await client.query(
                `UPDATE discom_applications SET approved_at = NOW(), grid_connected_at = NOW() WHERE application_id = $1`,
                [applicationId]
              );
            }
            
            await client.query('COMMIT');
            console.log(`📡 DISCOM: Application ${applicationId} advanced to ${nextStatus}`);
          }
        } finally {
          client.release();
        }
      } catch (error) {
        console.error('Auto-progress error:', error);
      }
    }, delay * 1000);
  });
};

