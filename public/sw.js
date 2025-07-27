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
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let a = {};
    const r = (e) => t(e, c),
      u = { module: { uri: c }, exports: a, require: r };
    s[c] = Promise.all(n.map((e) => u[e] || r(e))).then((e) => (i(...e), a));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'cea18c72008f2839348ff40125edfd67' },
        { url: '/_next/dynamic-css-manifest.json', revision: 'd751713988987e9331980363e24189ce' },
        { url: '/_next/static/chunks/148-a7839291c590fce6.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/174-1399ece6bcd94774.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/226-68b71a4970de79de.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/283-375c642c32ce206c.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/289-9677a8b0e456f928.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/328-4e2b6aa56e8e0852.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/400-b3826bcf1053b09c.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/407-231298f5586f51f2.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        {
          url: '/_next/static/chunks/4bd1b696-db12812a708ce1e6.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        { url: '/_next/static/chunks/684-8eff1b8659543242.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/715-93ed884b4e0e9fd4.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/812-62079bb3b6aa3070.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/817-86c934333467a882.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/845-7393650f8dc61bf7.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/874-bc58a2016b1f52ce.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        { url: '/_next/static/chunks/934-8fa65cdc0992acc2.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        {
          url: '/_next/static/chunks/app/_not-found/page-45a9d3dcead95b20.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-83ab85628067e3ec.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-c725245e5b7a3e62.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/admin/page-9b89b17fbbb2b605.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-e4e61879feba3c37.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/cart/page-70735763c22be4a5.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-dec5fb69b6545343.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/layout-ca65d5a83054f5a0.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/page-12ceda1a6e68cbee.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-ee7da635d7afce5c.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/framework-6d868e9bc95e10d8.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/main-app-9f4f66c0efa5e0b9.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        { url: '/_next/static/chunks/main-dab1605c41148520.js', revision: 'u5NedjUf-4QwCt6t4g_I8' },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ffddb21ee13a59c6.js',
          revision: 'u5NedjUf-4QwCt6t4g_I8',
        },
        { url: '/_next/static/css/8b7d179711c59696.css', revision: '8b7d179711c59696' },
        { url: '/_next/static/css/ef4cb6469380aea0.css', revision: 'ef4cb6469380aea0' },
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
        {
          url: '/_next/static/u5NedjUf-4QwCt6t4g_I8/_buildManifest.js',
          revision: '41c8a9076c81225363b6c419fe58d88f',
        },
        {
          url: '/_next/static/u5NedjUf-4QwCt6t4g_I8/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
