import type { Metadata } from "next";
import "./globals.css";

// 사이트 주소 — 커스텀 도메인을 연결하면 이 값을 바꿔주세요.
const SITE_URL = "https://moneyshow-hazel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "제이슨의 머니쇼 — 흔들리지 않는 투자",
    template: "%s · 제이슨의 머니쇼",
  },
  description:
    "전문가의 비법이 아니라, 같은 길을 걷는 평범한 투자자의 기록. 미국주식·ETF·절세를 왕초보 눈높이로. 무료 영상과 뉴스레터로 시작하세요.",
  keywords: ["미국주식", "ETF", "절세", "ISA", "연금저축", "IRP", "장기투자", "배당", "제이슨의 머니쇼", "투자 입문"],
  authors: [{ name: "제이슨" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "제이슨의 머니쇼",
    title: "제이슨의 머니쇼 — 흔들리지 않는 투자",
    description:
      "같은 길을 걷는 평범한 투자자의 기록. 미국주식·ETF·절세를 왕초보 눈높이로. 무료 영상과 뉴스레터로 시작하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "제이슨의 머니쇼 — 흔들리지 않는 투자",
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
