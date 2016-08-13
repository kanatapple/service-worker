'use strict';

self.addEventListener('install', event => {
    console.log('install');
    console.dir(event);
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    console.log('activate');
    console.dir(event);
    
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    console.log('fetch');
    console.dir(event);
});

self.addEventListener('push', event => {
    console.log('push');
    console.dir(event);
    
    // const message = event.data.text();
    
    event.waitUntil(
        self.registration.showNotification('Push Notification Title', {
            body: '(・∀・)',
            icon: 'https://kanatapple.github.io/sw-push-notification/images/image.jpg',
            tag: 'push-notification-tag'
        })
    );
});
