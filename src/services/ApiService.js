/**
 * @typedef {Object} RequestOptions
 * @property {string} [method] - The HTTP method.
 * @property {Object.<string, string>} [headers] - The HTTP headers.
 * @property {string} [body] - The request body as a JSON string.
 */

export default class ApiService {
  /**
   * The base URL for the API.
   * @type {string}
   */
  baseUrl;

  /**
   * The API key for authorization.
   * @type {string}
   */
  apiKey;

  /**
   * Create a new ApiService instance.
   * @param {string} baseUrl - The base URL for the API.
   * @param {string} apiKey - The API key for authorization.
   */
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Helper function to handle fetch responses.
   * @param {Response} response - The fetch response object.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    let responseData = null;

    if (contentType && contentType.includes('application/json')) {
      const jsonData = await response.json();
      responseData = jsonData.data;
    } else {
      responseData = await response.text();
    }

    return {
      status: response.status,
      data: responseData,
    };
  }

  /**
   * Helper function to send authorized requests.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestOptions} options - The fetch options.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async sendRequest(endpoint, options) {
    options.headers = {
      ...options.headers,
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    return this.handleResponse(response);
  }
}
