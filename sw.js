var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/bootstrap.min.css',
  '/css/index.css',
  '/js/app.js',
  '/js/bootstrap.min.js',
  '/js/color-thief.js',
  '/js/jquery.min.js',
  '/js/popper.min.js',
  '/js/rgb2hex.js',
  '/js/rgb2lab.js',
  '/img/Fondo.jpg',
  '/img/bean.png',
  'https://fonts.googleapis.com/css?family=Raleway&display=swap'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache open!');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// self.addEventListener('activate', event => {
//     // remove old caches
//     event.waitUntil(
//       caches.keys().then(keys => Promise.all(
//         keys.map(key => {
//           if (key != CACHE_NAME) {
//             return caches.delete(key);
//           }
//         })
//       )).then(() => {
//         console.log('Now ready to handle fetches!');
//       })
//     );
// });
