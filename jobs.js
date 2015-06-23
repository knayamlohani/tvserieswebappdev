// Generated by CoffeeScript 1.8.0
(function() {
  var http, mailer, moment, mongodbclient, request;

  mongodbclient = require('./mongodbclient.js');

  moment = require('moment');

  mailer = require('./mailer.js');

  request = require('request');

  http = require('http');

  exports.performJobs = function() {

    /*
      deletes the expired or finished entries in various collections from the database
     */
    var checkIfJobsCreatedSubroutine, deleteExpiredAndFinishedEntriesInCollectionsSubroutine, generateJobs, getDaysNameFor, getMailSubscriptionJobsForToday, mailSubscriptionsFor, mailSubscriptionsSubroutine, makeHttpGetRequest;
    deleteExpiredAndFinishedEntriesInCollectionsSubroutine = function() {
      console.log("calling deleteExpiredAndFinishedEntriesInCollectionsSubroutine");

      /*
       */
      mongodbclient.deleteExpiredPasswordResetTokens("", function(result) {
        console.log("deleteExpiredPasswordResetTokens result", result);
      });

      /*
       */
      mongodbclient.deleteExpiredAccountAuthenticationTokens("", function(result) {
        console.log("deleteExpiredAccountAuthenticationTokens result", result);
      });

      /*
       */

      /*
      mongodbclient.deleteEntriesFromJobsCollectionWithStatusFinished options =
        "collection" : ""
      , 
      (result) ->
        console.log "deleteEntriesFromJobsCollectionWithStatusFinished result", result
        return
       */

      /*
       */

      /*
      mongodbclient.deleteExpiredJobsCreatedStatusCollectionEntries options =
        "collection" : ""
      , 
      (result) ->
        console.log "deleteExpiredJobsCreatedStatusCollectionEntries result", result
        return
       */
    };
    deleteExpiredAndFinishedEntriesInCollectionsSubroutine();
    setInterval(deleteExpiredAndFinishedEntriesInCollectionsSubroutine, 30 * 60 * 1000);

    /*
      to check if mail subscriptions jobs for today were created
      if not create them
      
      a table(jobs created status) is maintained which keeps track of various jobs like mail subscriptions, mail newslatter, etc
      if there is an entry for mail subscriptions for today in the table, implies mail subscriptions jobs are already created
      else mail subscriptions jobs will be created(ie added to jobs table) and an entry will will be added to jobsCreatedStatus table
      for todays mail subscription jobs
    
      runs every half and hour
     */
    checkIfJobsCreatedSubroutine = function() {
      var options;
      console.log("calling checkIfJobsCreatedSubroutine");
      options = {
        "object": {
          "type": "mailSubscriptions",
          "date": moment.utc().format("MM-DD-YYYY").toString()
        }
      };
      mongodbclient.checkIfJobsCreated(options, function(result) {
        if (!result.err && !result.status) {
          console.log("jobs not created for today");
          generateJobs(moment.utc().format().toString(), function(result) {
            console.log("created mail subscription jobs for today and now adding an entry to jobscreatedstatus table for mailsubscriptions jobs", result);
            mongodbclient.addEntryToJobsCreatedStatusCollection(options, function(result) {
              console.log("entry added to jobsCreatedStatus collection", result);
            });
          });
        } else {
          console.log("jobs already created for today");
        }
      });
    };
    checkIfJobsCreatedSubroutine();
    setInterval(checkIfJobsCreatedSubroutine, 2 * 60 * 1000);

    /*
    checks every 10 minutes for pending jobs (mailing subscriptions)
     */
    mailSubscriptionsSubroutine = function() {
      console.log("calling mailSubscriptions subroutine");
      getMailSubscriptionJobsForToday();
    };
    setInterval(mailSubscriptionsSubroutine, 1 * 60 * 1000);
    generateJobs = function(utcDateString, callback) {
      var currentDay, days, jobs, options;
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      currentDay = days[moment(utcDateString).utc().day()];
      jobs = [];
      console.log("currentDay", currentDay);
      options = {
        "object": {
          "airsOnDayOfWeek": currentDay
        }
      };
      mongodbclient.getTvShowsAiringOn(options, function(result) {
        var deliveryTime, job, sixAM, tvShow, _i, _len, _ref;
        if (!result.err) {
          _ref = result.data;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tvShow = _ref[_i];
            sixAM = moment(utcDateString).utc().hours(6).minutes(0).seconds(0).format().toString();
            deliveryTime = moment(sixAM).utc().subtract(tvShow.subscribersTimeZone, 'hours').utc().format().toString();
            job = {
              "email": tvShow.subscribersEmail,
              "deliveryTime": deliveryTime,
              "status": "queue",
              "day": tvShow.airsOnDayOfWeek,
              "type": "mailSubscriptions"
            };
            jobs.push(job);
          }
          mongodbclient.addNewJob(options = {
            "object": job
          }, callback);
        }
      });
    };
    getMailSubscriptionJobsForToday = function() {
      var dayOfWeek, options, utcDate, utcDateString;
      utcDate = moment.utc().format();
      console.log("utcDate", utcDate);
      utcDateString = utcDate.toString();
      console.log("utcdatestring", utcDateString);
      dayOfWeek = getDaysNameFor(moment(utcDateString).utc().day());
      console.log("today is", dayOfWeek);
      options = {
        "object": {
          "day": dayOfWeek,
          "status": "queue"
        }
      };
      mongodbclient.getMailSubscriptionJobs(options, function(result) {
        var data, job, _i, _len, _ref;
        console.log("result", result);
        if (!result.err) {
          data = result.data;
          _ref = result.data;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            job = _ref[_i];
            if (moment(utcDateString) - moment(job.deliveryTime) >= 0) {
              (function(job) {
                console.log("mailing subscriptions for", job.email);
                mailSubscriptionsFor({
                  "email": job.email,
                  "day": job.day
                }, function(result) {
                  console.log("mailed subscriptions for ", job.email, "result", result);
                  mongodbclient.updateDocumentInCollection(options = {
                    "object": {
                      "searchParameter": {
                        "email": job.email,
                        "_id": job["_id"]
                      },
                      "updatedValue": {
                        "status": "finished"
                      }
                    },
                    "collection": "jobs"
                  }, function(result) {
                    console.log("updated job status to finished, result ", result);
                  });
                });
              })(job);
            }
          }
        }
      });
    };
    mailSubscriptionsFor = function(subscriber, callback) {
      var options;
      options = {
        "object": {
          "airsOnDayOfWeek": subscriber.day,
          "subscribersEmail": subscriber.email
        }
      };
      console.log("mailing subscriptions");
      mongodbclient.getTvShowsAiringOn(options, function(result) {
        var allUsers, counter, episodesAiringForSeriesWithIdToday, subscribers, temp, tvShow, tvShowsCount, user, usersCount, _i, _j, _len, _len1, _ref;
        if (!result.err) {
          subscribers = {};
          allUsers = [];
          temp = [];
          episodesAiringForSeriesWithIdToday = [];
          tvShowsCount = result.data.length;
          counter = 0;
          _ref = result.data;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tvShow = _ref[_i];
            counter++;
            if (!subscribers[tvShow.subscribersUsername]) {
              subscribers[tvShow.subscribersUsername] = {};
              subscribers[tvShow.subscribersUsername].tvShows = [];
              subscribers[tvShow.subscribersUsername].email = tvShow.subscribersEmail;
              subscribers[tvShow.subscribersUsername].username = tvShow.subscribersUsername;
              subscribers[tvShow.subscribersUsername].name = tvShow.subscribersFirstName + " " + tvShow.subscribersLastName;
              allUsers.push(tvShow.subscribersUsername);
            }
            options = {
              "url": "/series?id=:" + tvShow.id + "/episode?airDate=:" + (new Date())
            };
            options.url = "/episode?id=" + tvShow.id + "&airDate=" + (new Date());
            makeHttpGetRequest(options, function(res) {
              console.log("res episode airing today", res);
            });
            subscribers[tvShow.subscribersUsername].tvShows.push({
              "name": tvShow.name,
              "id": tvShow.id,
              "artworkUrl": tvShow.artworkUrl,
              "episodeName": ""
            });
          }
          usersCount = allUsers.length;
          for (_j = 0, _len1 = allUsers.length; _j < _len1; _j++) {
            user = allUsers[_j];
            temp.push({
              "email": subscribers[user].email,
              "name": subscribers[user].name,
              "username": subscribers[user].username,
              "tvShows": subscribers[user].tvShows
            });
          }
          console.log(JSON.stringify(temp, null, 4));
        }
      });
    };
    getDaysNameFor = function(dayNo) {
      var days;
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[dayNo];
    };
    makeHttpGetRequest = function(options, callback) {
      console.log("making http request", options.url);
      request(options.url, function(error, response, body) {
        console.log("episode body", body);
      });
    };
  };

}).call(this);


//# sourceMappingURL=jobs.js.map
