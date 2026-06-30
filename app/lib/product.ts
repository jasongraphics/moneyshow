// ═══════════════════════════════════════════════════════════════════════════
//  ✏️  EDIT ME · 가계부 템플릿(유료 상품) 설정
// ═══════════════════════════════════════════════════════════════════════════
//
//  결제는 Stripe Checkout 으로 처리하고, 결제가 "완료(paid)"로 확인되면 구글시트
//  '사본 만들기' 링크를 전달합니다. 보안을 위해 키는 코드가 아니라 Vercel 환경변수로
//  넣어주세요. 아래 네 가지를 채우면 결제가 자동으로 켜집니다.
//
//    STRIPE_SECRET_KEY        sk_live_... (테스트는 sk_test_...)   ← 서버 전용, 절대 공개 금지
//    STRIPE_PRICE_ID          price_...   Stripe 대시보드에서 만든 ₩9,900 가격 ID
//    BUDGET_SHEET_COPY_URL    https://docs.google.com/spreadsheets/d/<시트ID>/copy
//    STRIPE_WEBHOOK_SECRET    whsec_...   (이메일 자동발송 등 웹훅을 쓸 때만, 선택)
//
//  키가 없으면 결제 버튼은 자동으로 "준비 중"으로 표시되고 에러는 나지 않습니다.

export const PRODUCT = {
  // 화면에 노출되는 상품 이름
  name: "제이슨의 머니쇼 가계부 2026",
  // 표시용 가격. 실제 청구 금액은 Stripe Price(STRIPE_PRICE_ID)가 결정합니다.
  priceLabel: "₩9,900",
};

// 가격(Price) ID는 비밀이 아니라서 코드에 기본값으로 둡니다. Vercel에 STRIPE_PRICE_ID 를
// 넣으면 그 값이 우선합니다. (가격을 바꾸면 Stripe에서 새 Price를 만들고 이 값만 교체.)
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "price_1ToAnY7WIuqBWZw2v2BbqWnM";
export const BUDGET_SHEET_COPY_URL = process.env.BUDGET_SHEET_COPY_URL || "";

/** 결제 기능이 켜져 있는지 — 서버 키와 가격 ID가 모두 있어야 합니다. (서버에서만 신뢰 가능) */
export function isCheckoutConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && STRIPE_PRICE_ID);
}
