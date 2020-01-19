self.addEventListener('fetch', function(e) {
  let url = new URL(e.request.url);
  if(url.host.startsWith('localhost')) {
    return; // do default
  }
  else if(url.pathname.startsWith("/lib/")) {
    let promised = caches.match(e.request).then(response =>{
      if(response) {
        return response;   
      }
      else {
        let path = url.pathname.substr(4);// remove "/lib"
        let h = `https://tmcodesdk.github.io${path}/index.js`;
        return fetch(new Request(h))
          .then(resp => {
              // let copy = resp.clone();
              // caches.put(e.request.url, copy);
              return resp;
          });
      }
    });
    e.respondWith(promised);
  }
});