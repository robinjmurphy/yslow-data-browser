var request = require('request');
var config = require('../config.json');
var baseUrl = config.defaults.api.baseUrl;

/**
 * Wrapper for `request` with common options
 */

function get (path, cb) {
  var options = {
    url: baseUrl + path,
    proxy: process.env.HTTP_PROXY,
    json: true
  }

  request(options, cb);
}

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
    get('/urls', function (error, response, body) {
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
    get('/results/latest?url=' + encodeURIComponent(url), function (error, response, body) {
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
    get('/results?url=' + encodeURIComponent(url), function (error, response, body) {
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
    get('/results/' + id, function (error, response, body) {
      if (error) return cb(error);

      if (body['results'].length === 0) {
        return cb(new Error('No results found for ID: ' + id));
      }

      cb(null, body.results);
    });
  }

}