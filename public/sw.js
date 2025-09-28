if (!self.define) {
  let e,
    s = {};
  const n = (n, t) => (
    (n = new URL(n + '.js', t).href),
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
  self.define = (t, a) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let c = {};
    const r = (e) => n(e, i),
      f = { module: { uri: i }, exports: c, require: r };
    s[i] = Promise.all(t.map((e) => f[e] || r(e))).then((e) => (a(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '4d28cb26a2fddc311a861339d63f1bcc' },
        { url: '/_next/static/chunks/1226-3b135a7ffbaf89b6.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/1272-8c3ead8caf2c02aa.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/1308-d5efbad2dd9c2be8.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/1684-72d7d39ce8456691.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/1746.09b41edf55389ecd.js', revision: '09b41edf55389ecd' },
        { url: '/_next/static/chunks/210-53ff01d804f6c6a2.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/2713-8b0e19ee5b484f36.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/294-1566971563bcef9d.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/3005-8ce722ff0f56d2e3.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/394.7233499eaccde767.js', revision: '7233499eaccde767' },
        { url: '/_next/static/chunks/4055-c0756efe8d61915a.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        {
          url: '/_next/static/chunks/4bd1b696-58f1e0c6b23b14c5.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        { url: '/_next/static/chunks/54a60aa6.028c02b81289fdb1.js', revision: '028c02b81289fdb1' },
        { url: '/_next/static/chunks/5756-df8c59725f348d78.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/6063-76508be81a07f74b.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/6461-46b8a2f056b6cb0d.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/6481-2e36412762232764.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/702-fabee3b0f3d7ee30.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/70e0d97a.f0b9e7e0cb4933d5.js', revision: 'f0b9e7e0cb4933d5' },
        { url: '/_next/static/chunks/7239-efce547f56836c64.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/7328-b14bffd2ddee6304.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/7604-3d3e20328740caf6.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/7612-a4bd43e3059918a3.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/7833-7c25f21690f2f6a0.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/7999-9f90052ba93992e5.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/8353-4827f5b02299fc87.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/8880-e44ebbafd7c5b85a.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/9363-5d65439533cdaf99.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        { url: '/_next/static/chunks/9851-7f38db592657ba14.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        {
          url: '/_next/static/chunks/app/_not-found/page-98622d8c1f2dc326.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/about/page-ff3ad0420cfa8301.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/%5Bid%5D/edit/page-7fda63f5f2ea2994.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/new/page-ce95f22e2820d444.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/page-9813c987247e7183.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-43a74c4593207436.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-4639f54ffccec5f4.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/page-9f03ec047053dc83.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-e259186e58f2c5bb.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-61f5b6379c786cba.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/api/payment/gopay/route-35768f309cbcf942.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/api/payment/status/%5Bid%5D/route-1875fcf7effb13e2.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/api/payment/webhook/route-bedd978584abdb9b.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-78f4e7f2586554b9.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/blog/%5Bslug%5D/page-fa7bfea1b53600a9.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/blog/page-03b3eab6bd2050d8.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/cart/page-a74cef0bea188051.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-713d83a7201ad251.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/layout-42499789fc9e6fb4.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/not-found-202c3e28d1513248.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/page-51f66d1b07549056.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/payment/cancel/page-8b596cbea61dbb10.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/payment/status/%5Bid%5D/page-1eb504206ac6b1d8.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/payment/success/page-ae0e4dc46de97616.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-60c2a2ada0b4d49a.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/products/page-4648703e07a97d96.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-08f6e73aa603b447.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-6a55676fab18e0ed.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/app/sitemap/page-6daae6817cb6de37.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        { url: '/_next/static/chunks/main-57e15206d4b47a62.js', revision: 'kZbrgJ8IfJ-AG_jzBJ0sY' },
        {
          url: '/_next/static/chunks/main-app-4d04b116646fb0e7.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/pages/_app-5d1abe03d322390c.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/pages/_error-3b2a1d523de49635.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-3c9aa45c80b01e4b.js',
          revision: 'kZbrgJ8IfJ-AG_jzBJ0sY',
        },
        { url: '/_next/static/css/0e3e37b4ca14e9e7.css', revision: '0e3e37b4ca14e9e7' },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/c37340727ca4fe15.css', revision: 'c37340727ca4fe15' },
        { url: '/_next/static/css/c47080da5cd0667b.css', revision: 'c47080da5cd0667b' },
        {
          url: '/_next/static/kZbrgJ8IfJ-AG_jzBJ0sY/_buildManifest.js',
          revision: 'c14052b8e97c797bd824eb7426635633',
        },
        {
          url: '/_next/static/kZbrgJ8IfJ-AG_jzBJ0sY/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/58c726479f69cacd-s.woff2',
          revision: 'd9199e502565b0afc52135c7d7deb1e0',
        },
        {
          url: '/_next/static/media/bd9c8c62ffadd9dd-s.p.woff2',
          revision: 'cf639d9523aa568125160154126d1beb',
        },
        {
          url: '/_next/static/media/cc8b755e9c1ba115-s.woff2',
          revision: '8c6c750ac8274ce829ee4aea91ae06f5',
        },
        {
          url: '/_next/static/media/f952393b67d608ec-s.woff2',
          revision: 'ff1a813f73a0864d4365f5c6bd3352f4',
        },
        {
          url: '/_next/static/media/logo.aa051989.svg',
          revision: '2629f2b37ce2e3a1154a6eb90e459b2d',
        },
        { url: '/favicon.ico', revision: '03ad54fd2d24cdc2762510124d2659b1' },
        { url: '/googleb79022ff36ae2eea.html', revision: 'b5ae99b5f19f02e82789c2980b9503e5' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: t }) =>
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
