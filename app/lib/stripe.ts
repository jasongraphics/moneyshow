import Stripe from "stripe";

// 서버 전용 Stripe 클라이언트. 모듈 로드 시점이 아니라 호출 시점에 만들어,
// 키가 없는 환경(로컬 빌드 등)에서도 빌드가 깨지지 않게 합니다.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY 가 설정되지 않았습니다.");
  if (!_stripe) _stripe = new Stripe(key);
  return _stripe;
}
