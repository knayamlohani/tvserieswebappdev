// Generated by CoffeeScript 1.8.0
(function() {
  var MongoStore, app, bodyParser, cookieParser, crypto, dashboardHTML, dashboardTemplate, express, forgotPasswordHTML, forgotPasswordTemplate, fs, generateAccountAuthenticationToken, generateHash, handlebars, http, indexHTML, mongodbclient, multer, path, reportsHTML, reportsTemplate, resetPasswordHTML, resetPasswordTemplate, seriesHTML, seriesTemplate, server, session, signinHTML, signinTemplate, signupHTML, signupTemplate, tvdbWebService;

  tvdbWebService = require('tvdbwebservice');

  express = require('express');

  app = express();

  fs = require("fs");

  path = require('path');

  http = require('http');

  handlebars = require("handlebars");

  crypto = require('crypto');

<<<<<<< HEAD
=======
  //mailer = require('./mailer.js');

  //jobs = require('./jobs.js');

>>>>>>> origin/master
  app.set('port', process.env.PORT);

  app.set('tvdbApiKey', process.env.TVDB_API_KEY);

  tvdbWebService.setTvdbApiKey(app.get('tvdbApiKey'));

  mongodbclient = require('./mongodbclient.js');

  mongodbclient.setDbConfig(process.env["DB_USER"], process.env["DB_PASSWORD"]);

  cookieParser = require('cookie-parser');

  app.use(cookieParser());

  session = require('express-session');

  MongoStore = require('connect-mongo')(session);

  handlebars.registerHelper('raw-helper', function(options) {
    return options.fn();
  });

  app.use(session({
    "secret": '67gvgchgch987jbcfgxdfmhye435jvgxzdzf',
    "store": new MongoStore({
      "url": "mongodb://" + process.env["DB_USER"] + ":" + process.env["DB_PASSWORD"] + "@ds029640.mongolab.com:29640/tvserieswebappdatabase",
      "ttl": 1 * 24 * 60 * 60 * 1000
    }),
    "cookie": {
      "maxAge": 1 * 24 * 60 * 60 * 1000
    },
    "resave": false,
    "saveUninitialized": true
  }));

  bodyParser = require('body-parser');

  multer = require('multer');

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(multer());

  indexHTML = fs.readFileSync("public/index.html", "utf8");

  seriesHTML = fs.readFileSync("public/series.html", "utf8");

  signupHTML = fs.readFileSync("public/account/signup.html", "utf8");

  signinHTML = fs.readFileSync("public/account/signin.html", "utf8");

  dashboardHTML = fs.readFileSync("public/account/dashboard.html", "utf8");

  forgotPasswordHTML = fs.readFileSync("public/account/forgot-password.html", "utf8");

  resetPasswordHTML = fs.readFileSync("public/account/reset-password.html", "utf8");

  reportsHTML = fs.readFileSync("public/reports.html", "utf8");

  seriesTemplate = handlebars.compile(seriesHTML);

  signupTemplate = handlebars.compile(signupHTML);

  signinTemplate = handlebars.compile(signinHTML);

  dashboardTemplate = handlebars.compile(dashboardHTML);

  forgotPasswordTemplate = handlebars.compile(forgotPasswordHTML);

  resetPasswordTemplate = handlebars.compile(resetPasswordHTML);

  reportsTemplate = handlebars.compile(reportsHTML);


  /*================================================================================================
  Routs
  ================================================================================================
   */

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/series/seriesName/:name', function(req, res) {
    tvdbWebService.getSeriesByName(req.params.name, function(data) {
      res.end(data);
    });
  });

  app.get('/series/seriesId/:id/seriesPlusActorsPlusBanners', function(req, res) {
    tvdbWebService.getSeriesPlusActorsPlusBannersById(req.params.id, function(data) {
      res.end(data);
    });
  });

  app.get('/series/seriesId/:id/seriesOnly', function(req, res) {
    tvdbWebService.getSeriesOnlyById(req.params.id, function(data) {
      res.end(data);
    });
  });

  app.get('/series/seriesId/:id/actors', function(req, res) {
    tvdbWebService.getActorsForSeriesWithId(req.params.id, function(data) {
      res.end(data);
    });
  });

  app.get('/series/seriesId/:id/banners/', function(req, res) {
    tvdbWebService.getBannersForSeriesWithId(req.params.id, function(data) {
      res.end(data);
    });
  });

  app.get('/series?id=:id/episode?airDate=:airDate', function(req, res) {
    tvdbwebservice.getEpisodeAiredOnDateForSeriesWithId(req.params.airDate, req.params.id, function(data) {
      res.end(data);
    });
  });

  app.get('/', function(req, res) {
    var indexTemplate, result, signinObject;
    console.log("requesting series homepage");
    if (!indexTemplate) {
      indexHTML = fs.readFileSync("public/index.html", "utf8");
      indexTemplate = handlebars.compile(indexHTML);
    }
    signinObject = {
      "firstName": "",
      "lastName": "",
      "username": "",
      "email": "",
      "signinStatus": false,
      "signinPage": "/signin?redirect=/",
      "dashboardPage": "",
      "status": "Sign in",
      "toggle": "",
      "signout": ""
    };
    if (req.session.username) {
      signinObject = {
        "firstName": req.session["firstName"],
        "lastName": req.session["lastName"],
        "username": req.session.username,
        "email": req.session.email,
        "signinStatus": true,
        "signinPage": "",
        "dashboardPage": "/dashboard",
        "status": req.session.username,
        "toggle": "dropdown",
        "signout": "/signout?redirect=/"
      };
    }
    result = indexTemplate(signinObject);
    console.log("account:", signinObject);
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    res.write(result);
    res.end();
  });

  app.get('/signup', function(req, res) {
    var result, signupObject;
    console.log("signup");
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    signupObject = {
      "errorMessage": "",
      "redirect": ""
    };
    if (!signupTemplate) {
      signupHTML = fs.readFileSync("public/signup.html", "utf8");
      signupTemplate = handlebars.compile(signupHTML);
    }
    result = signupTemplate(signupObject);
    res.write(result);
    res.end();
  });

  app.post('/signup', function(req, res) {
    req.session["firstName"] = "";
    req.session["lastName"] = "";
    req.session.username = "";
    req.session.email = "";
    req.session["signinStatus"] = false;
    mongodbclient.checkIfEmailAlreadyRegistered(req.body.email, function(mailStausResult) {
      var password, shasum;
      console.log("found status", mailStausResult);
      if (!mailStausResult.status) {
        shasum = crypto.createHash('sha1');
        shasum.update(req.body["password"]);
        password = shasum.digest('hex');
        mongodbclient.addNewUser({
          "firstName": req.body["firstName"],
          "lastName": req.body["lastName"],
          "username": req.body["username"],
          "email": req.body["email"],
          "password": password,
          "timeZone": req.body["timeZone"],
          "authenticationStatus": false
        }, function(result) {
          var expires, unauthenticatedUser;
          expires = new Date();
          expires.setHours(expires.getHours() + 24);
          unauthenticatedUser = {
            "token": "",
            "expires": expires,
            "email": req.body.email
          };
          generateAccountAuthenticationToken(unauthenticatedUser, function(result) {
            console.log("account authentication token created", result);
          });
          res.redirect('/signin');
        });
      } else {
        res.redirect('/account/signup.html');
      }
    });
  });

  app.get('/series', function(req, res) {
    var result, seriesPageData, template;
    console.log('requesting series', req.query);
    if (!seriesHTML) {
      indexHTML = fs.readFileSync("public/series.html", "utf8");
    }
    seriesPageData = {
      "firstName": "",
      "lastName": "",
      "username": "",
      "email": "",
      "signinStatus": false,
      "signinPage": "/signin?redirect=/series&&name=" + req.query.name + "&id=" + req.query.id + "&bannerUrl=" + req.query.bannerUrl + "&altBannerUrl=" + req.query.altBannerUrl,
      "dashboardPage": "",
      "status": "Sign in",
      "toggle": "",
      "name": req.query.name,
      "id": req.query.id,
      "bannerUrl": req.query.bannerUrl,
      "altBannerUrl": req.query.altBannerUrl,
      "signout": ""
    };
    if (req.session.username) {
      seriesPageData = {
        "firstName": req.session["firstName"],
        "lastName": req.session["lastName"],
        "username": req.session.username,
        "email": req.session.email,
        "signinStatus": true,
        "signinPage": "",
        "dashboardPage": "/dashboard",
        "status": req.session.username,
        "toggle": "dropdown",
        "name": req.query.name,
        "id": req.query.id,
        "bannerUrl": req.query.bannerUrl,
        "altBannerUrl": req.query.altBannerUrl,
        "signout": "/signout?redirect=/series&&name=" + req.query.name + "&id=" + req.query.id + "&bannerUrl=" + req.query.bannerUrl + "&altBannerUrl=" + req.query.altBannerUrl
      };
    }
    template = handlebars.compile(seriesHTML);
    result = template(seriesPageData);
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    res.write(result);
    res.end();
  });

  app.get('/deleteAccount', function(req, res) {
    var username;
    if (req.session.username) {
      username = req.session.username;
      req.session.destroy(function(err) {});
      return mongodbclient.deleteAccount(username, function(result) {
        if (!result.err) {
          res.redirect('/');
        }
      });
    } else {

    }
  });

  app.get('/authenticateAccount', function(req, res) {
    var reportsPageData, result, template, token;
    token = req.query.token;
    reportsPageData = {
      "message": "Please wait while authenticating your TV Series Account"
    };
    if (!reportsHTML) {
      reportsHTML = fs.readFileSync("public/reports.html", "utf8");
    }
    template = handlebars.compile(reportsHTML);
    result = template(reportsPageData);
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    res.write(result);
    mongodbclient.authenticateAccount(token, function(result) {
      console.log("account authenticatec status", result);
    });
    res.end();
  });

  app.get('/mailAccountAuthenticationLink', function(req, res) {
    var expires, unauthenticatedUser;
    if (req.session.email) {
      expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);
      unauthenticatedUser = {
        "token": "",
        "expires": expires,
        "email": req.session.email
      };
      generateAccountAuthenticationToken(unauthenticatedUser, function(result) {
        console.log("account authentication token created", result);
        res.redirect('/signin');
      });
    }
  });

  app.get('/forgotPassword', function(req, res) {
    var forgotPasswordPageData, result, template;
    console.log('requesting forgot password page', req.query);
    if (!forgotPasswordHTML) {
      forgotPasswordHTML = fs.readFileSync("public/account/forgot-password.html", "utf8");
    }
    forgotPasswordPageData = {
      "message": "",
      "email": ""
    };
    template = handlebars.compile(forgotPasswordHTML);
    result = template(forgotPasswordPageData);
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    res.write(result);
    res.end();
  });

  app.post('/forgotPassword', function(req, res) {
    var forgotPasswordPageData, result, template;
    console.log('requesting forgot password page', req.bod);
    if (!forgotPasswordHTML) {
      forgotPasswordHTML = fs.readFileSync("public/account/forgot-password.html", "utf8");
    }
    forgotPasswordPageData = {
      "message": "A password reset link has been sent to your mail",
      "email": req.body.email
    };
    mailer.mailPasswordResetLinkTo(req.body.email);
    template = handlebars.compile(forgotPasswordHTML);
    result = template(forgotPasswordPageData);
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    res.write(result);
    res.end();
  });

  app.get('/resetPassword', function(req, res) {
    var resetPasswordPageData, result, template;
    console.log('requesting reset password page');
    if (!resetPasswordHTML) {
      resetPasswordHTML = fs.readFileSync("public/account/reset-password.html", "utf8");
    }
    resetPasswordPageData = {
      "message": "",
      "passwordResetToken": req.query.token
    };
    template = handlebars.compile(resetPasswordHTML);
    result = template(resetPasswordPageData);
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    res.write(result);
    res.end();
  });

  app.post('/resetPassword', function(req, res) {
    var newPassword;
    newPassword = generateHash(req.body.password);
    mongodbclient.updatePassword(req.body.passwordResetToken, newPassword, function(result) {
      console.log("password updated successfully");
      res.redirect('/signin');
    });
  });

  app.get('/signin-status', function(req, res) {
    if (req.session.username) {
      req.session["signin-status"] = true;
    } else {
      req.session["signin-status"] = false;
    }
    res.end(JSON.stringify({
      "firstName": req.session["firstName"],
      "email": req.session["email"],
      "username": req.session["username"],
      "signinStatus": req.session["signinStatus"]
    }));
  });

  app.get('/signout', function(req, res) {
    req.session.destroy(function(err) {
      var redirectUrl;
      redirectUrl = "";
      if (req.query.redirect === "/series") {
        redirectUrl = "/series?name=" + req.query.name + "&id=" + req.query.id + "&bannerUrl=" + req.query.bannerUrl + "&altBannerUrl=" + req.query.altBannerUrl;
      } else {
        redirectUrl = req.query.redirect;
      }
      res.redirect(redirectUrl);
    });
  });

  app.get('/signin', function(req, res) {
    var redirect, result, signinObject;
    console.log("status code", req);
    console.log("redirect", req.query.redirect);
    redirect = "" + req.query.redirect + "?name=" + req.query.name + "&id=" + req.query.id + "&bannerUrl=" + req.query.bannerUrl + "&altBannerUrl=" + req.query.altBannerUrl;
    res.writeHead(200, {
      "Context-Type": "text/html"
    });
    signinObject = {
      "email": "",
      "errorMessage": "",
      "redirect": redirect
    };
    if (!signinTemplate) {
      signinHTML = fs.readFileSync("public/signin.html", "utf8");
      signinTemplate = handlebars.compile(signinHTML);
    }
    result = signinTemplate(signinObject);
    res.write(result);
    res.end();
  });

  app.post('/signin', function(req, res) {

    /*
    res.writeHead 200, {"Context-Type": "text/html"}
    reportsObject = 
      "message" : "Signing in"
    
    if !reportsTemplate
      reportsHTML = fs.readFileSync "public/reports.html", "utf8"
      reportsTemplate = handlebars.compile reportsHTML
    
    result = reportsTemplate reportsObject
    res.write result
    res.end()
     */
    var password, redirect, shasum;
    shasum = crypto.createHash('sha1');
    shasum.update(req.body["password"]);
    password = shasum.digest('hex');
    redirect = req.body.redirect;
    mongodbclient.authenticateUserCredentials(req.body.email, password, function(result) {
      var renderedPage, signinObject;
      console.log(result);
      if (!result.err && result.data.authenticationStatus) {
        req.session.username = result.data.username;
        req.session["firstName"] = result.data.firstName;
        req.session["lastName"] = result.data.lastName;
        req.session["email"] = result.data.email;
        req.session["username"] = result.data.username;
        req.session["authenticationStatus"] = result.data.authenticationStatus;
        req.session["signinStatus"] = result.data["signinStatus"];
        req.session["timeZone"] = result.data["timeZone"];
        res.redirect(redirect);
      } else {
        res.writeHead(200, {
          "Context-Type": "text/html"
        });
        if (!signinTemplate) {
          signinHTML = fs.readFileSync("public/account/signin.html", "utf8");
          signinTemplate = handlebars.compile(signinHTML);
        }
        signinObject = {
          "errorMessage": "Either the username or password you entered is wrong",
          "authenticationStatus": "Your TV Series Account is not authenticated",
          "unauthenticated": !result.data.authenticationStatus,
          "redirect": redirect
        };
        if (!result.err) {
          signinObject.errorMessage = "";
        } else {
          signinObject.authenticationStatus = "";
        }
        console.log("signinTemplate", signinObject);
        renderedPage = signinTemplate(signinObject);
        res.write(renderedPage);
        res.end();
      }
    });
  });

  app.get('/dashboard', function(req, res) {
    var result, signinObject;
    console.log("requesting dashboard");
    if (!req.session["signinStatus"]) {
      return res.redirect('/signin');
    } else {
      signinObject = {
        "firstName": req.session["firstName"],
        "lastName": req.session["lastName"],
        "username": req.session.username,
        "email": req.session.email,
        "signinStatus": true,
        "signinPage": "",
        "dashboardPage": "/dashboard",
        "status": req.session.username,
        "toggle": "dropdown",
        "signout": "/signout?redirect=/"
      };
      res.writeHead(200, {
        "Context-Type": "text/html"
      });
      if (!dashboardTemplate) {
        dashboardHTML = fs.readFileSync("public/account/dashboard.html", "utf8");
        dashboardTemplate = handlebars.compile(dashboardHTML);
      }
      result = dashboardTemplate(signinObject);
      res.write(result);
      return res.end();
    }
  });

  app.get('/subscriptions', function(req, res) {
    if (!req.session["signinStatus"]) {
      res.redirect('/signin');
    } else {
      mongodbclient.getSubscribedTvShows(req.session.username, function(result) {
        console.log("result is ", result);
        console.log("sending server data to client");
        res.end(JSON.stringify(result, null, 4));
      });
    }
  });

  app.get('/subscribe', function(req, res) {
    var subscribingTvSeries;
    if (!req.session["signinStatus"]) {
      res.end(JSON.stringify({
        "err": {
          "code": "401",
          "message": "Not Signedin"
        },
        "status": false,
        "data": null
      }));
    } else {
      subscribingTvSeries = {
        "subscribersUsername": req.session.username,
        "subscribersFirstName": req.session.firstName,
        "subscribersLastName": req.session.lastName,
        "subscribersEmail": req.session.email,
        "id": req.query.id,
        "name": req.query.name,
        "artworkUrl": req.query.artworkUrl,
        "airsOnDayOfWeek": req.query.airsOnDayOfWeek,
        "subscribersTimeZone": req.session.timeZone
      };
      mongodbclient.addSeriesToSubscribedTvShows(subscribingTvSeries, function(result) {
        return res.end(JSON.stringify(result, null, 4));
      });
    }
  });

  app.post('/unsubscribe', function(req, res) {
    var tvShow, tvShowsToBeUnsubscribed, _i, _len;
    if (!req.session["signinStatus"]) {
      res.end(JSON.stringify({
        "err": {
          "code": "401",
          "message": "Not Signedin"
        },
        "status": false,
        "data": null
      }));
    } else {
      tvShowsToBeUnsubscribed = req.body.tvShowsToBeUnsubscribed;
      for (_i = 0, _len = tvShowsToBeUnsubscribed.length; _i < _len; _i++) {
        tvShow = tvShowsToBeUnsubscribed[_i];
        tvShow["subscribersUsername"] = req.session.username;
      }
      console.log("tv series object to be unsubscribed -\n", tvShowsToBeUnsubscribed);
      mongodbclient.removeSeriesFromSubscribedTvShows({
        "object": tvShowsToBeUnsubscribed
      }, function(result) {
        console.log(result);
        return res.end(JSON.stringify(result, null, 4));
      });
    }
  });

  app.get('/subscriptions/getSeries', function(req, res) {
    if (req.session.signinStatus) {
      console.log("checking subscription status for series with id", req.query.id);
      mongodbclient.getSubscriptionStatusForSeriesWidth(req.query.id, req.session.username, function(result) {
        return res.end(JSON.stringify(result, null, 4));
      });
    } else {
      res.end(JSON.stringify({
        "err": null,
        "status": false,
        "data": ""
      }));
    }
  });

  console.log("Attempting to start server at " + (app.get('port')));

  server = http.createServer(app).listen(app.get('port'), function() {
    var address, powFile, powHost;
    address = server.address();
    console.log("Node app is running at ", address);
    if (process.platform === 'darwin') {
      powHost = "webapp.tvseries";
      powFile = path.resolve(process.env['HOME'], ".pow/" + powHost);
      fs.writeFile(powFile, address.port, (function(_this) {
        return function(err) {
          var unhost;
          if (err) {
            return console.error(err);
          }
          console.log("Hosted on: " + powHost + ".dev");
          unhost = function() {
            var e;
            try {
              fs.unlinkSync(powFile);
              console.log("Unhosted from: " + powHost + ".dev");
            } catch (_error) {
              e = _error;
              if (err) {
                return console.error(err);
              }
            }
          };
          process.on('SIGINT', function() {
            unhost();
            process.exit();
          });
          return process.on('exit', function(code) {
            unhost();
          });
        };
      })(this));
    }
  });

  app.use(express["static"](__dirname + '/public'));


  /*
  (() ->
    
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    currentDay = days[(new Date()).getDay()]
    subscribers = {}
    allUsers = []
    temp = []
    mongodbclient.getTvShowsAiringOn currentDay, (result) ->
       *console.log "TV Shows Airing on #{currentDay} -\n", result
  
      
  
      for tvShow in result.data
  
        if !subscribers[tvShow.subscribersUsername]
          subscribers[tvShow.subscribersUsername] = {}
          subscribers[tvShow.subscribersUsername].tvShows = []
          subscribers[tvShow.subscribersUsername].email = tvShow.subscribersEmail
          subscribers[tvShow.subscribersUsername].username = tvShow.subscribersUsername
          subscribers[tvShow.subscribersUsername].name = tvShow.subscribersFirstName + " " + tvShow.subscribersLastName
  
          allUsers.push tvShow.subscribersUsername
        subscribers[tvShow.subscribersUsername].tvShows.push 
          "name"       : tvShow.name
          "id"         : tvShow.id
          "artworkUrl" : tvShow.artworkUrl
  
       *console.log "subscribers today -\n", JSON.stringify subscribers, null, 4
  
      for user in allUsers
        temp.push
          "email"    : subscribers[user].email
          "name"     : subscribers[user].name
          "username" : subscribers[user].username
          "tvShows"  : subscribers[user].tvShows
      
      console.log JSON.stringify temp, null, 4
      mailer.mailSubscriptions(temp)
      return
    return
  )()
   */

  generateAccountAuthenticationToken = function(unauthenticatedUser, callback) {
    crypto.randomBytes(32, function(ex, buf) {
      var token;
      token = buf.toString('hex');
      unauthenticatedUser.token = token;
      mongodbclient.addUnauthenticatedUser(unauthenticatedUser, callback);
    });
  };

  generateHash = function(string) {
    var hashValue, shasum;
    shasum = crypto.createHash('sha1');
    shasum.update(string);
    hashValue = shasum.digest('hex');
    return hashValue;
  };

<<<<<<< HEAD
=======
  //jobs.performJobs();

>>>>>>> origin/master
}).call(this);


//# sourceMappingURL=index.js.map
