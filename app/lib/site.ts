// ═══════════════════════════════════════════════════════════════════════════
//  ✏️  EDIT ME · 링크, 채널, 상단 내비게이션을 여기서 한 번에 바꿉니다.
// ═══════════════════════════════════════════════════════════════════════════

export const SITE = {
  // 채널 주소. 전체 URL을 붙여넣으세요.
  youtube: "https://www.youtube.com/@Jasonsmoneyshow",
  instagram: "https://www.instagram.com/jasonsmoneyshow",

  // 프로필 일러스트(아바타). public/ 폴더에 파일을 넣고 경로만 바꾸면 됩니다.
  avatar: "/jason-avatar.webp",

  // 실제 프로필 사진. public/ 에 파일을 넣으면 소개 섹션에 표시됩니다.
  // (파일이 없으면 자동으로 아바타 일러스트로 대체돼요.)
  photo: "/jason-photo.jpg",

  // 워런 버핏 사진. public/buffett.jpg 에 파일을 넣으면 복리 인용문 옆에 표시됩니다.
  buffettPhoto: "/buffett.jpg",

  // 문의 이메일 (선택). 비워두면 "유튜브·인스타 DM" 안내가 표시됩니다.
  contactEmail: "",
};

// ───────────────────────────────────────────────────────────────────────────
//  Google Analytics 4 측정 ID — 예: "G-XXXXXXXXXX"
//  analytics.google.com → 관리(⚙️) → 데이터 스트림 → 웹 스트림 에서 확인돼요.
//  아래 따옴표 안에 붙여넣으면 모든 페이지에 자동 적용됩니다.
//  (Vercel 환경변수 NEXT_PUBLIC_GA_ID 를 설정하면 그 값이 우선합니다.)
//  비워두면 추적이 그냥 꺼져요 — 에러는 나지 않습니다.
// ───────────────────────────────────────────────────────────────────────────
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-WNG4JJ8S62";

// SNS 채널. 메인 CTA가 아니라 "이런 곳에서 활동해요" 목록으로 노출됩니다.
export const CHANNELS: { type: "youtube" | "instagram"; label: string; handle: string; href: string }[] = [
  { type: "youtube", label: "YouTube", handle: "@Jasonsmoneyshow", href: SITE.youtube },
  { type: "instagram", label: "Instagram", handle: "@jasonsmoneyshow", href: SITE.instagram },
];

// 상단 내비게이션. 자료실 페이지들로 연결됩니다.
export const NAV: { href: string; label: string }[] = [
  { href: "/start", label: "시작하기" },
  { href: "/etfs", label: "ETF 자료실" },
  { href: "/tools", label: "복리 계산기" },
  { href: "/tax", label: "세금 가이드" },
  { href: "/#portfolio", label: "포트폴리오" },
];

// 모든 페이지 하단에 들어가는 공통 면책 문구 (금융감독원·자본시장법 준수).
export const DISCLAIMER =
  "본 사이트의 모든 콘텐츠는 일반적인 금융·투자 교육 및 정보 제공 목적이며, 특정 종목의 매수·매도 권유나 개별적인 투자자문이 아닙니다. " +
  "운영자는 자본시장법상 인가·등록을 받은 투자자문업자가 아니며, 개별 종목 추천이나 1:1 상담을 제공하지 않습니다. " +
  "운영자가 본인의 보유·매매 내역을 공개하는 경우에도 이는 사실의 공유일 뿐 투자 권유가 아닙니다. " +
  "ETF 보수·수익률·코드와 세법 정보는 작성 시점(2026년) 기준의 일반 정보로 정확성을 보장하지 않으며 수시로 바뀌므로, 실제 투자·세무 신고 전 반드시 운용사 자료·국세청 홈택스·전문가를 통해 확인하세요. " +
  "투자에는 원금 손실의 가능성이 있으며, 수익률이나 원금을 보장하지 않습니다. 모든 투자의 최종 판단과 책임은 투자자 본인에게 있습니다.";
