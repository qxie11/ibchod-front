if (!self.define) {
  let e,
    s = {};
  const t = (t, n) => (
    (t = new URL(t + '.js', n).href),
    s[t] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = t), (e.onload = s), document.head.appendChild(e));
        } else ((e = t), importScripts(t), s());
      }).then(() => {
        let e = s[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const a = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[a]) return;
    let c = {};
    const o = (e) => t(e, a),
      r = { module: { uri: a }, exports: c, require: o };
    s[a] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (i(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '085975efe2a3f8f316ee81334fdf0d87' },
        { url: '/_next/static/chunks/261-85c683bb9933cf37.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/328-e2f34baf1f97b3e6.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/386-5a9bda70ed65098e.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/490-5a60ac65035a2eda.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        {
          url: '/_next/static/chunks/4bd1b696-db12812a708ce1e6.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        { url: '/_next/static/chunks/606-a56ae084da76cc65.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/684-8eff1b8659543242.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/715-67b6463df3c2b2d8.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/730-fe494f849b62957d.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/751-712a9bd1c2ab82c1.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/818-447bb07737d9c8e7.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        { url: '/_next/static/chunks/957-a0e5a0ed14efc39e.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        {
          url: '/_next/static/chunks/app/_not-found/page-45a9d3dcead95b20.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/api/exit-preview/route-3ccb492b5bef62da.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/api/preview/route-5e74ea85d641858e.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/api/revalidate/route-f1eb94dec472ebeb.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/cart/page-dc2eaaef5fa2f8b9.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/layout-8533cb32f54ee2e5.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/page-b477bfb7d2ffbe8c.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-ba2d037b0022bc68.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/app/slice-simulator/page-72f31ea5857abfff.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/framework-6d868e9bc95e10d8.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/main-app-c0c5f5dad7071b7c.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        { url: '/_next/static/chunks/main-dab1605c41148520.js', revision: 'gtOj1H-O1jIqoTl9WXqud' },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ffddb21ee13a59c6.js',
          revision: 'gtOj1H-O1jIqoTl9WXqud',
        },
        { url: '/_next/static/css/7142ecae7732a50c.css', revision: '7142ecae7732a50c' },
        { url: '/_next/static/css/8b7d179711c59696.css', revision: '8b7d179711c59696' },
        {
          url: '/_next/static/gtOj1H-O1jIqoTl9WXqud/_buildManifest.js',
          revision: '62924ed18751945497bf18d2d48d45b0',
        },
        {
          url: '/_next/static/gtOj1H-O1jIqoTl9WXqud/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/58c726479f69cacd-s.woff2',
          revision: 'd9199e502565b0afc52135c7d7deb1e0',
        },
        {
          url: '/_next/static/media/608934cf5dc8c2bc-s.woff2',
          revision: 'a367833c17aa9388c1aa83f41072ac2b',
        },
        {
          url: '/_next/static/media/cc8b755e9c1ba115-s.woff2',
          revision: '8c6c750ac8274ce829ee4aea91ae06f5',
        },
        {
          url: '/_next/static/media/ea015128149a20d9-s.p.woff2',
          revision: 'ee8e69129b6669254d0bbbf5105bf568',
        },
        { url: '/icons/icon-192x192.png', revision: '8f5fc1a916f106f6fbc6cf8962059b10' },
        { url: '/icons/icon-256x256.png', revision: '0087b588c598ed09dc4f8220dae21978' },
        { url: '/icons/icon-384x384.png', revision: '2c99038bd6536da3d63e17f5024a3a89' },
        { url: '/icons/icon-512x512.png', revision: '4fa71297a53b9ff68824236e0602c483' },
        { url: '/manifest.json', revision: '512d25d05bf12313279bf6ae762b4096' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: t, state: n }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    ));
});
