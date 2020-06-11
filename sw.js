/*
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 */

const version = 5;
const cacheName = 'freya-igsn-' + version;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[ServiceWorker] Installed and cached main assets.");
      return cache.addAll([
        './',
        './assets/css/material-kit.css?v=2.0.5',
        './assets/img/igsn-48.png',
        './assets/js/core/jquery.min.js',
        './assets/js/core/popper.min.js',
        './assets/js/core/bootstrap-material-design.min.js',
        './assets/js/showdown.min.js',
        './assets/js/zxing.min.js',
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
