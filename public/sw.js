if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
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
  self.define = (a, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let c = {};
    const r = (e) => n(e, i),
      u = { module: { uri: i }, exports: c, require: r };
    s[i] = Promise.all(a.map((e) => u[e] || r(e))).then((e) => (t(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'c5a7b636a56f5614ef1ced51d68d1af1' },
        {
          url: '/_next/static/-dC8PuymHPrAPhbSVoyv7/_buildManifest.js',
          revision: '36b8385d3dd55d7a6e5c1fd85584cc82',
        },
        {
          url: '/_next/static/-dC8PuymHPrAPhbSVoyv7/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1226-3b135a7ffbaf89b6.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/1272-8c3ead8caf2c02aa.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/1295-42e6825ad4d67f9a.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/1308-d5efbad2dd9c2be8.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/1684-72d7d39ce8456691.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/1746.09b41edf55389ecd.js', revision: '09b41edf55389ecd' },
        { url: '/_next/static/chunks/294-1566971563bcef9d.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/3005-5d8b945e56efbf85.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/394.7233499eaccde767.js', revision: '7233499eaccde767' },
        {
          url: '/_next/static/chunks/4bd1b696-58f1e0c6b23b14c5.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        { url: '/_next/static/chunks/54a60aa6.028c02b81289fdb1.js', revision: '028c02b81289fdb1' },
        { url: '/_next/static/chunks/5756-df8c59725f348d78.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/5997-514a1a16ac5a3620.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/6063-76508be81a07f74b.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/6346-718e46d4ead63716.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/6461-46b8a2f056b6cb0d.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/702-ec7ebe71c13443f2.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/70e0d97a.f0b9e7e0cb4933d5.js', revision: 'f0b9e7e0cb4933d5' },
        { url: '/_next/static/chunks/7239-3797196534068861.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/7328-b14bffd2ddee6304.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/7604-3d3e20328740caf6.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/7833-4c40d29aa4b0a625.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/7999-9f90052ba93992e5.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/8353-4827f5b02299fc87.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/8880-e44ebbafd7c5b85a.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/8891-5869114d61ac9551.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/9363-5d65439533cdaf99.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/9604-e9a3962faedfc6f4.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        { url: '/_next/static/chunks/9851-7f38db592657ba14.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        {
          url: '/_next/static/chunks/app/_not-found/page-a491b7d59cdfadcc.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/about/page-699531eec1122a11.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/%5Bid%5D/edit/page-3d8f518b886bbf86.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/new/page-e0487439b3c80095.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/page-e278f533649d59bd.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-62a9652e6387bd44.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-9293fb88bdda8e79.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/page-6fb080ea96466572.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-43d701478571b322.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-8dc25fcb058a368e.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-57698d35e769416a.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/api/auth/refresh/route-761772e65ee346bb.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/api/payment/gopay/route-c567128b64d281b8.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/api/payment/status/%5Bid%5D/route-615c0c29a81b7b77.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/api/payment/webhook/route-0ca6aaf012f49fe5.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-c36c4328b53946c0.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/blog/%5Bslug%5D/page-6ba5fad9e9a190d5.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/blog/page-6320bbd3e6e46abd.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/cart/page-411d37268ef94f2e.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-f406da014f6a94a6.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/layout-5f45217523f5b55b.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/page-519ae09eb5176f85.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/payment/cancel/page-d8fe0fc4ce8f6fcd.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/payment/status/%5Bid%5D/page-82b123b2b5be4f50.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/payment/success/page-f59950b4a06f8437.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-50a708a7be08a986.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/products/page-09aeeb2d2d777dff.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-8a8838d074946a68.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-ec362bbe8dee633f.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        { url: '/_next/static/chunks/main-57e15206d4b47a62.js', revision: '-dC8PuymHPrAPhbSVoyv7' },
        {
          url: '/_next/static/chunks/main-app-68b58e61d2f456db.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/pages/_app-5d1abe03d322390c.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/pages/_error-3b2a1d523de49635.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-3c9aa45c80b01e4b.js',
          revision: '-dC8PuymHPrAPhbSVoyv7',
        },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/3d0bc1cc9a0694d4.css', revision: '3d0bc1cc9a0694d4' },
        { url: '/_next/static/css/c37340727ca4fe15.css', revision: 'c37340727ca4fe15' },
        { url: '/_next/static/css/ec123bc1b1537327.css', revision: 'ec123bc1b1537327' },
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
        { url: '/googleb79022ff36ae2eea.html', revision: '5ce8745d859092e9fe448bd4db349d5a' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
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
