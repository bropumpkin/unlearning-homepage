/**
 * 짧은 신청 주소 — un-learning.co/apply/:code
 *
 * 신청서 자체는 구글 앱스스크립트가 그린다. 주소가 길고(exec?e=...),
 * 카카오톡·슬랙에 붙였을 때 제목도 그림도 뜨지 않는다. 구글이 내주는 겉껍데기에는
 * og 태그를 넣을 방법이 없기 때문이다.
 *
 * 그래서 여기서 겉껍데기만 대신 만든다.
 * 행사 이름과 소개를 앱스스크립트에서 읽어 og 태그로 박고, 실제 신청서는 안에 띄운다.
 * 주소창은 un-learning.co/apply/summit2 그대로 남는다.
 */

const EXEC = 'https://script.google.com/macros/s/'
  + 'AKfycbyZzpmKEYh_5_qhpQXmdsNXw50BUmq38p0cJiVikN1oSEffeY8YRWWC2IyMPKb7sXEgkg/exec';

const SITE = 'https://un-learning.co';
const OG_IMAGE = SITE + '/og-image.png';

module.exports = async (req, res) => {
  const url = new URL(req.url, SITE);
  const code = String(url.searchParams.get('code') || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (!code) {
    res.statusCode = 302;
    res.setHeader('Location', SITE);
    return res.end();
  }

  // 신청 페이지 주소. code 말고 붙어 온 값(edit=1 같은)은 그대로 넘긴다
  const inner = new URL(EXEC);
  inner.searchParams.set('e', code);
  url.searchParams.forEach((v, k) => { if (k !== 'code') inner.searchParams.set(k, v); });

  const meta = await readMeta(code);

  const title = meta.title ? meta.title + ' 신청' : '행사 신청';
  const desc = [meta.lead, meta.when, meta.where].filter(Boolean).join(' · ')
    || '언러닝컴퍼니 행사 신청';

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // 미리보기 정보는 자주 바뀌지 않는다. 5분 캐시하되 그 뒤로도 옛 것을 먼저 내주고 뒤에서 새로 받는다
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  res.end(page(title, desc, inner.toString(), code));
};

/** 행사 이름과 소개를 읽어온다. 못 읽어도 페이지는 뜬다 — 미리보기만 밋밋해질 뿐이다. */
async function readMeta(code) {
  try {
    const r = await fetch(EXEC + '?meta=' + encodeURIComponent(code), { redirect: 'follow' });
    if (!r.ok) return {};
    const json = await r.json();
    return json && json.ok ? json : {};
  } catch (err) {
    console.error('겉정보를 읽지 못했습니다: ' + err);
    return {};
  }
}

function page(title, desc, src, code) {
  const at = SITE + '/apply/' + code;
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="언러닝컴퍼니">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(at)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<link rel="canonical" href="${esc(at)}">
<style>
  html, body { margin: 0; height: 100%; background: #F6F8FA; }
  iframe { display: block; width: 100%; height: 100%; border: 0; }
</style>
</head>
<body>
<iframe src="${esc(src)}" title="${esc(title)}" allow="clipboard-write"></iframe>
</body>
</html>`;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
