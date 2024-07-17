/**
 * Softbase JS Client
 */
export default class Client {
  /**
   * The base Softbase backend URL address (e.g., 'http://127.0.0.1:8080').
   * @type {string}
   */
  baseUrl;

  /**
   * Create a new Client instance.
   * @param {string} baseUrl - The base URL for the API.
   */
  constructor(baseUrl = "/") {
    this.baseUrl = baseUrl;
  }
}
