var logger,tvSeriesService,tvdbWebService;tvdbWebService=require("tvdbwebservice"),logger=require("./logger_service"),tvdbWebService.setTvdbApiKey("876F1255A95BAD4F"),tvSeriesService={},tvSeriesService.getSeriesByName=function(e,r){tvdbWebService.getSeriesByName(e,function(e){r({},JSON.parse(e).seriesArray)})},tvSeriesService.getSeriesById=function(e,r,i){tvdbWebService.getSeriesOnlyById(e,function(e){return i({},JSON.parse(e))})},tvSeriesService.getCastForSeriesWithId=function(e,r){tvdbWebService.getActorsForSeriesWithId(e,function(e){logger.info(e),r({},JSON.parse(e))})},tvSeriesService.getBannersForSeriesWithId=function(e,r){tvdbWebService.getBannersForSeriesWithId(e,function(e){r({},JSON.parse(e))})},module.exports=tvSeriesService;