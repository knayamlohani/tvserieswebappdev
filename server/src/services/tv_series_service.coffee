
#imports
tvdbWebService = require 'tvdbwebservice'
logger         = require './logger_service'


#initializations
tvdbWebService.setTvdbApiKey '876F1255A95BAD4F'

# declares tv series service
tvSeriesService = {}

# gets series by name
tvSeriesService.getSeriesByName = (name, callback) ->
  tvdbWebService.getSeriesByName name, (data) ->
    callback {}, JSON.parse(data).seriesArray
    return
  return

# gets series by id
tvSeriesService.getSeriesById = (id, options, callback) ->
  tvdbWebService.getSeriesOnlyById id, (data) ->
    callback {}, JSON.parse data
  return

# gets cast for series with id
tvSeriesService.getCastForSeriesWithId = (id, callback) ->
  tvdbWebService.getActorsForSeriesWithId id, (data) ->
    logger.info(data)
    callback {}, JSON.parse data
    return
  return

# gets banners for series with id
tvSeriesService.getBannersForSeriesWithId = (id, callback) ->
  tvdbWebService.getBannersForSeriesWithId id, (data) ->
    callback {}, JSON.parse data
    return
  return


#module exports
module.exports = tvSeriesService