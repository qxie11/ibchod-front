if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, n) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let i = {};
    const r = (e) => a(e, t),
      o = { module: { uri: t }, exports: i, require: r };
    s[t] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (n(...e), i));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '6e8b3b1ff56f47a814024e6051587a5a' },
        {
          url: '/_next/static/OO3CcUDM0_IWBXR4TxpL0/_buildManifest.js',
          revision: 'e43634992a8d2a44405ca6e805b9dc61',
        },
        {
          url: '/_next/static/OO3CcUDM0_IWBXR4TxpL0/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/163-71a123a78f007caf.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/256-18155ea556773fe1.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/289-9677a8b0e456f928.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/31-36ad306400b278dd.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/328-4e2b6aa56e8e0852.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/386-da942026dda2ae68.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/400-b85f726d49c08263.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/412-d5cd6677b8860091.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        {
          url: '/_next/static/chunks/4bd1b696-db12812a708ce1e6.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        { url: '/_next/static/chunks/680-2f3b203968ef8ace.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/684-8eff1b8659543242.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/688-a7b3b568d6a53e64.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/835-699433a0a63b03f3.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/845-f98cdb4653cc9780.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/874-d667473b3136338f.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/880-58874ebb8dac1209.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/934-8fa65cdc0992acc2.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        { url: '/_next/static/chunks/944-f655b0c6e7ac2a44.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        {
          url: '/_next/static/chunks/app/_not-found/page-45a9d3dcead95b20.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-124100eb65e78df5.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-da2f3e2ef51709f4.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/admin/page-6e1a314e2de51ba9.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-e0d60642b1195fcc.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-55d4d31d517eab96.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-4a638f2f23280487.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/api/auth/refresh/route-adb22cdd4c8b9e26.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/api/payment/gopay/route-0854295749dea973.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/api/payment/status/%5Bid%5D/route-3b11f3086041bee5.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/api/payment/webhook/route-f44e6a2c29669d54.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-1ba74390a3ed428a.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/cart/page-9f2a93ca06cd4f69.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-064dee693300eaea.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/layout-ca410d727e4f2f03.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/page-83598402eb62bd93.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/payment/cancel/page-b3ea1ef6bd86a1e6.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/payment/status/%5Bid%5D/page-b59ddc9b55f5a55b.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/payment/success/page-f29e2f94f70d3970.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-6722f45627d89884.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-6a65ff4b7fad9e9b.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/simple/page-0ecf9acb0de06723.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-7df60cfe71f35032.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/app/test/page-57803386ac2c3aa2.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/framework-6d868e9bc95e10d8.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/main-app-c0c5f5dad7071b7c.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        { url: '/_next/static/chunks/main-dab1605c41148520.js', revision: 'OO3CcUDM0_IWBXR4TxpL0' },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-c450cfd4c854768d.js',
          revision: 'OO3CcUDM0_IWBXR4TxpL0',
        },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/ad292f7c36a6b789.css', revision: 'ad292f7c36a6b789' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: c }) =>
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
