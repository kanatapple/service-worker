'use strict';

const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    './',
    './styles/main.css',
    './script/main.js'
];

self.addEventListener('install', function (event) {
    // インストール処理
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                
                let fetchRequest = event.request.clone();
                
                return fetch(fetchRequest)
                    .then(function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        let responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
    );
});
