if (!self.define) {
  let e,
    n = {};
  const s = (s, c) => (
    (s = new URL(s + '.js', c).href),
    n[s] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = s), (e.onload = n), document.head.appendChild(e));
        } else ((e = s), importScripts(s), n());
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (n[i]) return;
    let a = {};
    const f = (e) => s(e, i),
      r = { module: { uri: i }, exports: a, require: f };
    n[i] = Promise.all(c.map((e) => r[e] || f(e))).then((e) => (t(...e), a));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'bc5ec5c01de5c97d4ec991ae60685786' },
        { url: '/_next/static/chunks/163-5f863dec21f83247.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/226-68b71a4970de79de.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/256-18155ea556773fe1.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/283-375c642c32ce206c.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/289-9677a8b0e456f928.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/31-36ad306400b278dd.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/328-4e2b6aa56e8e0852.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/386-722ea2be52b80825.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/400-b3826bcf1053b09c.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/412-d5cd6677b8860091.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        {
          url: '/_next/static/chunks/4bd1b696-db12812a708ce1e6.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        { url: '/_next/static/chunks/680-2f3b203968ef8ace.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/684-8eff1b8659543242.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/688-a7b3b568d6a53e64.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/845-f98cdb4653cc9780.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/874-d667473b3136338f.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/880-58874ebb8dac1209.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        { url: '/_next/static/chunks/934-8fa65cdc0992acc2.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        {
          url: '/_next/static/chunks/app/_not-found/page-45a9d3dcead95b20.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-124100eb65e78df5.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-da2f3e2ef51709f4.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/admin/page-967a78df359adfa1.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-bb956e44ae717c8f.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-bcd42fe51d48fd3d.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-4d6c5643b4873bdf.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/api/auth/refresh/route-a7d9edd8f23a0722.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-1ba74390a3ed428a.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/cart/page-9f2a93ca06cd4f69.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-4aab0348640c4eb9.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/layout-ca410d727e4f2f03.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/page-83598402eb62bd93.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-6722f45627d89884.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-4f815bfd07687e83.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-df02464c3e19b07b.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/framework-6d868e9bc95e10d8.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/main-app-c0c5f5dad7071b7c.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        { url: '/_next/static/chunks/main-dab1605c41148520.js', revision: 'vfYRnCefzm--Sn19wCvck' },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-c450cfd4c854768d.js',
          revision: 'vfYRnCefzm--Sn19wCvck',
        },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/c7f51098f282f57c.css', revision: 'c7f51098f282f57c' },
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
          url: '/_next/static/vfYRnCefzm--Sn19wCvck/_buildManifest.js',
          revision: '6c26a6b8bc568d06db38103aa0c84821',
        },
        {
          url: '/_next/static/vfYRnCefzm--Sn19wCvck/_ssgManifest.js',
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
            cacheWillUpdate: async ({ request: e, response: n, event: s, state: c }) =>
              n && 'opaqueredirect' === n.type
                ? new Response(n.body, { status: 200, statusText: 'OK', headers: n.headers })
                : n,
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
        const n = e.pathname;
        return !n.startsWith('/api/auth/') && !!n.startsWith('/api/');
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
