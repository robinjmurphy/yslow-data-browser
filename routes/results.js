var apiClient = require('../lib/apiClient');
var _ = require('lodash');
var dateFormat = require('dateformat');

function addDateToResults(results) {
  return _.map(results, function(result) {
    var date = new Date(result.timestamp);

    result.date = dateFormat(date, 'dd/mm/yyyy HH:MM:ss');

    return result;
  });
}

module.exports = {

  /**
   * GET /results
   */

  all: function (req, res, next) {
    var url = req.query.url;

    apiClient.results(url, function (err, results) {
        if (err) return next(err);

        res.render('results', {
          title: url,
          results: addDateToResults(results),
          url: url
        });
      });
  },

  /**
   * GET /results/:id
   */

  get: function (req, res, next) {
    var id = req.params.id;

    apiClient.result(id, function (err, results) {
      if (err) return next(err);

      results = addDateToResults(results);

      res.render('result', {
        title: 'Result: ' + id,
        results: results,
        result: results[0]
      });
    });
  }

}