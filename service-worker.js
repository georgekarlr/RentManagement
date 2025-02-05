const CACHE_NAME = 'rent-management-cache-v1'; // Version your cache
const urlsToCache = [
    '/', // Cache the index page
    'index.html',
    'styles.css',
    'composeApp.js',
    'caf14b91c9be5cff9184.wasm',
    'dd568dbcd078c0adf7cf.wasm',
    // Add paths to other static assets: images, fonts, etc.
    'composeResources/rentofsales.composeapp.generated.resources/drawable/rent.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/asset-management.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/assets.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/checked.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/contract.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/customer.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/deal.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/delete.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/fixed-asset.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/lease.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/loading.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/onrent.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/pay.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/receipt.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/settings.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/shipping.png',
    'composeResources/rentofsales.composeapp.generated.resources/drawable/written-paper.png'

];

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }

                    // Not in cache - fetch from network
                    return fetch(event.request);
                }
            )
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});