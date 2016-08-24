'use strict';

const CACHE_NAME = 'cache-v2';
const urlsToCache = [
    './',
    './styles/main.css',
    './images/image.jpg',
    './script/main.js'
];

self.addEventListener('install', (event)/* InstallEvent */ => {
    console.info('install', event);
    
    // Service Worker 更新時に waiting 状態をスキップしたい場合
    // event.waitUntil(self.skipWaiting());
    
    // インストール処理
    event.waitUntil(
        caches.open(CACHE_NAME)
              .then((cache) => {
                  console.log('Opened cache');
                  
                  // 指定されたリソースをキャッシュに追加する
                  return cache.addAll(urlsToCache);
              })
    );
});

self.addEventListener('activate', (event) => {
    console.info('activate', event);
    
    var cacheWhitelist = [CACHE_NAME];

    // すぐにControllerになって欲しい時は claim を呼ぶ
    // event.waitUntil(self.clients.claim());
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // ホワイトリストにないキャッシュ(古いキャッシュ)は削除する
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.info('fetch', event);
    
    event.respondWith(
        caches.match(event.request)
              .then((response) => {
                  if (response) {
                      return response;
                  }
            
                  // 重要：リクエストを clone する。リクエストは Stream なので
                  // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
                  // 必要なので、リクエストは clone しないといけない
                  let fetchRequest = event.request.clone();
            
                  return fetch(fetchRequest)
                      .then((response) => {
                          if (!response || response.status !== 200 || response.type !== 'basic') {
                              return response;
                          }
                    
                          // 重要：レスポンスを clone する。レスポンスは Stream で
                          // ブラウザ用とキャッシュ用の2回必要。なので clone して
                          // 2つの Stream があるようにする
                          let responseToCache = response.clone();
                    
                          caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                    
                          return response;
                      });
              })
    );
});
