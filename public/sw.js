if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
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
  self.define = (i, c) => {
    const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => a(e, n),
      u = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(i.map((e) => u[e] || r(e))).then((e) => (c(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'c4e1990754847dd3357460ddae9656f7' },
        {
          url: '/_next/static/TpaZv3I7-CcRZ1bi70z4H/_buildManifest.js',
          revision: '9777ae078a86cd8d09128cfbe1b18161',
        },
        {
          url: '/_next/static/TpaZv3I7-CcRZ1bi70z4H/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1226-3b135a7ffbaf89b6.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/1272-8c3ead8caf2c02aa.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/1308-d5efbad2dd9c2be8.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/1684-72d7d39ce8456691.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/1746.09b41edf55389ecd.js', revision: '09b41edf55389ecd' },
        { url: '/_next/static/chunks/210-53ff01d804f6c6a2.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/2713-093b4222dd39e38d.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/294-1566971563bcef9d.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/3005-93e358c225e7be99.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/394.7233499eaccde767.js', revision: '7233499eaccde767' },
        { url: '/_next/static/chunks/4055-c0756efe8d61915a.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        {
          url: '/_next/static/chunks/4bd1b696-58f1e0c6b23b14c5.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        { url: '/_next/static/chunks/54a60aa6.028c02b81289fdb1.js', revision: '028c02b81289fdb1' },
        { url: '/_next/static/chunks/5756-df8c59725f348d78.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/6063-76508be81a07f74b.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/6461-46b8a2f056b6cb0d.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/6481-2e36412762232764.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/702-fabee3b0f3d7ee30.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/70e0d97a.f0b9e7e0cb4933d5.js', revision: 'f0b9e7e0cb4933d5' },
        { url: '/_next/static/chunks/7239-efce547f56836c64.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/7328-b14bffd2ddee6304.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/7604-3d3e20328740caf6.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/7612-a4bd43e3059918a3.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/7833-8fa2caecb0714b55.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/7999-9f90052ba93992e5.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/8353-4827f5b02299fc87.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/8880-e44ebbafd7c5b85a.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/9363-5d65439533cdaf99.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        { url: '/_next/static/chunks/9851-7f38db592657ba14.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        {
          url: '/_next/static/chunks/app/_not-found/page-98622d8c1f2dc326.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/about/page-d9fb9f38ca9d0ba3.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/%5Bid%5D/edit/page-b5c3e3e32ed82c33.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/new/page-b372cd5d07d6940e.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/page-ccfdad40b890699a.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-d3d746ef9c4cb315.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-6eeded0f8da2a677.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/page-304e02fd1b466777.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-98bb365439672198.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-61f5b6379c786cba.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/api/payment/gopay/route-35768f309cbcf942.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/api/payment/status/%5Bid%5D/route-1875fcf7effb13e2.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/api/payment/webhook/route-bedd978584abdb9b.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-0fb8a4b0b956849d.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/blog/%5Bslug%5D/page-b3f53bca363dc9e4.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/blog/page-e7af10885c2a5f86.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/cart/page-c7559e8b2daef502.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-da5e0ba599ad632b.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/layout-a6a145e0282adaa0.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/not-found-1846d3e78170d17d.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/page-988b75f9f0f9aa72.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/payment/cancel/page-3cfa0fa83ad41ba1.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/payment/status/%5Bid%5D/page-da45ec652887723f.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/payment/success/page-d956c67133940fc7.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-3fd89ab033bb6d70.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/products/page-8da435d67e156e71.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-08f6e73aa603b447.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-6a55676fab18e0ed.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        { url: '/_next/static/chunks/main-57e15206d4b47a62.js', revision: 'TpaZv3I7-CcRZ1bi70z4H' },
        {
          url: '/_next/static/chunks/main-app-4d04b116646fb0e7.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/pages/_app-5d1abe03d322390c.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/pages/_error-3b2a1d523de49635.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-3c9aa45c80b01e4b.js',
          revision: 'TpaZv3I7-CcRZ1bi70z4H',
        },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/7e08a71743caadc1.css', revision: '7e08a71743caadc1' },
        { url: '/_next/static/css/c37340727ca4fe15.css', revision: 'c37340727ca4fe15' },
        { url: '/_next/static/css/c47080da5cd0667b.css', revision: 'c47080da5cd0667b' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
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
