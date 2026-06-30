/**
 * Display fonts used only by the content pages (Gowun Batang headings + Gaegu wordmark).
 * Rendered via <Nav>, which every content page includes but the standalone /links
 * linktree does NOT. React 19 hoists these <link>s to <head> and dedupes by href, so the
 * linktree never fetches the heavy Korean Google Fonts CSS (~120KB, render-blocking) or
 * opens connections to Google's font origins. Pretendard (the only font /links uses) stays
 * in the root layout for every page.
 */
export default function SiteFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
        precedence="default"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap"
        precedence="default"
      />
    </>
  );
}
