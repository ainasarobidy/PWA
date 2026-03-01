const CACHE_NAME = 'drivepwa-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'css/styles.css',
  'app.js',
  'css/all.min.css',
  'assets/voiture/renault.jpeg',
  'assets/voiture/peugeot.jpeg',
  'assets/voiture/citroen.jpeg',
  'assets/voiture/ford.jpeg',
  'assets/voiture/wagen.jpeg'
];

// Installation : Mise en cache des ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Stratégie : Cache First (priorité au cache pour la rapidité)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});