import api from './api.js';
import { mockDiscomStatus, mockDiscomApplication, DISCOM_STATUSES, REQUIRED_DOCUMENTS } from '../data/mockData.js';

// For demo: Use mock data as primary source
const USE_MOCK_DATA = true; // Set to false to use real backend

// Mock application data - using enhanced structure
let mockApplications = [
  {
    ...mockDiscomApplication,
    user_id: 'user_123'
  }
];

export const discomService = {
  /**
   * Get all applications for a user
   */
  getUserApplications: async (userId) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return {
        applications: mockApplications.filter(app => app.user_id === userId)
      };
    }
    
    try {
      const response = await api.get(`/discom/applications/user/${userId}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock applications data');
      return {
        applications: mockApplications.filter(app => app.user_id === userId)
      };
    }
  },

  /**
   * Get a specific application by ID
   */
  getApplicationById: async (applicationId) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        application: mockApplications.find(app => app.application_id === applicationId) || mockApplications[0]
      };
    }
    
    try {
      const response = await api.get(`/discom/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock application data');
      return {
        application: mockApplications.find(app => app.application_id === applicationId) || mockApplications[0]
      };
    }
  },

  /**
   * Submit a new net-metering application
   */
  submitApplication: async (applicationData) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const applicationNumber = `DISCOM-2024-${String(Date.now()).slice(-6)}`;
      const newApplication = {
        ...mockDiscomApplication,
        application_id: `app_${Date.now()}`,
        application_number: applicationNumber,
        user_id: applicationData.user_id || 'user_123',
        discom_name: applicationData.electricity_provider || 'BESCOM',
        consumer_number: applicationData.consumer_number,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        approved_at: null,
        agreement_number: null,
        sanctioned_load: applicationData.sanctioned_load_kw || 5.0,
        solar_capacity_kw: applicationData.solar_capacity_kw,
        property_type: applicationData.property_type,
        property_address: applicationData.property_address,
        electricity_provider: applicationData.electricity_provider,
        installation_type: applicationData.installation_type,
        roof_area_sqft: applicationData.roof_area_sqft,
        // Initialize documents as required
        documents: REQUIRED_DOCUMENTS.map(doc => ({
          id: doc.id,
          name: doc.name,
          description: doc.description,
          status: 'required',
          uploaded_at: null,
          verified_at: null
        })),
        // Remove advanced stages for new application
        feasibility_study: null,
        technical_approval: null,
        system_installation: null,
        inspection_documentation: null,
        grid_sync: null,
        commissioning: null,
        ...applicationData
      };
      mockApplications.unshift(newApplication);
      return { application: newApplication };
    }
    
    try {
      const response = await api.post('/discom/applications', applicationData);
      return response.data;
    } catch (error) {
      console.warn('Using mock application submission');
      const newApplication = {
        application_id: `app_${Date.now()}`,
        ...applicationData,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      };
      return { application: newApplication };
    }
  },

  /**
   * Get application status with timeline for a user
   */
  getApplicationStatus: async (userId) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400));
      let application = mockApplications.find(app => app.user_id === userId);
      
      // If no application found, create a new one in 'submitted' status
      if (!application) {
        application = {
          ...mockDiscomApplication,
          user_id: userId,
          status: 'submitted',
          submitted_at: new Date().toISOString(),
          documents: REQUIRED_DOCUMENTS.map(doc => ({
            id: doc.id,
            name: doc.name,
            description: doc.description,
            status: 'required',
            uploaded_at: null,
            verified_at: null
          }))
        };
        mockApplications.push(application);
      }
      
      // Calculate current status index and progress
      const currentStatusIndex = DISCOM_STATUSES.indexOf(application.status);
      const progressPercentage = Math.round(((currentStatusIndex + 1) / DISCOM_STATUSES.length) * 100);
      
      // Build timeline with all statuses
      const timeline = [];
      const baseDate = new Date(application.submitted_at);
      
      DISCOM_STATUSES.forEach((status, index) => {
        if (index <= currentStatusIndex) {
          const statusDate = new Date(baseDate);
          statusDate.setDate(statusDate.getDate() + (index * 2)); // 2 days per stage
          
          let message = '';
          switch (status) {
            case 'submitted':
              message = 'Application submitted with required documents';
              break;
            case 'document_verification':
              message = 'Documents verified by DISCOM';
              break;
            case 'feasibility_study':
              message = 'Feasibility study completed - Grid capacity checked';
              break;
            case 'site_inspection_scheduled':
              message = 'Site inspection scheduled';
              break;
            case 'site_inspection_completed':
              message = 'Site inspection completed successfully';
              break;
            case 'technical_approval':
              message = 'Technical approval letter issued';
              break;
            case 'system_installation':
              message = 'Solar system installation completed';
              break;
            case 'inspection_documentation':
              message = 'Inspection completed and documentation submitted';
              break;
            case 'meter_installation':
              message = 'Bi-directional meter installed';
              break;
            case 'grid_sync_pending':
              message = 'Grid synchronization pending';
              break;
            case 'grid_synchronized':
              message = 'Grid synchronized successfully';
              break;
            case 'commissioning_complete':
              message = 'Commissioning completed';
              break;
            case 'grid_connected':
              message = 'System fully connected and operational';
              break;
            default:
              message = `${status.replace(/_/g, ' ')} completed`;
          }
          
          timeline.push({
            status,
            timestamp: statusDate.toISOString(),
            message
          });
        }
      });
      
      return {
        hasApplication: true,
        application,
        timeline,
        currentStatusIndex,
        allStatuses: DISCOM_STATUSES,
        progressPercentage,
        feasibility_study: application.feasibility_study,
        technical_approval: application.technical_approval,
        system_installation: application.system_installation,
        inspection_documentation: application.inspection_documentation,
        grid_sync: application.grid_sync,
        commissioning: application.commissioning
      };
    }
    
    try {
      const response = await api.get(`/discom/status/${userId}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock application status');
      const application = mockApplications[0];
      return {
        hasApplication: true,
        application,
        timeline: [],
        currentStatusIndex: 0,
        allStatuses: DISCOM_STATUSES,
        progressPercentage: 0
      };
    }
  },

  /**
   * Process application to next status (for demo)
   */
  processApplication: async (applicationId) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const application = mockApplications.find(app => app.application_id === applicationId);
      if (application) {
        if (application.status === 'submitted') {
          application.status = 'under_review';
        } else if (application.status === 'under_review') {
          application.status = 'site_inspection';
        } else if (application.status === 'site_inspection') {
          application.status = 'approved';
          application.approved_at = new Date().toISOString();
          application.agreement_number = `AGR${Date.now()}`;
        }
      }
      return { application: application || mockApplications[0] };
    }
    
    try {
      const response = await api.post(`/discom/applications/${applicationId}/process`);
      return response.data;
    } catch (error) {
      console.warn('Using mock application processing');
      return { application: mockApplications[0] };
    }
  },

  /**
   * Get grid sync status for a meter
   */
  getGridSyncStatus: async (meterId) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        meter_id: meterId,
        sync_status: 'synced',
        last_sync: new Date().toISOString(),
        export_enabled: true,
        grid_connection: 'active'
      };
    }
    
    try {
      const response = await api.get(`/discom/grid-sync/${meterId}`);
      return response.data;
    } catch (error) {
      console.warn('Using mock grid sync status');
      return {
        meter_id: meterId,
        sync_status: 'synced',
        last_sync: new Date().toISOString(),
        export_enabled: true
      };
    }
  },

  /**
   * Update grid sync status
   */
  updateGridSync: async (meterId, data) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        meter_id: meterId,
        sync_status: data.sync_status || 'synced',
        last_sync: new Date().toISOString(),
        export_enabled: data.export_enabled !== false
      };
    }
    
    try {
      const response = await api.post(`/discom/grid-sync/${meterId}/sync`, data);
      return response.data;
    } catch (error) {
      console.warn('Using mock grid sync update');
      return {
        meter_id: meterId,
        sync_status: 'synced',
        last_sync: new Date().toISOString()
      };
    }
  }
};

export default discomService;

