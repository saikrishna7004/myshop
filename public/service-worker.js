self.addEventListener('install', (event) => {
    console.log('Inside the install handler:', event);
});

self.addEventListener('activate', (event) => {
    console.log('Inside the activate handler:', event);
});

self.addEventListener(fetch, (event) => {
    console.log('Inside the fetch handler:', event);
});