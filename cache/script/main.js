'use strict';

if ('serviceWorker' in navigator) {
    // Service Workerの登録
    // 登録されているかどうかはブラウザがチェックしてくれる(register を何回呼んでも平気)
    // ↓この場合の Service Worker のスコープは /cache なので、
    // Service Workerはページのパスが /cache/から始まる場合のみ fetch イベントを受け取る
    // 試しにこの index.html をリポジトリ直下に置くと fetch イベントが発火しない
    navigator.serviceWorker.register('./service-worker.js'/*, {scope: './'} 明示的に指定することも可 */)
             .then((registration) => {
                 console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
             })
             .catch(console.error.bind(console));
}

