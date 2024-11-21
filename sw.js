self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./html/list.html", "./scripts/list_script.js", "./scripts/load_list.js", "./css/style.css", "./scripts/index.js", "./html/register.html"])
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
