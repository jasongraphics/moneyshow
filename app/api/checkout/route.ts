import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "../../lib/stripe";
import { STRIPE_PRICE_ID, isCheckoutConfigured } from "../../lib/product";

// 구매 버튼 → 이 핸들러가 Stripe Checkout 세션을 만들고 결제 페이지 URL을 돌려줍니다.
// 결제가 끝나면 Stripe가 success_url(결제검증 페이지)로 사용자를 보냅니다.
export async function POST(req: NextRequest) {
  if (!isCheckoutConfigured()) {
    return NextResponse.json({ error: "결제가 아직 설정되지 않았어요." }, { status: 503 });
  }
  try {
    const origin = req.headers.get("origin") || req.nextUrl.origin;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      // {CHECKOUT_SESSION_ID} 는 Stripe가 실제 세션 ID로 치환합니다.
      success_url: `${origin}/budget/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/budget?canceled=1`,
      allow_promotion_codes: true,
    });
    if (!session.url) {
      return NextResponse.json({ error: "결제 페이지 주소를 받지 못했어요." }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout] session 생성 실패", e);
    return NextResponse.json({ error: "결제 세션 생성에 실패했어요." }, { status: 500 });
  }
}
