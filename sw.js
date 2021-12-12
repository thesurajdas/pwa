self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./style.css", "./script.js", "./img/apple-icon.png"]);
        })
    );
});