if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
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
  self.define = (n, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let c = {};
    const u = (e) => a(e, i),
      r = { module: { uri: i }, exports: c, require: u };
    s[i] = Promise.all(n.map((e) => r[e] || u(e))).then((e) => (t(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '6f120a65b2d04b4c179d05c2d1dc7ded' },
        {
          url: '/_next/static/bPZGXVfDey5HCDNdua-BZ/_buildManifest.js',
          revision: 'e67dd09faf1895bc9f86d447115c4dce',
        },
        {
          url: '/_next/static/bPZGXVfDey5HCDNdua-BZ/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1272-8c3ead8caf2c02aa.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/1308-d5efbad2dd9c2be8.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/1613-5c4b67c720dc9e67.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/1684-72d7d39ce8456691.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/294-1566971563bcef9d.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/3005-b6945f69116fdde6.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/3288-c6faadf61b0f86de.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/4031-23462cee48d1de8d.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        {
          url: '/_next/static/chunks/4bd1b696-58f1e0c6b23b14c5.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        { url: '/_next/static/chunks/5077-654142f8b2f85602.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/526-4febfe55a19536d6.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/5756-df8c59725f348d78.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/6076-0b6851cb840d479c.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/6461-46b8a2f056b6cb0d.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/688-d055724ead7f45c9.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/7239-3797196534068861.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/7328-b14bffd2ddee6304.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/7999-9f90052ba93992e5.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/8321-fe0761abfd73a7e1.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/8353-4827f5b02299fc87.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/8880-e44ebbafd7c5b85a.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/9604-e9a3962faedfc6f4.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        { url: '/_next/static/chunks/9851-7f38db592657ba14.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        {
          url: '/_next/static/chunks/app/_not-found/page-a491b7d59cdfadcc.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/%5Bid%5D/edit/page-765f85487e74cd7d.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/new/page-85d62ebcb7a287ef.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/blog/page-fc600a7e687d7685.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-1c07f18020057b7d.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/orders/page-61da7ef82f9e035e.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/page-e6c12fe8c2da2e4a.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/admin/smartphones/page-844325087965fe2b.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-8dc25fcb058a368e.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-57698d35e769416a.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/api/auth/refresh/route-761772e65ee346bb.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/api/payment/gopay/route-c567128b64d281b8.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/api/payment/status/%5Bid%5D/route-615c0c29a81b7b77.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/api/payment/webhook/route-0ca6aaf012f49fe5.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-199a89ef04518246.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/blog/%5Bslug%5D/page-25ff525e35c9d0ae.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/blog/page-37e4ef4304068c94.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/cart/page-d869b38b75d941ca.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/checkout/page-97b87c52ee195647.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/layout-429c330fb1a0dbbb.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/page-63e33e7bd6683c67.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/payment/cancel/page-8a5cb045cb4835ce.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/payment/status/%5Bid%5D/page-4c5930799156ea75.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/payment/success/page-b5fd0db5eda706fa.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/product/%5Bid%5D/page-a6694d8ec7ea8377.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/products/page-8e0d8196eb437a31.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-8a8838d074946a68.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-ec362bbe8dee633f.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        { url: '/_next/static/chunks/main-57e15206d4b47a62.js', revision: 'bPZGXVfDey5HCDNdua-BZ' },
        {
          url: '/_next/static/chunks/main-app-68b58e61d2f456db.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/pages/_app-5d1abe03d322390c.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/pages/_error-3b2a1d523de49635.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-58870cf76223841f.js',
          revision: 'bPZGXVfDey5HCDNdua-BZ',
        },
        { url: '/_next/static/css/16466131d8ae5843.css', revision: '16466131d8ae5843' },
        { url: '/_next/static/css/192f03b8d23580b6.css', revision: '192f03b8d23580b6' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
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
