import ApiService from './services/ApiService';

/**
 * Softbase JS Client
 */
export default class Client {
  /**
   * The base Softbase backend URL address (e.g., 'http://127.0.0.1:1440').
   * @type {string}
   */
  baseUrl;

  /**
   * The API key for authorization.
   * @type {string}
   */
  apiKey;

  /**
   * API service instance
   * @type {ApiService}
   */
  apiService;

  /**
   * Create a new Client instance.
   * @param {string} baseUrl - The base URL for the API.
   * @param {string} apiKey - The API key for authorization.
   */
  constructor(baseUrl = '/', apiKey = '') {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.apiService = new ApiService(this.baseUrl, this.apiKey);
  }

  /**
   * Create a key-value pair.
   * @param {string} key - The key to create.
   * @param {any} value - The value to associate with the key.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async create(key, value) {
    return this.apiService.sendRequest('/create', {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
  }

  /**
   * Read a key-value pair by key.
   * @param {string} key - The key to read.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async read(key) {
    return this.apiService.sendRequest(`/read/${key}`, {
      method: 'GET',
    });
  }

  /**
   * Read all key-value pairs.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async readAll() {
    return this.apiService.sendRequest('/read', {
      method: 'GET',
    });
  }

  /**
   * Update a key-value pair.
   * @param {string} key - The key to update.
   * @param {any} value - The new value.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async update(key, value) {
    return this.apiService.sendRequest('/update', {
      method: 'PUT',
      body: JSON.stringify({ key, value }),
    });
  }

  /**
   * Delete a key-value pair by key.
   * @param {string} key - The key to delete.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async delete(key) {
    return this.apiService.sendRequest(`/delete/${key}`, {
      method: 'DELETE',
    });
  }

  /**
   * Delete all key-value pairs.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async deleteAll() {
    return this.apiService.sendRequest('/delete', {
      method: 'DELETE',
    });
  }
}
