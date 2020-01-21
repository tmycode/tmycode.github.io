self.addEventListener('fetch', function(e) {
  let url = new URL(e.request.url);
  if(url.host.startsWith('localhost')) {
    return; // do default
  }
  else if(url.pathname.includes("/lib/")
    &&!url.pathname.includes("/lib/doc/")
    &&!url.pathname.endsWith(".html")) {
    let promised = caches.match(e.request).then(response =>{
      if(response) {
        return response;   
      }
      else {
        let h = `https://tmycode.github.io${url.pathname}/index.js`;
        return fetch(new Request(h))
          .then(resp => {
            caches.open('v1').then(function(cache) {
              cache.put(e.request.url, resp);
            });
            return resp.clone;
          });
      }
    });
    e.respondWith(promised);
  }
});