var apiClient = require('../lib/apiClient');

module.exports = {

  /**
   * GET /
   */

  all: function (req, res, next) {
    apiClient.urls(function (err, urls) {
      if (err) return next(err);

      res.render('urls', {
        title: 'URLs',
        urls: urls
      });
    });
  }

}