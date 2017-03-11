#imports
express         = require 'express'
logger          = require './../../../services/logger_service'
tvSeriesService = require './../../../services/tv_series_service'


#initializations
router  = express.Router()


# routes

# gets series by name
router.get '/series', (req, res, next) ->
  name = req.query.name

  tvSeriesService.getSeriesByName name, callback = (err, data) ->
    res.end JSON.stringify
      'data': data
    return

  return

# gets series by id
# optional boolean parameters cast, banners
router.get '/series/:id', (req, res, next) ->
  id      = req.params['id']
  cast    = req.query['cast']
  banners = req.query['banners']

  tvSeriesService.getSeriesById id, options = {'cast': cast, 'banners': banners}, callback = (err, data) ->
    res.end JSON.stringify
      'data': data
    return

  return


# gets cast for series with id
router.get '/series/:id/cast', (req, res, next) ->
  id = req.params['id']

  tvSeriesService.getCastForSeriesWithId id, callback = (err, data) ->
    res.end JSON.stringify
      'data': data
    return

  return

# gets banners for series with id
router.get '/series/:id/banners', (req, res, next) ->
  id = req.params['id']

  tvSeriesService.getBannersForSeriesWithId id, callback = (err, data) ->
    res.end JSON.stringify
      'data': data
    return

  return


# module exports
module.exports = router