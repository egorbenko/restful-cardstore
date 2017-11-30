'use strict';

const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const IdCard = require('composer-common').IdCard;
const axios = require('axios');
const qs = require('querystring');

/**
 * Manages persistence of business network cards to a Node file system implementation.
 * This is the default cardstore of Admin and Business Network connections.
 * It stores card in the `~/.composer` directory.
 * @extends BusinessNetworkCardStore
 * @class
 */
class RestfulCardStore extends BusinessNetworkCardStore {

  /**
   * Constructor.
   * @param {Object} options Additional configuration options for the card store.
   * @param {function} callback
   */
  constructor(options, callback) {
    super();
    this.xhr = axios.create({
      baseURL: options.baseURL || 'http://localhost:3000/card',
      headers: options.headers
    });

    this.setting = {
      getPath: options.getPath || '',
      putPath: options.putPath || '',
      hasPath: options.hasPath || '',
      getAllPath: options.getAllPath || '',
      deletePath: options.deletePath || ''
    }

    this.callback = callback || function (response) {
      if (!response.data.payload) {
        throw new Error('Cannot find card in response, please specify correct Response object path to your card. Default Response = { payload: IdCard }')
      }
      return response.data.payload;
    }
  }

  /**
   * @inheritdoc
   */
  async get (cardName) {
    try {
      let { metadata, connectionProfile, credentials } = this.callback(await this.xhr.get(`${this.setting.getPath}/${cardName}`));
      const idCard = new IdCard(metadata, connectionProfile);
      idCard.setCredentials(credentials);
      return idCard;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        throw new Error(`Failed to ${err.config.method.toUpperCase()} card '${cardName}' from ${err.config.url}. ${err.response.data.message}`);
      }
      throw new Error(`Failed to get card '${cardName}'. ${err.message}`);
    }
  }

  /**
   * @inheritdoc
   */
  async put (cardName, card) {
    try {
      return this.callback(await this.xhr.put(`${this.setting.putPath}/${cardName}`, qs.stringify({ idCard: JSON.stringify(card) })));
    } catch (err) {
      throw new Error(`Failed to ${err.config.method.toUpperCase()} card '${cardName}' to ${err.config.url}. Error: ${err.message}`);
    }
  }

  /**
   * @inheritdoc
   */
  async has (cardName) {
    try {
      return !!await this.get(cardName);
    } catch (err) {
      return false
    }
  }

  /**
   * @inheritdoc
   */
  async getAll () {
    try {
      return this.callback(await this.xhr.get(this.setting.getAllPath));
    } catch (err) {
      throw new Error(`Failed to ${err.config.method.toUpperCase()} cards from ${err.config.url}. Error: ${err.message}`);
    }
  }

  /**
   * @inheritdoc
   */
  async delete (cardName) {
    try {
      return !!await this.xhr.delete(`${this.setting.deletePath}/${cardName}`);
    } catch (err) {
      return false;
    }
  }
}

module.exports = RestfulCardStore;