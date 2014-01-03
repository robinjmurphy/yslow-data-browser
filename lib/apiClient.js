var request = require('request');
var config = require('../config.json');
var baseUrl = config.defaults.api.baseUrl;

module.exports = {

  /**
   * Sets the base URL
   */

  setBaseUrl: function (url) {
    baseUrl = url;
  },

  /**
   * Returns the unique URLs that have been tested
   */

  urls: function (cb) {
    request({
        url: baseUrl + '/urls',
        json: true
      }, function (error, response, body) {
        if (error) return cb(error);

        if (body.urls.length === 0) {
          return cb(new Error('No URLs found'));
        }

        cb(null, body.urls);
      });
  },

  /**
   * Returns the latest result for a given URL
   */

  latestResult: function (url, cb) {
    request({
        url: baseUrl + '/results/latest?url=' + url,
        json: true
      }, function (error, response, body) {
        if (error) return cb(error);

        if (body['results'].length === 0) {
          return cb(new Error('No latest result found for URL: ' + url));
        }

        cb(null, body.results[0]);
      });
  },

  /**
   * Returns all of the results for a given URL
   */

  results: function (url, cb) {
    request({
        url: baseUrl + '/results?url=' + url,
        json: true
      }, function (error, response, body) {
        if (error) return cb(error);

        if (body['results'].length === 0) {
          return cb(new Error('No results found for URL: ' + url));
        }

        cb(null, body.results);
      });
  },

  /**
   * Returns a result with a given ID
   */

  result: function (id, cb) {
    request({
        url: baseUrl + '/results/' + id,
        json: true
      }, function (error, response, body) {
        if (error) return cb(error);

        if (body['results'].length === 0) {
          return cb(new Error('No results found for ID: ' + id));
        }

        cb(null, body.results);
      });
  }

}