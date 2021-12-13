self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./style.css", "./script.js", "./pwa/icons/apple-touch-icon.png"]);
        })
    );
});

self.addEventListener("fetch", e => {
    console.log(`Fetch requesting ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch (e.request);
        })
    );
});