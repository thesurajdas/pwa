//Version
let appVersion = "v1.00";

//Files to Cache
let files = [
    '/manifest.json',
    '/icons/mstile-150x150.png',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    '/icons/apple-touch-icon.png',
    '/icons/favicon-32x32.png',
    '/icons/favicon-16x16.png',
    '/icons/safari-pinned-tab.svg',
    '/themes/sunshine/img/icon.png',
    '/themes/sunshine/img/logo.png',
    '/offline.html',
    '/themes/sunshine/stylesheet/general-style-plugins.css',
    '/themes/sunshine/stylesheet/style.css',
    'themes/sunshine/stylesheet/theme-style.css',
    '/themes/sunshine/stylesheet/font-awesome-4.7.0/css/font-awesome.min.css',
    '/themes/sunshine/javascript/jquery-3.1.1.min.js',
    '/themes/sunshine/player/fluidplayer.min.css',
    '/themes/sunshine/player/fluidplayer.min.js',
    '/themes/sunshine/javascript/welcome.js',
    '/themes/sunshine/javascript/script.js',
    '/themes/sunshine/javascript/socket.io.js',
]


//Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appVersion)
            .then(cache => {
                return cache.addAll(files)
                    .catch(err => {
                        console.error("Error adding files to cache: ", err);
                    })
            })
    )
    console.info("SW Installed!", appVersion);
    self.skipWaiting();
})


//Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache != appVersion) {
                            console.info("Deleting Old Cache: ", cache);
                            return caches.delete(cache);
                        }
                    })
                )
            })
    )
    return self.clients.claim();
})

//Fetch
self.addEventListener('fetch', event => {
    console.info('SW fetched: ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                return res || fetch(event.request);
            }).catch(() => caches.match('/offline.html'))
    )
})