const CACHE_NAME = 'rizo-v1';
const ASSETS = [
  './',                // Caches the index.html via the root path
  'index.html',
  'budget-tracker.html',
  'todo-list.html',
  'focus-timer.html',
  'manifest.json',
  'icon.png',          // Ensure these icons actually exist!
  'icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // We use addAll but catch errors so one missing file doesn't break it
      return cache.addAll(ASSETS).catch(err => console.log("Cache error:", err));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});