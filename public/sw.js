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
  self.define = (n, a) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let c = {};
    const o = (e) => t(e, i),
      r = { module: { uri: i }, exports: c, require: o };
    s[i] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (a(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '2dfe5f788315981ce3ed3b6233bb0d5a' },
        {
          url: '/_next/static/GLWH0hvvxORO6UtGK6oVY/_buildManifest.js',
          revision: '6c26a6b8bc568d06db38103aa0c84821',
        },
        {
          url: '/_next/static/GLWH0hvvxORO6UtGK6oVY/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/226-68b71a4970de79de.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/256-18155ea556773fe1.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/283-375c642c32ce206c.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/289-9677a8b0e456f928.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/328-4e2b6aa56e8e0852.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/386-fcd43cf14ce3788f.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/400-b3826bcf1053b09c.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/407-a9d1b8da8b803437.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        {
          url: '/_next/static/chunks/4bd1b696-db12812a708ce1e6.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        { url: '/_next/static/chunks/550-f9b8847c7dbc265e.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/680-2f3b203968ef8ace.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/684-8eff1b8659543242.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/715-93ed884b4e0e9fd4.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/845-f98cdb4653cc9780.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/874-d667473b3136338f.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/880-58874ebb8dac1209.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        { url: '/_next/static/chunks/934-8fa65cdc0992acc2.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        {
          url: '/_next/static/chunks/app/_not-found/page-45a9d3dcead95b20.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-976a866a6f7a3149.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-3ae4408a44122852.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/admin/page-b30a4dd71193497d.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-cb704e241a21acfc.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-bcd42fe51d48fd3d.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-4d6c5643b4873bdf.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/api/auth/refresh/route-a7d9edd8f23a0722.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-cd0fa44960714716.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/cart/page-bd9b892cd4211bd5.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-9ae7eaef6e6e22d5.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/layout-a1c260449c938d30.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/page-074b3679fb891720.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-8c13b4f1562e6e8f.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-4f815bfd07687e83.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-df02464c3e19b07b.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/framework-6d868e9bc95e10d8.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/main-app-c0c5f5dad7071b7c.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        { url: '/_next/static/chunks/main-dab1605c41148520.js', revision: 'GLWH0hvvxORO6UtGK6oVY' },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-c450cfd4c854768d.js',
          revision: 'GLWH0hvvxORO6UtGK6oVY',
        },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/49499ca6e8f077fa.css', revision: '49499ca6e8f077fa' },
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
