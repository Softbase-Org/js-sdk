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

  /**
   * Helper function to handle fetch responses.
   * @param {Response} response - The fetch response object.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async handleResponse(response) {
    const contentType = response.headers.get("content-type");
    let responseData = null;

    if (contentType && contentType.includes("application/json")) {
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
   * Create a key-value pair.
   * @param {string} key - The key to create.
   * @param {any} value - The value to associate with the key.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async create(key, value) {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return this.handleResponse(response);
  }

  /**
   * Read a key-value pair by key.
   * @param {string} key - The key to read.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async read(key) {
    const response = await fetch(`${this.baseUrl}/read/${key}`, {
      method: "GET",
    });
    return this.handleResponse(response);
  }

  /**
   * Read all key-value pairs.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async readAll() {
    const response = await fetch(`${this.baseUrl}/read`, {
      method: "GET",
    });
    return this.handleResponse(response);
  }

  /**
   * Update a key-value pair.
   * @param {string} key - The key to update.
   * @param {any} value - The new value.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async update(key, value) {
    const response = await fetch(`${this.baseUrl}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return this.handleResponse(response);
  }

  /**
   * Delete a key-value pair by key.
   * @param {string} key - The key to delete.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async delete(key) {
    const response = await fetch(`${this.baseUrl}/delete/${key}`, {
      method: "DELETE",
    });
    return this.handleResponse(response);
  }

  /**
   * Delete all key-value pairs.
   * @returns {Promise<Object>} - The formatted JSON response.
   */
  async deleteAll() {
    const response = await fetch(`${this.baseUrl}/delete`, {
      method: "DELETE",
    });
    return this.handleResponse(response);
  }
}
