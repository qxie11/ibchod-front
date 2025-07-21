if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = n), (e.onload = s), document.head.appendChild(e));
        } else ((e = n), importScripts(n), s());
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const a = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[a]) return;
    let t = {};
    const r = (e) => n(e, a),
      u = { module: { uri: a }, exports: t, require: r };
    s[a] = Promise.all(i.map((e) => u[e] || r(e))).then((e) => (c(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '04fdca54d41cabc6324859991b0a5f13' },
        {
          url: '/_next/static/_uLgfmRCrdBGZvORxHYIP/_buildManifest.js',
          revision: '41c8a9076c81225363b6c419fe58d88f',
        },
        {
          url: '/_next/static/_uLgfmRCrdBGZvORxHYIP/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/174-b3d63de4f36a6e4d.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/231-0823558f6d51b9be.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/242-8380a72bc46faf1b.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/289-16d2b814d3ffb57c.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/328-e2f34baf1f97b3e6.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/350-f80324d65d762ad6.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/416-741fe67e36958a8e.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/452-48f0f21e107f0598.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        {
          url: '/_next/static/chunks/4bd1b696-db12812a708ce1e6.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        { url: '/_next/static/chunks/684-8eff1b8659543242.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/715-93ed884b4e0e9fd4.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/766-b10192b18b8d54a9.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/780-0d4ec1041e2975e1.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/874-bc58a2016b1f52ce.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        { url: '/_next/static/chunks/934-8fa65cdc0992acc2.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        {
          url: '/_next/static/chunks/app/_not-found/page-45a9d3dcead95b20.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-41bcb89b1613922e.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-89c9a754705776a7.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/admin/page-0b79b557c740a61a.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-44730d67fd58cc7e.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/cart/page-a9d63ed284cd7675.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-b402fb7aaea3f0dd.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/layout-cfd754bfd6445b3a.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/page-87638ae4459eb076.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-e8667034cfe5b614.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/framework-6d868e9bc95e10d8.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/main-app-c0c5f5dad7071b7c.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        { url: '/_next/static/chunks/main-dab1605c41148520.js', revision: '_uLgfmRCrdBGZvORxHYIP' },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ffddb21ee13a59c6.js',
          revision: '_uLgfmRCrdBGZvORxHYIP',
        },
        { url: '/_next/static/css/2c7c3700d92ccb03.css', revision: '2c7c3700d92ccb03' },
        { url: '/_next/static/css/8b7d179711c59696.css', revision: '8b7d179711c59696' },
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
        {
          url: '/_next/static/media/logo.aa051989.svg',
          revision: '2629f2b37ce2e3a1154a6eb90e459b2d',
        },
        { url: '/favicon.ico', revision: '03ad54fd2d24cdc2762510124d2659b1' },
        { url: '/icons/icon-192x192.png', revision: '5e83aafc044b7c3347151cf0cc762e91' },
        { url: '/icons/icon-256x256.png', revision: 'f3b6f9228b8dda668a5bcf324a5d45c3' },
        { url: '/icons/icon-384x384.png', revision: '4c6b63f6be67fedb76967b8e1b209482' },
        { url: '/icons/icon-512x512.png', revision: '251ce4472fbb4335ef8e10681aff295c' },
        { url: '/manifest.json', revision: '8264d965333d6bff62ea1c90a2118a11' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: i }) =>
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
