# imports
express               = require 'express'
tvSeriesServiceRoutes = require './service/tv_series/tv_series_service_routes'


# initializations
router = express.Router();


# service route mounts
router.use '/tv_series_service', tvSeriesServiceRoutes


# 404 handler for service routes
router.use (req, res, next) ->
  res.status('404').end JSON.stringify
    'data':
      'status': 404
      'message': 'The resource you are trying to access does not exists'

module.exports = router