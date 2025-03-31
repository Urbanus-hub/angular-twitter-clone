
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 23609, hash: 'f437d63ba6361b9340258a3165b9add6c0728d847e2170e6a9f6688768e63864', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17140, hash: '178d056d65d8c68a4d9d9f85cafe2eb1099e0a47dea74019327d1afdeeeab997', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-MKKINXLT.css': {size: 7022, hash: '+aZsDhyJibo', text: () => import('./assets-chunks/styles-MKKINXLT_css.mjs').then(m => m.default)}
  },
};
