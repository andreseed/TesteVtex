var gitHubController = require('./gitHubController.js');

module.exports.start = function (app) {
    gitHubController.start(app);
};