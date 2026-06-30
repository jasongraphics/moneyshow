import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "../../../lib/stripe";

// (선택) Stripe 웹훅 — 결제 완료를 서버가 비동기로 통보받는 곳입니다.
// 지금은 결제완료 로그만 남깁니다. 나중에 "구매자에게 시트 링크 이메일 자동발송"
// 같은 자동화를 여기에 붙이면 됩니다.
//
// 설정(선택): Stripe 대시보드 → Developers → Webhooks → Add endpoint
//   URL:   https://<도메인>/api/stripe/webhook
//   이벤트: checkout.session.completed
//   생성된 Signing secret(whsec_...)를 STRIPE_WEBHOOK_SECRET 환경변수에 넣어주세요.
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "웹훅이 설정되지 않았습니다." }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "서명이 없습니다." }, { status: 400 });

  let event;
  try {
    const body = await req.text(); // 서명 검증에는 원문(raw) 본문이 필요합니다.
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    console.error("[webhook] 서명 검증 실패", e);
    return NextResponse.json({ error: "서명 검증 실패" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("[webhook] 결제 완료", session.id, session.customer_details?.email);
    // TODO: 여기에서 구매자에게 시트 링크를 이메일로 발송하는 등의 자동화를 추가.
  }

  return NextResponse.json({ received: true });
}
