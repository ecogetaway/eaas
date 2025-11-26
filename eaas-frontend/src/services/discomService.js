import api from './api.js';

export const discomService = {
  /**
   * Get all applications for a user
   */
  getUserApplications: async (userId) => {
    const response = await api.get(`/discom/applications/user/${userId}`);
    return response.data;
  },

  /**
   * Get a specific application by ID
   */
  getApplicationById: async (applicationId) => {
    const response = await api.get(`/discom/applications/${applicationId}`);
    return response.data;
  },

  /**
   * Submit a new net-metering application
   */
  submitApplication: async (applicationData) => {
    const response = await api.post('/discom/applications', applicationData);
    return response.data;
  },

  /**
   * Get application status with timeline for a user
   */
  getApplicationStatus: async (userId) => {
    const response = await api.get(`/discom/status/${userId}`);
    return response.data;
  },

  /**
   * Process application to next status (for demo)
   */
  processApplication: async (applicationId) => {
    const response = await api.post(`/discom/applications/${applicationId}/process`);
    return response.data;
  },

  /**
   * Get grid sync status for a meter
   */
  getGridSyncStatus: async (meterId) => {
    const response = await api.get(`/discom/grid-sync/${meterId}`);
    return response.data;
  },

  /**
   * Update grid sync status
   */
  updateGridSync: async (meterId, data) => {
    const response = await api.post(`/discom/grid-sync/${meterId}/sync`, data);
    return response.data;
  }
};

export default discomService;

