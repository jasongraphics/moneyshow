import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID } from "./lib/site";
import "./globals.css";

// 사이트 주소 — 커스텀 도메인을 연결하면 이 값을 바꿔주세요.
const SITE_URL = "https://moneyshow-hazel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "제이슨의 머니쇼 · 흔들리지 않는 투자",
    template: "%s · 제이슨의 머니쇼",
  },
  description:
    "전문가의 비법이 아니라, 같은 길을 걷는 평범한 투자자의 기록. 미국주식·ETF·절세와 복리의 힘을 왕초보 눈높이로, 가입 없이 사이트에서 바로 공부하세요.",
  keywords: ["미국주식", "ETF", "절세", "ISA", "연금저축", "IRP", "장기투자", "배당", "제이슨의 머니쇼", "투자 입문"],
  authors: [{ name: "제이슨" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "제이슨의 머니쇼",
    title: "제이슨의 머니쇼 · 흔들리지 않는 투자",
    description:
      "같은 길을 걷는 평범한 투자자의 기록. 미국주식·ETF·절세와 복리의 힘을 왕초보 눈높이로, 가입 없이 사이트에서 바로 공부하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "제이슨의 머니쇼 · 흔들리지 않는 투자",
    description: "같은 길을 걷는 평범한 투자자의 미국주식·ETF·절세 기록.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard (the body/UI font for every page) via dynamic-subset variable font:
            only the glyphs actually on the page download (per unicode-range), instead of the
            full ~780KB-per-weight static font. The heavier display fonts (Gowun Batang, Gaegu)
            load only on content pages via <SiteFonts> in <Nav>, so the /links linktree — which
            uses Pretendard only — never pays for them. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
      {/* 모든 페이지(자료실·링크 포함)에 Google Analytics 4 적용. 라우트 이동도 자동 추적됩니다. */}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
