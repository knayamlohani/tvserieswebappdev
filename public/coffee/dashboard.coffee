$('window').ready ->
	
	$('#options-bar .option').on 'click', (e) ->
		$("#options-bar .option").removeClass "active not-active"
		$(this).addClass "active"
		selectedOptionsBarOptionContentLink = $(this).data('link')
		console.log selectedOptionsBarOptionContentLink


		allOptionsBarOptionsContent = $('#options-bar-content .options-bar-option-content')
		allOptionsBarOptionsContent.removeClass "active not-active"

		selectedOptionsBarOptionContent = $("#options-bar-content .options-bar-option-content[data-link='"+selectedOptionsBarOptionContentLink+"']")
		selectedOptionsBarOptionContent.addClass "active"
		allOptionsBarOptionsContent.not(selectedOptionsBarOptionContent).addClass('not-active')
		console.log selectedOptionsBarOptionContent
		return

	return


# angular app for dashboard.html
dashboardApp = angular.module 'dashboard-app', []
dashboardApp.controller 'dashboard-controller', [ '$http', '$scope', ($http, $scope) ->
	console.log "setting controller" 
	$scope.appData = {}
	$scope.appData.subscribedTvShows = []
	$scope.appData.tvShowsToBeUnsubscribed = []
	$scope.appData.requestingSubscribedTvShows = true
	$scope.appData.downloadedSubscribedTvShows = false
	return
]

# angular directive to handle user subscribed tv shows
dashboardApp.directive 'subscriptionsDirective', ['$timeout', '$http', ($timeout, $http) ->
	link: (scope, elemement, attrs) ->
		$(elemement).on 'click', (e) ->
			#start http request
			#already parses to string to json on receiving data
			$http.get('/subscriptions').success (result) ->
				console.log "dashboard result ", result
				
				scope.appData.requestingSubscribedTvShows = false
				scope.appData.subscribedTvShows = result.data
			#end of http request

			return
		#end of click event handler

		return
]

dashboardApp.directive 'subscribedTvShowDirective', ['$timeout', '$http', ($timeout, $http) ->
	link: (scope, elemement, attrs) ->
		$(elemement).on 'click', (e) ->
			$(this).toggleClass 'unsubscribe'
			$(this).find('.remove-series-indicator').toggleClass 'display'

			if $('.subscribed-tv-show.unsubscribe').length > 0
				$("#unsubscribe-tv-shows").addClass 'visible'
			else 
				$("#unsubscribe-tv-shows").removeClass 'visible'


			return
		#end of click event handler

		return
]

dashboardApp.directive 'unsubscribeSelectedTvShowsDirective', ['$timeout', ($timeout) ->
	link: (scope, elemement, attrs) ->
		#event listener handles unsubscribe tv shows button click
		elemement.on 'click', (e) ->
			console.log "unsubscribing the following tv shows"
			tvShowsToBeUnsubscribed = []
		
		
			$(".unsubscribe").each () ->
				series = $(this)
				tvShowsToBeUnsubscribed.push
					"id"							: series.data("seriesId")
					"name"						: series.data("seriesName")
					"airsOnDayOfWeek" : series.data("airsOnDayOfWeek")
				return

			$timeout ->
				scope.$apply ->
		    	scope.appData.tvShowsToBeUnsubscribed = tvShowsToBeUnsubscribed
		    	return
		    return

			$('#modal-tv-shows-to-be-unsubscribed').modal()
			return
		#end of event listener

		return
	#end of link function
]

dashboardApp.directive 'confirmUnsubscribeDirective', ['$http', ($http) ->
	link: (scope, elemement, attrs) ->
		#event listener handles unsubscribe tv shows button click
		elemement.on 'click', (e) ->
			tvShowsToBeUnsubscribed = []
			#tvShowsToBeUnsubscribed = scope.appData.tvShowsToBeUnsubscribed

			for series in scope.appData.tvShowsToBeUnsubscribed
				tvShowsToBeUnsubscribed.push {"id" : series.id}
			
			$http.post '/unsubscribe', {"tvShowsToBeUnsubscribed": tvShowsToBeUnsubscribed}
		  .success (data, status, headers, config) ->
		  	console.log "success unsubscribing", data
		  	return  
		  .error (data, status, headers, config) ->
		  	return
			return
		#end of event listener

		return
	#end of link function
]




###
$timeout ->
					scope.$apply ->
			    		scope.subscribedTvShows = subscribedTvShows
			    	return
			    return
###