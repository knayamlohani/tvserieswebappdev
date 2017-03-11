/**
 * Created by mayanklohani on 03/03/17.
 */

var path = require('path');

var gulpConfig = {
    'server': {
        'compileCoffeeToJS': {
            'src' : path.join(__dirname, '/../../server/src/**/*.coffee'),
            'dest': path.join(__dirname, '/../../server/build/')
        } ,
        'clean': {
            'src': [
                path.join(__dirname, '/../../server/build/')
            ]
        }
    },
    'web': {
        'copyViews': {
            'src' : path.join(__dirname, '/../../web/src/views/**/*.html'),
            'dest': path.join(__dirname, '/../../web/build/views/')
        },
        'copyStaticViews': {
            'src' : path.join(__dirname, '/../../web/src/static/views/**/*.html'),
            'dest': path.join(__dirname, '/../../web/build/static/views')
        },
        'copyImages': {
            'src' : path.join(__dirname, '/../../web/src/static/images/**/*.*'),
            'dest': path.join(__dirname, '/../../web/build/static/images/')
        },
        'copyJS': {
            'src' : path.join(__dirname, '/../../web/src/static/scripts/**/*.js'),
            'dest': path.join(__dirname, '/../../web/build/static/scripts')
        },
        'clean': {
            'src': [
                path.join(__dirname, '/../../web/build/')
            ]
        },
        'compileSassToCss': {
            'src' : path.join(__dirname, '/../../web/src/static/styles/**/*.sass'),
            'dest': path.join(__dirname, '/../../web/build/static/styles/')
        },
        'compileTSToJS': {
            'src' : path.join(__dirname, '/../../web/src/static/scripts/**/*.ts'),
            'dest': path.join(__dirname, '/../../web/build/static/scripts/')
        }
    }

};

module.exports = gulpConfig;