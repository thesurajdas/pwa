//Version
let appVersion = "v1.00";

//Files to Cache
let files = [
    './',
    './manifest.json',
    './style.css',
    './script.js',
    './icons/favicon.ico',
    './icons/mstile-150x150.png',
    './icons/android-chrome-192x192.png',
    './icons/android-chrome-512x512.png',
    './icons/apple-touch-icon.png',
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
    console.info("SW Installed!");
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
            })
    )
})

// self.addEventListener("install", e => {
//     e.waitUntil(
//         caches.open("static").then(cache => {
//             return cache.addAll(["./", "./style.css", "./script.js", "./icons/apple-touch-icon.png"]);
//         })
//     );
// });

// self.addEventListener("fetch", e => {
//     console.log(`Fetch requesting ${e.request.url}`);
//     e.respondWith(
//         caches.match(e.request).then(response =>{
//             return response || fetch (e.request);
//         })
//     );
// });