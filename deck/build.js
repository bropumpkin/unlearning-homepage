// 언러닝컴퍼니 회사 소개서 — pptxgenjs generator
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "unlearning company";
pres.title = "언러닝컴퍼니 회사소개서";

// ---- Brand palette ----
const GREEN = "0D9F5C";
const GREEN_BRIGHT = "00FF88";
const ORANGE = "D65A26";
const CYAN = "0C89AA";
const PURPLE = "7C5CD6";
const INK = "1F2328";
const SOFT = "F6F8FA";
const BORDER = "D8DEE4";
const WHITE = "FFFFFF";
const DARK = "0A0A0A";
const MUTED = "6A737D";
const GREEN_TINT = "E7F6EE";

const KR = "Malgun Gothic";
const MONO = "Consolas";

const W = 13.33;
const H = 7.5;
const MX = 0.7; // left/right margin

function shadow() {
  return { type: "outer", color: "8A94A0", blur: 8, offset: 3, angle: 90, opacity: 0.28 };
}

// macOS traffic-light dots + optional label
function terminalDots(slide, x, y, label) {
  const d = 0.16, gap = 0.28;
  const cols = ["FF5F56", "FFBD2E", "27C93F"];
  cols.forEach((c, i) => {
    slide.addShape("ellipse", { x: x + i * gap, y, w: d, h: d, fill: { color: c }, line: { type: "none" } });
  });
  if (label) {
    slide.addText(label, {
      x: x + 3 * gap + 0.05, y: y - 0.08, w: 3, h: 0.32,
      fontFace: MONO, fontSize: 11, color: "8B949E", align: "left", valign: "middle",
      isTextBox: true, margin: 0,
    });
  }
}

// wordmark: green triangle + monospace name
function wordmark(slide, x, y, dark) {
  slide.addText("▲", {
    x, y, w: 0.4, h: 0.4, fontFace: KR, fontSize: 16, bold: true,
    color: dark ? GREEN_BRIGHT : GREEN, align: "left", valign: "middle", isTextBox: true, margin: 0,
  });
  slide.addText("unlearning_company", {
    x: x + 0.34, y, w: 3.2, h: 0.4, fontFace: MONO, fontSize: 14,
    color: dark ? "E6EDF3" : INK, align: "left", valign: "middle", isTextBox: true, margin: 0,
  });
}

// small mono kicker for content slides
function kicker(slide, text, color) {
  slide.addText(text, {
    x: MX, y: 0.5, w: 6, h: 0.32, fontFace: MONO, fontSize: 12,
    color: color || GREEN, align: "left", valign: "middle", isTextBox: true, margin: 0, charSpacing: 1,
  });
}

// =================================================================
// SLIDE 1 — COVER (dark)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  terminalDots(s, MX, 0.55, "unlearning.sh");
  wordmark(s, MX, 1.15, true);

  s.addText(
    [
      { text: "세상을 바꾸는 일에만", options: { color: WHITE, breakLine: true } },
      { text: "집중하세요", options: { color: GREEN_BRIGHT } },
    ],
    { x: MX, y: 2.55, w: 11.5, h: 1.9, fontFace: KR, fontSize: 46, bold: true, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.05 }
  );

  s.addText(
    "중요한 일에 몰입할 수 있도록, 언러닝컴퍼니는 AI로\n그동안 쌓인 낡은 업무 방식부터 함께 바꿉니다.",
    { x: MX, y: 4.75, w: 10.5, h: 1.0, fontFace: KR, fontSize: 17, color: "C9D1D9", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.25 }
  );

  // tagline with a leading green marker
  s.addText("▲", { x: MX, y: 6.35, w: 0.3, h: 0.35, fontFace: KR, fontSize: 12, color: GREEN_BRIGHT, isTextBox: true, margin: 0, valign: "middle" });
  s.addText("임팩트 조직이 미션에만 몰입할 수 있도록, 곁에서 일하는 팀", {
    x: MX + 0.3, y: 6.35, w: 11, h: 0.35, fontFace: MONO, fontSize: 12.5, color: "8B949E",
    align: "left", valign: "middle", isTextBox: true, margin: 0,
  });
}

// =================================================================
// SLIDE 2 — VISION & MISSION (light)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "// vision & mission");
  s.addText("비전 & 미션", { x: MX, y: 0.9, w: 11, h: 0.9, fontFace: KR, fontSize: 40, bold: true, color: INK, align: "left", isTextBox: true, margin: 0 });

  const cardY = 2.35, cardH = 4.2, cardW = 5.75, gap = 0.45;
  const cards = [
    { label: "VISION", tag: "비전", glyph: "◆", title: "사람이 자라는\nAI 시대", x: MX },
    { label: "MISSION", tag: "미션", glyph: "▲", title: "낡은 워크플로우를 파괴하여 파트너 조직이 핵심 가치와 미션에만 온전히 몰입할 수 있도록 돕는다.", x: MX + cardW + gap, small: true },
  ];
  cards.forEach((c) => {
    s.addShape("roundRect", { x: c.x, y: cardY, w: cardW, h: cardH, rectRadius: 0.12, fill: { color: SOFT }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    // green circle icon
    s.addShape("ellipse", { x: c.x + 0.5, y: cardY + 0.5, w: 1.0, h: 1.0, fill: { color: GREEN }, line: { type: "none" }, shadow: shadow() });
    s.addText(c.glyph, { x: c.x + 0.5, y: cardY + 0.5, w: 1.0, h: 1.0, fontFace: KR, fontSize: 26, bold: true, color: WHITE, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(c.label, { x: c.x + 0.55, y: cardY + 1.75, w: 4, h: 0.32, fontFace: MONO, fontSize: 13, color: GREEN, bold: true, align: "left", isTextBox: true, margin: 0, charSpacing: 1 });
    s.addText(c.tag, { x: c.x + 0.55, y: cardY + 2.1, w: 4.5, h: 0.4, fontFace: KR, fontSize: 15, color: MUTED, align: "left", isTextBox: true, margin: 0 });
    s.addText(c.title, {
      x: c.x + 0.55, y: cardY + 2.55, w: cardW - 1.1, h: cardH - 2.9,
      fontFace: KR, fontSize: c.small ? 19 : 27, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.15,
    });
  });
}

// =================================================================
// SLIDE 3 — PHILOSOPHY / UNLEARNING (dark quote)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("// philosophy — unlearning", { x: MX, y: 0.6, w: 8, h: 0.32, fontFace: MONO, fontSize: 13, color: GREEN_BRIGHT, isTextBox: true, margin: 0, charSpacing: 1 });
  s.addText("우리의 철학 — 비움", { x: MX, y: 1.0, w: 10, h: 0.5, fontFace: KR, fontSize: 18, color: "8B949E", isTextBox: true, margin: 0 });

  // big quote mark
  s.addText("“", { x: MX - 0.08, y: 1.5, w: 1.5, h: 1.2, fontFace: KR, fontSize: 90, bold: true, color: "1F6E43", align: "left", valign: "top", isTextBox: true, margin: 0 });

  s.addText(
    [
      { text: "채우기 위해서는 ", options: { color: WHITE } },
      { text: "먼저 비워야", options: { color: GREEN_BRIGHT } },
      { text: " 합니다.", options: { color: WHITE } },
    ],
    { x: MX, y: 2.5, w: 11.6, h: 1.3, fontFace: KR, fontSize: 40, bold: true, align: "left", valign: "top", isTextBox: true, margin: 0 }
  );

  s.addText(
    "조직의 변화는 새로운 기술을 더 많이 배우는 데서 오지 않습니다.\n지금까지 익숙했던 방식을 먼저 내려놓는 일(Unlearning), 거기서 시작합니다.\n조직에 맞지 않는 복잡한 기술 대신, 현장에서 바로 쓸 수 있는 도구만 남깁니다.",
    { x: MX, y: 4.1, w: 11.3, h: 2.0, fontFace: KR, fontSize: 18, color: "C9D1D9", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.4 }
  );
  wordmark(s, MX, 6.75, true);
}

// =================================================================
// SLIDE 4 — ABOUT / 우리가 아는 현실 (light, two-column w/ console)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "// about us");
  s.addText(
    "사회문제를 푸는 조직의 현실을\n가장 잘 아는 전문가들",
    { x: MX, y: 0.95, w: 7.2, h: 1.5, fontFace: KR, fontSize: 32, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 }
  );
  s.addText(
    "화려한 시스템을 팔지 않습니다. 사회문제를 푸는 현장에서 10년 넘게 직접 일했고, 낡은 업무 방식 때문에 정작 중요한 일을 놓쳤던 시간도 보냈습니다. 그 경험이, 지금 우리가 일하는 방식의 바탕이 됐습니다.",
    { x: MX, y: 2.75, w: 6.9, h: 2.2, fontFace: KR, fontSize: 16, color: "424A53", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.4 }
  );

  // chips
  const chips = ["10년차 현장 경험", "조직에 맞는 AI 도구 설계", "외부 자원 매칭"];
  let cx = MX;
  const chipY = 5.55;
  chips.forEach((t) => {
    const cw = 0.42 + t.length * 0.17;
    s.addShape("roundRect", { x: cx, y: chipY, w: cw, h: 0.55, rectRadius: 0.27, fill: { color: GREEN_TINT }, line: { color: GREEN, width: 1 } });
    s.addText(t, { x: cx, y: chipY, w: cw, h: 0.55, fontFace: KR, fontSize: 13, bold: true, color: GREEN, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    cx += cw + 0.25;
  });

  // right console card (terminal motif reuse)
  const conX = 8.6, conY = 1.05, conW = 4.0, conH = 5.4;
  s.addShape("roundRect", { x: conX, y: conY, w: conW, h: conH, rectRadius: 0.1, fill: { color: DARK }, line: { type: "none" }, shadow: shadow() });
  terminalDots(s, conX + 0.35, conY + 0.35, null);
  s.addText("field_notes.sh", { x: conX + 1.3, y: conY + 0.27, w: 2.8, h: 0.32, fontFace: MONO, fontSize: 10.5, color: "8B949E", align: "left", valign: "middle", isTextBox: true, margin: 0 });
  s.addText(
    [
      { text: "$ cd 현장", options: { color: "8B949E", breakLine: true } },
      { text: "$ ls experience/", options: { color: "8B949E", breakLine: true } },
      { text: "> 10년+ 임팩트 현장", options: { color: GREEN_BRIGHT, breakLine: true } },
      { text: "> 낡은 업무방식 개선", options: { color: GREEN_BRIGHT, breakLine: true } },
      { text: "> 외부 자원 매칭", options: { color: GREEN_BRIGHT, breakLine: true } },
      { text: "", options: { breakLine: true } },
      { text: "$ echo $MISSION", options: { color: "8B949E", breakLine: true } },
      { text: "> 미션에만 몰입", options: { color: "E6EDF3", breakLine: true } },
      { text: "$ _", options: { color: GREEN_BRIGHT } },
    ],
    { x: conX + 0.4, y: conY + 0.95, w: conW - 0.7, h: conH - 1.3, fontFace: MONO, fontSize: 14, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.5 }
  );
}

// =================================================================
// SLIDE 5 — PROBLEM (light, three cards)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: SOFT };
  kicker(s, "// problem", ORANGE);
  s.addText("핵심 업무에 집중해야 할 시간이\n자꾸 미뤄집니다.", { x: MX, y: 0.9, w: 11.5, h: 1.4, fontFace: KR, fontSize: 32, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 });

  const items = [
    { n: "01", c: ORANGE, t: "반복되는 일에\n시간이 묶입니다", d: "매달 돌아오는 정산과 보고서에, 정작 중요한 일을 할 시간이 다 쓰입니다." },
    { n: "02", c: CYAN, t: "한 사람에게만\n쌓이는 노하우", d: "일하는 법이 한 사람 머릿속에만 있으면, 그 사람이 떠났을 때 다시 처음으로 돌아갑니다." },
    { n: "03", c: PURPLE, t: "도구가 많아도\n사용할 수 없습니다", d: "비싼 시스템을 적용할 예산도, 시스템을 다룰 전문가도 구하기 어렵습니다." },
  ];
  const cardW = 3.83, gap = 0.42, top = 2.85, cardH = 3.9;
  items.forEach((it, i) => {
    const x = MX + i * (cardW + gap);
    s.addShape("roundRect", { x, y: top, w: cardW, h: cardH, rectRadius: 0.1, fill: { color: WHITE }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape("ellipse", { x: x + 0.4, y: top + 0.45, w: 0.85, h: 0.85, fill: { color: it.c }, line: { type: "none" } });
    s.addText(it.n, { x: x + 0.4, y: top + 0.45, w: 0.85, h: 0.85, fontFace: MONO, fontSize: 18, bold: true, color: WHITE, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(it.t, { x: x + 0.4, y: top + 1.5, w: cardW - 0.8, h: 1.0, fontFace: KR, fontSize: 19, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText(it.d, { x: x + 0.4, y: top + 2.5, w: cardW - 0.8, h: 1.2, fontFace: KR, fontSize: 14, color: "57606A", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
  });
}

// =================================================================
// SLIDE 6 — OUR WAY / WORK (light, 2x2 grid)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "// our way");
  s.addText("비우는 일에서 시작합니다.\n필요한 것만 만듭니다.", { x: MX, y: 0.9, w: 7.5, h: 1.4, fontFace: KR, fontSize: 30, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.08 });
  s.addText("기술이 먼저가 아닙니다. 조직에 맞지 않는 방식을 먼저 비우고,\n그 자리에 꼭 필요한 도구만 남깁니다.", { x: 8.1, y: 1.0, w: 4.55, h: 1.3, fontFace: KR, fontSize: 14, color: "57606A", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });

  const tracks = [
    { label: "Track A", c: GREEN, t: "낡은 업무방식 비우기", d: "우리 조직에 맞는 AI 시스템을 함께 만듭니다" },
    { label: "Track B", c: ORANGE, t: "새로운 일을 같이 만들기", d: "사업을 같이 설계하고, 같이 운영합니다 (AI 교육 · AX 전환 · CSR 운영)" },
    { label: "Track C", c: CYAN, t: "기획부터 성과 보고까지", d: "프로젝트 전체를 자체적으로 운영합니다 (역량강화 · 일자리 교육)" },
    { label: "Track Edu", c: PURPLE, t: "배우는 자리를 함께 만들기", d: "교육과 행사로 AI 역량을 함께 키웁니다" },
  ];
  const gW = 5.75, gH = 1.85, gapX = 0.45, gapY = 0.35, gx0 = MX, gy0 = 2.75;
  tracks.forEach((tr, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = gx0 + col * (gW + gapX), y = gy0 + row * (gH + gapY);
    s.addShape("roundRect", { x, y, w: gW, h: gH, rectRadius: 0.09, fill: { color: SOFT }, line: { color: BORDER, width: 1 } });
    s.addShape("ellipse", { x: x + 0.4, y: y + 0.45, w: 0.28, h: 0.28, fill: { color: tr.c }, line: { type: "none" } });
    s.addText(tr.label, { x: x + 0.8, y: y + 0.38, w: 3, h: 0.4, fontFace: MONO, fontSize: 13, bold: true, color: tr.c, align: "left", valign: "middle", isTextBox: true, margin: 0, charSpacing: 1 });
    s.addText(tr.t, { x: x + 0.4, y: y + 0.82, w: gW - 0.8, h: 0.5, fontFace: KR, fontSize: 18, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0 });
    s.addText(tr.d, { x: x + 0.4, y: y + 1.28, w: gW - 0.75, h: 0.5, fontFace: KR, fontSize: 13, color: "57606A", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.15 });
  });
}

// =================================================================
// SLIDE 7 — IMPACT (light, three items)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: SOFT };
  kicker(s, "// impact");
  s.addText("우리가 일하는 방식이\n사회에 만드는 변화", { x: MX, y: 0.9, w: 11, h: 1.4, fontFace: KR, fontSize: 32, bold: true, color: INK, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 });

  const items = [
    { c: GREEN, t: "시간", d: "조직에 돌려주는 시간" },
    { c: ORANGE, t: "성장", d: "청년이 자라는 자리" },
    { c: PURPLE, t: "선순환", d: "수익은 다시 사회로: 수익은 약자를 위한 도구 연구와 청년 교육에 다시 쓰입니다." },
  ];
  const cardW = 3.83, gap = 0.42, top = 3.0, cardH = 3.5;
  items.forEach((it, i) => {
    const x = MX + i * (cardW + gap);
    s.addShape("roundRect", { x, y: top, w: cardW, h: cardH, rectRadius: 0.1, fill: { color: WHITE }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape("ellipse", { x: x + 0.45, y: top + 0.5, w: 0.55, h: 0.55, fill: { color: it.c }, line: { type: "none" } });
    s.addShape("ellipse", { x: x + 0.6, y: top + 0.65, w: 0.25, h: 0.25, fill: { color: WHITE }, line: { type: "none" } });
    s.addText(it.t, { x: x + 0.45, y: top + 1.25, w: cardW - 0.9, h: 0.7, fontFace: KR, fontSize: 30, bold: true, color: it.c, align: "left", valign: "top", isTextBox: true, margin: 0 });
    s.addText(it.d, { x: x + 0.45, y: top + 2.05, w: cardW - 0.85, h: 1.2, fontFace: KR, fontSize: 14, color: "424A53", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
  });
}

// =================================================================
// SLIDE 8 — CORE VALUES (light, three color cards)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "// core values");
  s.addText("핵심 가치", { x: MX, y: 0.9, w: 11, h: 0.9, fontFace: KR, fontSize: 40, bold: true, color: INK, align: "left", isTextBox: true, margin: 0 });

  const vals = [
    { c: GREEN, n: "01", t: "시스템으로 일합니다", d: "누가 해도 같은 결과가 나오는 구조로 일합니다." },
    { c: CYAN, n: "02", t: "기술보다 미션이 먼저입니다", d: "도구는 수단입니다. 조직의 미션이 언제나 먼저입니다." },
    { c: PURPLE, n: "03", t: "배운 것은 다시 나눕니다", d: "우리가 익힌 방법은 교육과 콘텐츠로 다시 나눕니다." },
  ];
  const cardW = 3.83, gap = 0.42, top = 2.35, cardH = 4.1;
  vals.forEach((v, i) => {
    const x = MX + i * (cardW + gap);
    s.addShape("roundRect", { x, y: top, w: cardW, h: cardH, rectRadius: 0.1, fill: { color: SOFT }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape("ellipse", { x: x + 0.4, y: top + 0.5, w: 0.95, h: 0.95, fill: { color: v.c }, line: { type: "none" } });
    s.addText(v.n, { x: x + 0.4, y: top + 0.5, w: 0.95, h: 0.95, fontFace: MONO, fontSize: 20, bold: true, color: WHITE, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(v.t, { x: x + 0.4, y: top + 1.65, w: cardW - 0.8, h: 1.1, fontFace: KR, fontSize: 20, bold: true, color: v.c, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 });
    s.addText(v.d, { x: x + 0.4, y: top + 2.7, w: cardW - 0.8, h: 1.2, fontFace: KR, fontSize: 14, color: "57606A", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.35 });
  });
}

// =================================================================
// SLIDE 9 — TEAM (light, three columns w/ photos)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  kicker(s, "// team");
  s.addText("함께 일하는 사람들", { x: MX, y: 0.9, w: 11, h: 0.9, fontFace: KR, fontSize: 40, bold: true, color: INK, align: "left", isTextBox: true, margin: 0 });

  const team = [
    { img: "/home/user/unlearning-homepage/assets/team-jungwoong.png", name: "박정웅", role: "생태계 연결 & 커뮤니케이션", line: "더 나은 내일을 위해 모든 관계자 사이를 연결하는 사람" },
    { img: "/home/user/unlearning-homepage/assets/team-hyungho.png", name: "박형호", role: "현장 오퍼레이션 & IT 구축", line: "임팩트 조직의 막히는 지점을 가장 잘 아는 실무 전문가" },
    { img: "/home/user/unlearning-homepage/assets/team-wangsoo.png", name: "이왕수", role: "사업 개발 & 조직문화", line: "소셜 미션이 사업으로 자라도록 돕는 사람" },
  ];
  const colW = 3.83, gap = 0.42, top = 2.3;
  const ph = 2.15; // photo diameter
  team.forEach((m, i) => {
    const x = MX + i * (colW + gap);
    const px = x + (colW - ph) / 2;
    // green ring behind
    s.addShape("ellipse", { x: px - 0.06, y: top - 0.06, w: ph + 0.12, h: ph + 0.12, fill: { color: GREEN_TINT }, line: { color: GREEN, width: 1.5 } });
    s.addImage({ path: m.img, x: px, y: top, w: ph, h: ph, rounding: true, sizing: { type: "cover", w: ph, h: ph } });
    s.addText(m.name, { x, y: top + ph + 0.18, w: colW, h: 0.5, fontFace: KR, fontSize: 22, bold: true, color: INK, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(m.role, { x, y: top + ph + 0.72, w: colW, h: 0.35, fontFace: MONO, fontSize: 12, bold: true, color: GREEN, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(m.line, { x: x + 0.15, y: top + ph + 1.12, w: colW - 0.3, h: 0.9, fontFace: KR, fontSize: 13, color: "57606A", align: "center", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 });
  });
}

// =================================================================
// SLIDE 10 — CLOSING (dark)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  terminalDots(s, MX, 0.55, "contact.sh");
  wordmark(s, MX, 1.15, true);

  s.addText(
    "협력이 필요한 부분이 있다면\n부담없이 문의해 주세요.",
    { x: MX, y: 2.35, w: 11.5, h: 1.7, fontFace: KR, fontSize: 40, bold: true, color: WHITE, align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.08 }
  );

  // contact rows in mono
  s.addText(
    [
      { text: "email  ", options: { color: "8B949E" } },
      { text: "hello@un-learning.co", options: { color: GREEN_BRIGHT } },
    ],
    { x: MX, y: 4.35, w: 11, h: 0.45, fontFace: MONO, fontSize: 18, align: "left", valign: "middle", isTextBox: true, margin: 0 }
  );
  s.addText(
    [
      { text: "web    ", options: { color: "8B949E" } },
      { text: "unlearning.co", options: { color: GREEN_BRIGHT } },
    ],
    { x: MX, y: 4.9, w: 11, h: 0.45, fontFace: MONO, fontSize: 18, align: "left", valign: "middle", isTextBox: true, margin: 0 }
  );

  s.addText(
    "세상을 바꾸는 사람들이 미션에만 몰입할 수 있도록,\n낡은 업무방식을 함께 바꿉니다.",
    { x: MX, y: 5.7, w: 11.5, h: 1.0, fontFace: KR, fontSize: 15, color: "C9D1D9", align: "left", valign: "top", isTextBox: true, margin: 0, lineSpacingMultiple: 1.3 }
  );

  s.addText("© 2026 unlearning company", { x: MX, y: 6.95, w: 8, h: 0.35, fontFace: MONO, fontSize: 11, color: "6E7681", align: "left", valign: "middle", isTextBox: true, margin: 0 });
}

pres.writeFile({ fileName: "/home/user/unlearning-homepage/deck/언러닝컴퍼니_회사소개서.pptx" }).then((f) => console.log("WROTE", f));
