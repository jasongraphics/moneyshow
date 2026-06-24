import { ImageResponse } from "next/og";

// Branded social-share card (1200×630). Kept English-only so it renders
// reliably without bundling a Korean font. Shown when the site is shared
// on KakaoTalk, X, Threads, Facebook, iMessage, etc.

export const runtime = "nodejs";
export const alt = "JASON'S MONEY SHOW — Investing without the noise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f2",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* top: eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            fontWeight: 700,
            color: "#b08d3c",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 44, height: 4, background: "#b08d3c", display: "flex" }} />
          US Stocks · ETF · Tax
        </div>

        {/* middle: wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, color: "#1b1915", lineHeight: 1.05, letterSpacing: -2 }}>
            JASON&apos;S MONEY SHOW
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#3a372f", marginTop: 26, lineHeight: 1.35, maxWidth: 880 }}>
            Investing, without the noise — one regular person&apos;s honest journey.
          </div>
        </div>

        {/* bottom: handle + accent */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#8a8478", fontWeight: 600 }}>
            youtube.com/@Jasonsmoneyshow
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 60, height: 12, borderRadius: 6, background: "#3f5e44", display: "flex" }} />
            <div style={{ width: 24, height: 12, borderRadius: 6, background: "#b08d3c", display: "flex" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
