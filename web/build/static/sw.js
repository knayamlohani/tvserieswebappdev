/**
 * Created by mayanklohani on 04/07/17.
 */

(function() {

    var itemsToCache = [
        '/images/background_wall.jpg',
        '/app.css',
        '/polyfills.js',
        '/app.js',
        '/vendor.js'
    ];

    var cachesToKeep = [
        'static-resources-cache-1'
    ];



    var STATIC_RESOURCES_CACHE_1 = cachesToKeep[0];

    self.addEventListener('activate', function (event) {
        event.waitUntil(
            caches.keys().then(function(cacheNames) {
                return Promise.all[
                    cacheNames.filter(function(cacheName) {
                        return cachesToKeep.indexOf(cacheName) == -1
                    }).map(function(cacheName) {
                        return caches.delete(cacheName)
                    })
                ]
            })
        );
    });

    self.addEventListener('install', function (event) {
        event.waitUntil(
            caches
                .open(STATIC_RESOURCES_CACHE_1)
                .then(function(cache) {
                    return cache.addAll(itemsToCache);
                })
        )
    });


    self.addEventListener('fetch', function (event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        )
    })
})();