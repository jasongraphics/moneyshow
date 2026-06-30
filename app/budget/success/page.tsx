import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../../_components/Nav";
import Footer from "../../_components/Footer";
import { getStripe } from "../../lib/stripe";
import { BUDGET_SHEET_COPY_URL, PRODUCT } from "../../lib/product";

// 결제 세션을 매 요청마다 서버에서 검증해야 하므로 정적 생성하지 않습니다.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "구매 완료",
  // 결제 성공 페이지는 검색엔진에 노출할 필요가 없어요.
  robots: { index: false, follow: false },
};

export default async function BudgetSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // 서버에서 결제 상태를 직접 확인합니다. URL만으로는 절대 시트 링크를 노출하지 않아요.
  let paid = false;
  let email: string | null = null;
  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
    } catch {
      paid = false;
    }
  }

  return (
    <>
      <Nav />
      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span>
            <Link href="/budget">가계부 템플릿</Link><span className="sep">›</span><span>구매 완료</span>
          </div>
          {paid ? (
            <>
              <h1>결제가 완료됐어요. 고맙습니다 🙂</h1>
              <p className="lede">
                <strong>{PRODUCT.name}</strong> 구매가 확인됐습니다.
                {email ? <> 영수증은 <strong>{email}</strong> 으로 보내드렸어요.</> : null}
              </p>
            </>
          ) : (
            <>
              <h1>결제 확인이 필요해요</h1>
              <p className="lede">
                아직 결제가 확인되지 않았습니다. 결제를 마치셨는데 이 화면이 보인다면, 잠시 후 다시 열어보거나 아래로 문의해 주세요.
              </p>
            </>
          )}
        </div>
      </header>

      <section className="rsec">
        <div className="wrap" style={{ maxWidth: 720 }}>
          {paid ? (
            <>
              <div className="callout green" style={{ marginTop: 0 }}>
                <div className="ct">템플릿 받는 방법</div>
                <p>
                  아래 버튼을 누르면 <strong>내 구글 드라이브에 사본</strong>이 만들어집니다.
                  그 사본은 온전히 내 것이라 자유롭게 수정해서 쓰면 돼요. (구글 계정 로그인이 필요합니다.)
                </p>
              </div>

              {BUDGET_SHEET_COPY_URL ? (
                <a
                  className="btn btn-primary btn-block"
                  href={BUDGET_SHEET_COPY_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ marginTop: 18, fontSize: 16 }}
                >
                  구글시트 사본 만들기 →
                </a>
              ) : (
                <p className="tfoot-note" style={{ marginTop: 18 }}>
                  템플릿 링크를 준비 중입니다. 입력하신 이메일로 곧 보내드릴게요.
                </p>
              )}

              <p className="tfoot-note" style={{ marginTop: 18 }}>
                링크가 안 열리거나 사본이 안 만들어지면, 결제하신 이메일을 알려주시면 바로 도와드릴게요.
                문의는 유튜브·인스타그램 채널 메시지로 받습니다.
              </p>
            </>
          ) : (
            <>
              <Link className="btn btn-primary" href="/budget">가계부 페이지로 돌아가기</Link>
              <p className="tfoot-note" style={{ marginTop: 18 }}>
                결제는 됐는데 링크를 못 받으셨다면, 결제하신 이메일과 함께 유튜브·인스타그램 채널로 문의해 주세요.
              </p>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
