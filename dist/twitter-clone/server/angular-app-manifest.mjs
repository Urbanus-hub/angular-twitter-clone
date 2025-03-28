
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 23609, hash: '74e1304d50237f9610dfd0348986fa3cd2c637b3a5034d81681d1affe25adeee', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17140, hash: '691d76afd8b5935907d13ef1579d7bb98a7bae0502104bafa9e723992bc07909', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-MKKINXLT.css': {size: 7022, hash: '+aZsDhyJibo', text: () => import('./assets-chunks/styles-MKKINXLT_css.mjs').then(m => m.default)}
  },
};
