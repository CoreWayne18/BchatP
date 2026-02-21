const CACHE_NAME = 'bluemesh-v1';
// List EVERY file in your project here
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './ble.js',
  './crypto.js',
  './db.js',
  './manifest.json'
];

// 1. Install Event: Save files to the device
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets for offline use');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serve files from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file, or try to get it from network
      return response || fetch(event.request);
    })
  );
});