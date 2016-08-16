'use strict';

self.addEventListener('install', (event) => {
    console.info('install', event);
});

self.addEventListener('activate', (event) => {
    console.info('activate', event);
});

self.addEventListener('sync', (event) => {
    console.info('sync', event);
});
