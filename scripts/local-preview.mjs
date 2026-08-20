import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import * as sass from 'sass';

const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const host = valueAfter('--host', '0.0.0.0');
const port = Number(valueAfter('--port', '4173'));
const root = process.cwd();

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const compileCss = async () => {
  const raw = await readFile(join(root, 'assets/css/main.scss'), 'utf8');
  return sass.compileString(raw.replace(/^---\s*---\s*/s, ''), {
    loadPaths: [join(root, '_sass')],
    style: 'expanded',
    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div']
  }).css;
};

const homepageContent = async () => {
  const source = await readFile(join(root, '_pages/about.md'), 'utf8');
  return source.replace(/^---[\s\S]*?---\s*/, '');
};

const renderHomepage = async () => {
  const content = await homepageContent();
  return `<!doctype html>
  <html lang="en" class="no-js" data-theme-mode="auto">
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#f4f1ea"><title>Rongkun Zhou</title>
    <script>try{const mode=localStorage.getItem('themeMode')||'auto';const hour=new Date().getHours();const theme=mode==='auto'?(hour>=7&&hour<19?'light':'dark'):mode;document.documentElement.dataset.themeMode=mode;document.documentElement.dataset.theme=theme;}catch(error){}</script>
    <link rel="stylesheet" href="/preview-main.css">
  </head>
  <body class="portfolio-page home-page">
    <a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"><span></span></div>
    <div class="masthead"><div class="masthead__inner-wrap"><div class="masthead__menu"><nav id="site-nav" class="greedy-nav" aria-label="Primary navigation"><button type="button" aria-label="Open navigation"><div class="navicon"></div></button><ul class="visible-links"><li class="masthead__menu-item masthead__menu-item--lg persist"><a class="brand-lockup" href="/" aria-label="Rongkun Zhou — Home"><span class="brand-name">Rongkun Zhou</span></a></li><li class="masthead__menu-item"><a data-nav-link href="/research-project/">Research</a></li><li class="masthead__menu-item"><a data-nav-link href="/industry-experience/">Experience</a></li><li class="masthead__menu-item"><a data-nav-link href="/publications/">Publications</a></li><li class="masthead__menu-item"><a data-nav-link href="/gallery/">Gallery</a></li><li class="masthead__menu-item"><a data-nav-link href="/cv/">CV</a></li><li id="theme-toggle" class="masthead__menu-item persist tail"><button type="button" aria-label="Color theme: automatic"><i id="theme-icon" class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i></button></li></ul><ul class="hidden-links hidden"></ul></nav></div></div></div>
    <div id="main" role="main"><article class="page"><div class="page__inner-wrap"><section class="page__content" itemprop="text">${content}</section></div></article></div>
    <div class="page__footer"><footer><div class="footer-grid"><div><p class="footer-kicker">RESEARCH · ENGINEERING · IMPACT</p><h2>Let’s build systems that earn trust.</h2></div><div class="footer-links"><a href="mailto:rzhou33@jh.edu">Email</a><a href="https://github.com/RongkunZ">GitHub</a><a href="https://scholar.google.com/citations?user=WkP_INYAAAAJ">Google Scholar</a><a href="https://www.linkedin.com/in/rongkun-zhou-33658422b">LinkedIn</a></div></div><div class="footer-meta"><span>© 2026 Rongkun Zhou · Last updated August 2026</span><div class="visitor-map" aria-label="Visitor map"><span>Visitor map</span></div></div></footer></div>
    <button class="back-to-top" type="button" aria-label="Back to top"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button><script defer src="/assets/js/site-effects.js"></script>
  </body></html>`;
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname === '/preview-main.css') {
      response.writeHead(200, { 'content-type': 'text/css; charset=utf-8', 'cache-control': 'no-store' });
      response.end(await compileCss());
      return;
    }
    if (url.pathname === '/' || url.pathname === '/index.html') {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      response.end(await renderHomepage());
      return;
    }
    const relative = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
    const file = join(root, relative);
    if (!file.startsWith(root)) throw new Error('Invalid path');
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': mime[extname(file).toLowerCase()] || 'application/octet-stream' });
    response.end(body);
  } catch (error) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end(`Preview error: ${error.message}`);
  }
});

server.listen(port, host, () => process.stdout.write(`Preview ready on ${host}:${port}\n`));
