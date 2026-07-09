# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

The marketing homepage for **언러닝컴퍼니 (Unlearning Company)** — a Korean team
that helps impact organizations (nonprofits, social enterprises, foundations,
public agencies) rethink outdated ways of working with AI. The site is in
Korean (`<html lang="ko">`).

It is a **single-file React SPA**. Effectively all of the application lives in
`index.html`. There is **no build step, no package.json, no bundler, and no
test suite**.

## Repository layout

```
index.html        The entire app: markup, CSS, and all React components (~2300 lines)
TONE_GUIDE.md     Korean tone & voice guide for all site copy (source of truth)
TONE_GUIDE.html   Rendered/standalone HTML version of the tone guide
assets/           Team photos (team-*.png). ASCII filenames only (see git history)
```

## How it runs

There is nothing to build or install. Open `index.html` in a browser, or serve
the directory statically (e.g. `python3 -m http.server`) and load it. The page:

- Loads **React 18, ReactDOM, and Babel Standalone from CDNs** in `<head>`.
- Puts all component code in a single `<script type="text/babel">` block, which
  Babel transpiles **in the browser at runtime**. This is why there is no build
  step — and also why you must not use bare ES module `import`/`export` inside
  that script; write everything as top-level functions/consts in one scope.
- Mounts with `ReactDOM.createRoot(document.getElementById("root")).render(<App />)`
  at the very end of the file.

Because JSX is compiled client-side, a syntax error anywhere in the script block
breaks the whole page silently — check the browser console when the page is blank.

## Architecture of `index.html`

The script block is organized top-to-bottom with banner comments
(`/* ===== SECTION ===== */`). Key regions, in order:

1. **Design tokens (`THEMES`)** — `light` and `dark` palettes (colors, shadows,
   overlays). Exposed via `ThemeContext`; components read the current theme
   object as `const C = useContext(ThemeContext)` and style with `C.green`,
   `C.bg`, etc. `MONO` / `SANS` font constants and `MODULE_COLOR` live here too.
2. **Shared constants** — `TIMING`, `SPACING`, and `makeStyles(C)` for centralized
   magic numbers and repeated style objects.
3. **`CONTENT`** — a single object holding **all user-facing site copy**
   (hero, problem, work, contact, footer, etc.). **Edit copy here, not inline in
   components.** It carries a Korean comment saying exactly this.
4. **Sanity config + fetch helpers** — `SANITY_PROJECT_ID` / `SANITY_DATASET`,
   `fetchSanityPosts()`, `getSanityImageUrl()`, `formatDate()`, `getSummary()`.
5. **Curriculum data** — `MODULES` (tracks A/B/C) and `TRACKS` (recommended
   bundles). Data-driven; the curriculum UI renders from these arrays.
6. **Small hooks & primitives** — `useInView`, `Cursor`, `TerminalWindow`,
   `TermLine`, `SectionLabel`.
7. **Section & view components** — `Nav`, `MainView` and its sections
   (`HeroSection`, `ProblemSection`, `WorkSection`, `CurriculumSection`,
   `RecommendedTracksSection`, `ImpactSection`, `AboutSection`, …),
   plus routed views (`CurriculumView`, `NewsListView`, `NewsDetailView`,
   `ReferencesListView`, `ReferenceDetailView`), `ContactModal`,
   `PrivacyPolicyModal`, `Footer`.
8. **Routing + `App`** — `serializeView` / `parseHash` and the `App` root.

## Routing

Client-side **hash routing** (no server needed). `App` holds `view` in state,
synced to `window.location.hash`:

- `serializeView(v)` turns a view into a hash path (`/`, `/curriculum`,
  `/news`, `/references`, `/post/:id`, `/reference/:slug`).
- `parseHash(hash)` is the inverse and runs on load + `hashchange`.
- `setView(v)` writes the hash; the `hashchange` listener updates state and
  scrolls to top, so browser back/forward works.

Views are `'home' | 'curriculum' | 'news' | 'references'` or an object
`{ type: 'post', id }` / `{ type: 'reference', slug }`.

## External integrations

- **Sanity CMS** — news posts are fetched at runtime from the Sanity query API
  (project `77kdc69b`, dataset `production`). Images resolve through
  `getSanityImageUrl`. If the fetch fails the app falls back to an empty list.
- **Contact form** — `ContactModal` POSTs to `CONTACT_API_URL`
  (`https://unlearning-contact-api.vercel.app/api/contact`), a separate Vercel
  function that writes into Notion. That backend is **not in this repo**.

## Theming

- Light is the default. `App` persists the choice in `localStorage['theme']` and
  reflects it via `document.documentElement[data-theme]` plus the `theme-color`
  meta tag.
- An inline `<head>` script applies the saved theme **before React mounts** to
  avoid a flash of the wrong theme. If you change theme background/foreground
  colors, keep that inline script and the `THEMES` object in sync.
- CSS in `<style>` uses `html[data-theme="dark"]` overrides; component styling
  uses the `C` theme object. Both must be updated together for a new color.

## Conventions

- **All copy changes go through `CONTENT`** (or the `MODULES`/`TRACKS` data
  arrays for curriculum). Avoid hardcoding Korean strings inside JSX.
- **Copy must follow `TONE_GUIDE.md`** —평어체 ("~합니다"), warm-but-formal, plain
  Korean over jargon, "함께/곁에서" framing, possibility over blame. Consult the
  DO/DON'T table and the preferred-vocabulary dictionary before writing or
  editing any user-facing text. Update `TONE_GUIDE.html` if you change the `.md`.
- **Styling is inline objects** driven by the theme token object `C`. Reuse
  `makeStyles`, `SPACING`, and `TIMING` rather than reintroducing magic numbers.
- **Responsive breakpoints** live as media queries in the `<style>` block
  (mobile nav hamburger, grid collapses). Match the existing breakpoints
  (480 / 640 / 768 / 860 / 900px) when adding responsive behavior.
- **Assets**: keep filenames ASCII-only (team photos were deliberately renamed
  away from Korean names for safe URL handling).
- Accessibility matters here (prior commits added a11y fixes) — preserve focus
  rings, semantic structure, and reduced-motion-friendly patterns.

## Git workflow

- Commit messages are short, imperative, English summaries of the change
  (e.g. "Refine copy across hero/problem/services/contact/footer sections").
- Since there is no test/lint/build, **verify changes by opening the page in a
  browser and checking the console** — there is no CI safety net.

## Gotchas

- One JS/JSX syntax error blanks the entire page (client-side Babel) — always
  sanity-check in a browser after edits.
- No module system inside the Babel script block; everything shares one scope.
- The Sanity project/dataset IDs and the contact API URL are hardcoded in
  `index.html`; changing backends means editing those constants.
