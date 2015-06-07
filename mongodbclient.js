// Generated by CoffeeScript 1.8.0
(function() {
  var addingNewUser, addingSeriesToSubscribedTvShows, addingUnauthenticatedUser, authenticatingAccount, authenticatingUserCredentials, checkingIfEmailAlreadyRegistered, createMongodbConnectionAndPerform, crypto, dbConfig, deletingAccount, format, generateHash, gettingSubscribedTvShows, gettingSubscriptionStatusForSeriesWidth, gettingTvShowsAiringOn, mailer, mongoClient, storingPasswordChangeRequest, updatingPassword, _db;

  mongoClient = require('mongodb').MongoClient;

  format = require('util').format;

  crypto = require('crypto');

  mailer = require('./mailer.js');

  dbConfig = {
    "dbuser": "",
    "dbpassword": ""
  };

  exports.setDbConfig = function(dbuser, dbpassword) {
    dbConfig.dbuser = dbuser;
    dbConfig.dbpassword = dbpassword;
  };

  _db = "";

  mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
    if (!err) {
      return _db = db;
    }
  });

  exports.checkIfEmailAlreadyRegistered = function(email, callback) {
    if (_db) {
      checkingIfEmailAlreadyRegistered(email, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          checkingIfEmailAlreadyRegistered(email, db, callback);
        }
      });
    }
  };

  checkingIfEmailAlreadyRegistered = function(email, db, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = db.collection('useraccountdetails');
    collection.find({
      "email": email
    }).toArray(function(err, results) {
      console.log(results);
      if (results.length > 0) {
        result.status = true;
      } else {
        result.status = false;
      }
      result.err = err;
      result.data = results;
      return callback(result);
    });
  };

  exports.addNewUser = function(requestingUser, callback) {
    if (_db) {
      addingNewUser(requestingUser, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": {
              "firstName": "",
              "lastName": "",
              "username": "",
              "email": "",
              "signinStatus": false,
              "siginPage": "/signin",
              "dashboardPage": "",
              "status": "Sign in",
              "toggle": ""
            }
          });
        } else {
          _db = db;
          addingNewUser(requestingUser, db, callback);
        }
      });
    }
  };

  addingNewUser = function(requestingUser, db, callback) {
    var collection, result, user;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    user = {
      "firstName": "",
      "lastName": "",
      "username": "",
      "email": "",
      "signinStatus": false,
      "siginPage": "/signin",
      "dashboardPage": "",
      "status": "Sign in",
      "toggle": ""
    };
    collection = db.collection('useraccountdetails');
    collection.insert(requestingUser, function(err, docs) {
      if (err) {
        result.status = false;
      } else {
        user["firstName"] = docs[0]["firstName"];
        user["lastName"] = docs[0]["lastName"];
        user["username"] = docs[0]["username"];
        user["email"] = docs[0]["email"];
        user["signinStatus"] = true;
        user["siginPage"] = "";
        user["dashboardPage"] = "/dashboard";
        user["status"] = docs[0]["username"];
        user["toggle"] = "dropdown";
      }
      result.err = err;
      result.data = user;
      callback(result);
    });
  };

  exports.authenticateUserCredentials = function(email, password, callback) {
    console.log("authenticating user+++");
    if (_db) {
      authenticatingUserCredentials(email, password, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": {
              "firstName": "",
              "lastName": "",
              "username": "",
              "email": "",
              "signinStatus": false,
              "siginPage": "/signin",
              "dashboardPage": "",
              "status": "Sign in",
              "toggle": ""
            }
          });
        } else {
          _db = db;
          authenticatingUserCredentials(email, password, db, callback);
        }
      });
    }
  };

  authenticatingUserCredentials = function(email, password, db, callback) {
    var collection, result, user;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    user = {
      "firstName": "",
      "lastName": "",
      "username": "",
      "email": "",
      "signinStatus": false,
      "siginPage": "/signin",
      "dashboardPage": "",
      "status": "Sign in",
      "toggle": "",
      "authenticationStatus": ""
    };
    collection = db.collection('useraccountdetails');
    collection.find({
      "email": email
    }).toArray(function(err, results) {
      if (!err && results.length > 0 && results[0].password === password) {
        user["firstName"] = results[0]["firstName"];
        user["lastName"] = results[0]["lastName"];
        user["username"] = results[0]["username"];
        user["email"] = results[0]["email"];
        user["signinStatus"] = true;
        user["siginPage"] = "";
        user["dashboardPage"] = "/dashboard";
        user["status"] = results[0]["username"];
        user["toggle"] = "dropdown";
        user["authenticationStatus"] = results[0]["authenticationStatus"];
        user["timeZone"] = results[0]["timeZone"];
        result.status = true;
      } else {
        result.err = "signin error";
        result.status = false;
      }
      result.data = user;
      callback(result);
    });
  };

  exports.addSeriesToSubscribedTvShows = function(subscribingTvSeries, callback) {
    if (_db) {
      addingSeriesToSubscribedTvShows(subscribingTvSeries, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          addingSeriesToSubscribedTvShows(subscribingTvSeries, db, callback);
        }
      });
    }
  };

  addingSeriesToSubscribedTvShows = function(subscribedTvSeries, db, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = db.collection('usersubscribedtvshows');
    collection.insert(subscribedTvSeries, function(err, docs) {
      if (err) {
        result.status = false;
      }
      result.err = err;
      result.status = true;
      result.data = docs;
      callback(result);
    });
  };

  exports.getSubscribedTvShows = function(username, callback) {
    if (_db) {
      gettingSubscribedTvShows(username, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          gettingSubscribedTvShows(username, db, callback);
        }
      });
    }
  };

  gettingSubscribedTvShows = function(subscriber, db, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = db.collection('usersubscribedtvshows');
    collection.find({
      "subscribersUsername": subscriber
    }).toArray(function(err, results) {
      if (err) {
        result.status = false;
      }
      result.err = err;
      result.data = results;
      console.log(result);
      return callback(result);
    });
  };

  exports.getSubscriptionStatusForSeriesWidth = function(id, username, callback) {
    if (_db) {
      gettingSubscriptionStatusForSeriesWidth(id, username, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          gettingSubscriptionStatusForSeriesWidth(id, username, _db, callback);
        }
      });
    }
  };

  gettingSubscriptionStatusForSeriesWidth = function(id, username, db, callback) {
    var collection, result;
    collection = db.collection('usersubscribedtvshows');
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection.find({
      "subscribersUsername": username,
      "id": id
    }).toArray(function(err, results) {
      if (err) {
        result.status = false;
      } else if (results.length > 0) {
        result.status = true;
      } else {
        result.status = false;
      }
      result.err = err;
      result.data = results;
      console.log(result);
      return callback(result);
    });
  };


  /*
  exports.getTvShowsAiringOn = (dayOfWeek, callback) ->
    if _db
      gettingSubscribedTvShows dayOfWeek, _db, callback
    else 
      mongoClient.connect "mongodb://#{dbConfig.dbuser}:#{dbConfig.dbpassword}@ds029640.mongolab.com:29640/tvserieswebappdatabase", (err, db) ->
        if err
          callback 
            "err"    : err
            "status" : false
            "data"   : ""
        else 
          _db = db 
          gettingTvShowsAiringOn dayOfWeek, db, callback
        
        return
    return
   */

  gettingTvShowsAiringOn = function(dayOfWeek, db, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = db.collection('usersubscribedtvshows');
    console.log("day of week", dayOfWeek);
    collection.find({
      "airsOnDayOfWeek": dayOfWeek
    }).toArray(function(err, results) {
      if (err) {
        result.status = false;
      }
      result.err = err;
      result.data = results;
      console.log(result);
      return callback(result);
    });
  };

  exports.deleteAccount = function(username, callback) {
    if (_db) {
      deletingAccount(username, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          deletingAccount(username, _db, callback);
        }
      });
    }
  };

  deletingAccount = function(username, db, callback) {
    var result, userAccountCollection, userSubscriptionsCollection;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    userAccountCollection = db.collection('useraccountdetails');
    userSubscriptionsCollection = db.collection('usersubscribedtvshows');
    userAccountCollection.remove({
      "username": username
    }, function(err, results) {
      if (err) {
        result.status = false;
      } else {
        result.status = true;
      }
      result.err = err;
      result.data = results;
      console.log("deleting account", result);
      callback(result);
    });
    userSubscriptionsCollection.remove({
      "subscribersUsername": username
    }, function(err, results) {
      if (err) {
        result.status = false;
      } else {
        result.status = true;
      }
      result.err = err;
      result.data = results;
      console.log("deleting subscriptions all", result);
    });
  };

  exports.storePasswordChangeRequest = function(passwordResetObject, callback) {
    if (_db) {
      storingPasswordChangeRequest(passwordResetObject, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          storingPasswordChangeRequest(passwordResetObject, _db, callback);
        }
      });
    }
  };

  storingPasswordChangeRequest = function(passwordResetObject, db, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = db.collection('passwordchangerequests');
    collection.insert(passwordResetObject, function(err, docs) {
      if (err) {
        result.status = false;
      }
      result.err = err;
      result.data = docs;
      callback(result);
    });
  };

  exports.updatePassword = function(token, newPassword, callback) {
    if (_db) {
      updatingPassword(token, newPassword, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          updatingPassword(token, newPassword, _db, callback);
        }
      });
    }
  };

  updatingPassword = function(token, newPassword, db, callback) {
    var passwordChangeRequestsCollection, result, shasum, tokenhash;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    passwordChangeRequestsCollection = db.collection('passwordchangerequests');
    shasum = crypto.createHash('sha1');
    shasum.update(token);
    tokenhash = shasum.digest('hex');
    passwordChangeRequestsCollection.find({
      "tokenHash": tokenhash
    }).toArray(function(err, results) {
      var collection, email;
      console.log(results);
      if (results.length === 1) {
        result.status = true;
        email = results[0].email;
        collection = db.collection('useraccountdetails');
        collection.update({
          "email": email
        }, {
          $set: {
            "password": newPassword
          }
        }, function(err, docs) {
          if (err) {
            result.status = false;
          } else {
            result.status = true;
          }
          result.err = err;
          result.data = docs;
          callback(result);
        });
      } else {
        result.status = false;
        result.err = err;
        result.data = results;
        callback(result);
      }
    });
  };

  exports.addUnauthenticatedUser = function(unauthenticatedUserObject, callback) {
    if (_db) {
      addingUnauthenticatedUser(unauthenticatedUserObject, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          addingUnauthenticatedUser(unauthenticatedUserObject, _db, callback);
        }
      });
    }
  };

  addingUnauthenticatedUser = function(unauthenticatedUserObject, db, callback) {
    var collection, result, token;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    token = unauthenticatedUserObject.token;
    unauthenticatedUserObject.token = generateHash(unauthenticatedUserObject.token);
    collection = db.collection('unauthenticatedaccounts');
    collection.insert(unauthenticatedUserObject, function(err, docs) {
      var body, mailOptions;
      if (err) {
        result.status = false;
        result.err = err;
        result.data = docs;
        callback(result);
      } else {
        body = "<div><p>You have successfully set up your TV Series account and you can now access it by clicking on the following link:</p></div><div><p><a href='http://webapp.tvseries.dev/authenticateAccount?token=" + token + "'> http://webapp.tvseries.dev/authenticateAccount?token=" + token + " </a></p></div>";
        mailOptions = {
          from: 'TV Series <tvserieswebapp@gmail.com>',
          to: unauthenticatedUserObject.email,
          subject: 'Authenticate your TV Series Account',
          text: '',
          html: body
        };
        mailer.sendMail(mailOptions, callback);
      }
    });
  };

  generateHash = function(string) {
    var hashValue, shasum;
    shasum = crypto.createHash('sha1');
    shasum.update(string);
    hashValue = shasum.digest('hex');
    return hashValue;
  };

  exports.authenticateAccount = function(token, callback) {
    if (_db) {
      authenticatingAccount(token, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          authenticatingAccount(token, _db, callback);
        }
      });
    }
  };

  authenticatingAccount = function(token, db, callback) {
    var result, shasum, unauthenticatedAccountsCollection;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    unauthenticatedAccountsCollection = db.collection('unauthenticatedaccounts');
    shasum = crypto.createHash('sha1');
    shasum.update(token);
    token = shasum.digest('hex');
    console.log("finding token");
    unauthenticatedAccountsCollection.find({
      "token": token
    }).toArray(function(err, results) {
      var collection, email;
      console.log(results);
      if (results.length === 1) {
        result.status = true;
        email = results[0].email;
        collection = db.collection('useraccountdetails');
        console.log("updating account");
        collection.update({
          "email": email
        }, {
          $set: {
            "authenticationStatus": true
          }
        }, function(err, docs) {
          if (err) {
            result.status = false;
          } else {
            result.status = true;
          }
          result.err = err;
          result.data = docs;
          callback(result);
        });
      } else {
        result.status = false;
        result.err = err;
        result.data = results;
        callback(result);
      }
    });
  };

  exports.deleteExpiredPasswordResetTokens = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('passwordchangerequests');
      collection.find({}).toArray(function(err, results) {
        var request, _i, _len;
        console.log(results);
        if (results.length > 0) {
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            request = results[_i];
            if (new Date(request.expires) < new Date()) {
              console.log("original date", new Date(request.expires), "curr date", new Date());
              collection.remove(request, function(err, results) {
                console.log(result, "removed");
              });
            }
          }
        }
      });
    }, options, callback);
  };

  exports.deleteExpiredAccountAuthenticationTokens = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('unauthenticatedaccounts');
      collection.find({}).toArray(function(err, results) {
        var request, _i, _len;
        console.log(results);
        if (results.length > 0) {
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            request = results[_i];
            if (new Date(request.expires) < new Date()) {
              console.log("account token deleted original date", new Date(request.expires), "curr date", new Date());
              collection.remove(request, function(err, results) {
                console.log(result, "removed");
              });
            }
          }
        }
      });
    }, options, callback);
  };

  exports.addNewJob = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('jobs');
      collection.insert(options.object, function(err, docs) {
        if (err) {
          result.status = false;
        } else {
          result.status = true;
        }
        result.err = err;
        result.data = docs;
        return callback(result);
      });
      return;
    }, options, callback);
  };

  exports.getTvShowsAiringOn = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('usersubscribedtvshows');
      console.log("day of week", options.object);
      collection.find(options.object).toArray(function(err, results) {
        if (err) {
          result.status = false;
        } else {
          result.status = true;
        }
        result.err = err;
        result.data = results;
        console.log(result);
        callback(result);
      });
    }, options, callback);
  };

  exports.getMailSubscriptionJobs = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('jobs');
      collection.find(options.object).toArray(function(err, results) {
        if (err) {
          result.status = false;
        } else {
          result.status = true;
        }
        result.err = err;
        result.data = results;
        console.log(result);
        callback(result);
      });
    }, options, callback);
  };

  exports.checkIfJobsCreated = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('jobscreatedstatus');
      collection.find(options.object).toArray(function(err, results) {
        if (err) {
          result.status = false;
        } else {
          result.status = true;
        }
        if (results.length === 0) {
          result.status = false;
        }
        result.err = err;
        result.data = results;
        console.log(result);
        callback(result);
      });
    }, options, callback);
  };

  exports.addEntryToJobsCreatedStatusCollection = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection('jobscreatedstatus');
      collection.insert(options.object, function(err, docs) {
        if (err) {
          result.status = false;
        } else {
          result.status = true;
        }
        result.err = err;
        result.data = docs;
        callback(result);
      });
    }, options, callback);
  };

  exports.deleteDocumentFromCollection = function(options, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = options.db.collection(options.collection);
    collection.remove(options.object, function(err, results) {
      if (err) {
        result.status = false;
      } else {
        result.status = true;
      }
      result.err = err;
      result.data = results;
      console.log(result);
      callback(result);
    });
  };

  exports.addDocumentToCollection = function(options, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = options.db.collection(options.collection);
    collection.insert(options.object, function(err, docs) {
      if (err) {
        result.status = false;
      } else {
        result.status = true;
      }
      result.err = err;
      result.data = docs;
      callback(result);
    });
  };

  exports.searchDocumentInCollection = function(options, callback) {
    var collection, result;
    result = {
      "err": "",
      "status": "",
      "data": ""
    };
    collection = options.db.collection(options.collection);
    collection.find(options.object).toArray(function(err, results) {
      if (err) {
        result.status = false;
      } else {
        result.status = true;
      }
      result.err = err;
      result.data = results;
      console.log(result);
      callback(result);
    });
  };

  exports.updateDocumentInCollection = function(options, callback) {
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection(options.collection);
      return collection.update(options.object.searchParameter, {
        $set: options.object.updatedValue
      }, function(err, docs) {
        if (err) {
          result.status = false;
        } else {
          result.status = true;
        }
        result.err = err;
        result.data = docs;
        callback(result);
      });
    }, options, callback);
  };

  createMongodbConnectionAndPerform = function(job, options, callback) {
    if (_db) {
      job(options, _db, callback);
    } else {
      mongoClient.connect("mongodb://" + dbConfig.dbuser + ":" + dbConfig.dbpassword + "@ds029640.mongolab.com:29640/tvserieswebappdatabase", function(err, db) {
        if (err) {
          callback({
            "err": err,
            "status": false,
            "data": ""
          });
        } else {
          _db = db;
          job(options, _db, callback);
        }
      });
    }
  };

  exports.removeSeriesFromSubscribedTvShows = function(options, callback) {
    options.collection = "usersubscribedtvshows";
    createMongodbConnectionAndPerform(function(options, db, callback) {
      var collection, result, tvShow, tvShowsToBeUnsubscribed, _i, _len, _results;
      result = {
        "err": "",
        "status": "",
        "data": ""
      };
      collection = db.collection(options.collection);
      tvShowsToBeUnsubscribed = options.object;
      _results = [];
      for (_i = 0, _len = tvShowsToBeUnsubscribed.length; _i < _len; _i++) {
        tvShow = tvShowsToBeUnsubscribed[_i];
        console.log("series", tvShow);
        _results.push(collection.remove(tvShow, function(err, docs) {
          if (err) {
            result.status = false;
          } else {
            result.status = true;
          }
          result.err = err;
          result.data = docs;
          callback(result);
        }));
      }
      return _results;
    }, options, callback);
  };

}).call(this);


//# sourceMappingURL=mongodbclient.js.map