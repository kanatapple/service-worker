if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
    navigator.serviceWorker.ready
             .then((registration) => {
                 document.getElementById('button').addEventListener('click', () => {
                     registration.sync.register('sync-test')
                                 .then(() => {
                                     console.log('sync registerd');
                                 })
                                 .catch(console.error.bind(console));
                 }, false);
             })
             .catch(console.error.bind(console));
}

