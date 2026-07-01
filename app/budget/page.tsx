import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";
import BuyButton from "../_components/BuyButton";
import BudgetFAQ from "./BudgetFAQ";
import { PRODUCT, isCheckoutConfigured } from "../lib/product";

export const metadata: Metadata = {
  title: "가계부 템플릿 · 한국형 연간 가계부 2026",
  description:
    "돈이 어디로 가는지 한눈에. 설정 한 번이면 12개월이 자동으로 채워지는 한국형 가계부 템플릿. 구글 시트·엑셀로 바로 쓰고, 카테고리별 지출과 연간 흐름까지 그래프로 봅니다.",
  alternates: { canonical: "/budget" },
};

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2.4" aria-hidden style={{ flex: "0 0 auto", marginTop: 2 }}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const FEATURES: { t: string; d: string }[] = [
  { t: "설정 한 번 = 12개월 자동", d: "수입원·고정지출·카테고리·저축 목표를 ‘설정’ 시트에 한 번만 적으면, 1월부터 12월까지 그대로 반영돼요." },
  { t: "예산 vs 사용 한눈에", d: "카테고리마다 예산을 잡고 실제 사용액과 자동 비교. 이번 달 총수입·총지출·남은 돈이 맨 위에 딱 뜹니다." },
  { t: "순자산 트래커", d: "자산에서 부채를 뺀 ‘진짜 내 재산’을 매달 기록하면, 1년 순자산 추이가 그래프로 그려져요." },
  { t: "구독·고정지출 관리", d: "넷플릭스부터 헬스장까지 새는 구독을 한곳에. 연 결제는 월로 환산해 매달 얼마 빠지는지 정확히 보여줍니다." },
  { t: "저축 목표 진행률", d: "목표금액·목표일을 정하면 진행률과 진행바가 자동. 비상금·내집마련·여행자금을 눈으로 좇아요." },
  { t: "연간 대시보드 + 차트", d: "월별 수입·지출·저축이 그래프로 쌓여요. 한국 가구 기준(전세·청약·관리비) 항목과 원(₩)으로 세팅됩니다." },
];

const STEPS: { n: string; t: string; d: string }[] = [
  { n: "1", t: "설정하기", d: "‘설정’ 시트에 내 수입원·고정지출·카테고리·저축 목표 이름을 적어요. (5분이면 충분해요.)" },
  { n: "2", t: "매달 기록", d: "그 달 시트에 날짜·분류·금액만 적어요. 며칠만 해보면 습관이 됩니다." },
  { n: "3", t: "한눈에 보기", d: "이번 달 요약과 카테고리 그래프, 연간 대시보드가 알아서 채워져요." },
];

export default async function BudgetPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;
  const enabled = isCheckoutConfigured();

  return (
    <>
      <Nav />

      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span><span>가계부 템플릿</span>
          </div>
          <h1>{PRODUCT.name}</h1>
          <p className="lede">
            가계부 하나로 <strong>예산·저축·순자산·구독</strong>까지. <strong>설정 한 번이면 12개월이 자동</strong>으로
            채워지는 올인원 한국형 가계부예요. 구글 시트나 엑셀로 바로 쓰고, 1년 흐름을 그래프로 봅니다.
          </p>

          {canceled ? (
            <div className="callout" style={{ maxWidth: 520, marginTop: 18, marginBottom: 0, borderColor: "#d8c08a" }}>
              <p style={{ margin: 0 }}>결제를 취소했어요. 마음이 바뀌면 언제든 다시 시작할 수 있어요.</p>
            </div>
          ) : null}

          <div style={{ marginTop: 22, maxWidth: 360 }}>
            <BuyButton enabled={enabled} priceLabel={PRODUCT.priceLabel} />
            <p className="muted" style={{ fontSize: 12.5, marginTop: 10, textAlign: "center" }}>
              한 번 결제 · 평생 내 것 · 구글 시트 / 엑셀
            </p>
          </div>
        </div>
      </header>

      {/* 미리보기 — 실제 시트의 ‘이번 달 한눈에’ 모습 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">미리보기</div>
            <h2>이런 모습이에요</h2>
            <p>실제 ‘1월’ 시트 화면이에요. 수입·고정지출·변동지출·저축, 카테고리별 예산 vs 사용까지 한 페이지에.</p>
          </div>

          <a className="bgt-shot" href="/budget-preview-jan.webp" target="_blank" rel="noreferrer noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/budget-preview-jan.webp" alt="제이슨의 머니쇼 가계부 2026 · 실제 1월 시트 미리보기" loading="lazy" />
          </a>
          <p className="bgt-shot-cap">실제 ‘1월’ 시트 · 탭하면 크게 볼 수 있어요</p>
        </div>
      </section>

      {/* 이런 분께 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="callout green" style={{ maxWidth: 820, marginTop: 0 }}>
            <div className="ct">이런 분께 딱이에요</div>
            <ul style={{ margin: "6px 0 0", paddingLeft: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {[
                "가계부를 몇 번 시작했지만 늘 작심삼일이었던 분",
                "카드값이 왜 이렇게 나왔는지 매번 모르겠는 분",
                "지출만이 아니라 저축·투자까지 한 곳에서 보고 싶은 분",
              ].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Check /><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 무엇이 들어있나요 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">구성</div>
            <h2>무엇이 들어있나요</h2>
            <p>가계부·순자산·저축 목표·구독 관리까지, 서로 연결된 19개 시트.</p>
          </div>
          <div className="bgt-feat-grid">
            {FEATURES.map((f) => (
              <div key={f.t} className="bgt-feat">
                <div className="bgt-feat-t"><Check /><span>{f.t}</span></div>
                <p className="bgt-feat-d">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이렇게 써요 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">사용법</div>
            <h2>이렇게 써요</h2>
            <p>어렵지 않아요. 딱 세 단계.</p>
          </div>
          <div className="bgt-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="bgt-step">
                <div className="bgt-step-n">{s.n}</div>
                <div>
                  <div className="bgt-step-t">{s.t}</div>
                  <p className="bgt-step-d">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 받는 방법 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">받는 방법</div>
            <h2>결제하면 이렇게 받아요</h2>
            <p>구글 시트 ‘사본 만들기’ 링크로 30초 만에 내 것이 됩니다.</p>
          </div>
          <div className="bgt-steps">
            <div className="bgt-step">
              <div className="bgt-step-n">1</div>
              <div>
                <div className="bgt-step-t">결제 완료</div>
                <p className="bgt-step-d">결제가 끝나면 곧바로 구글 시트 ‘사본 만들기’ 링크가 나와요. 결제 영수증도 이메일로 받습니다.</p>
              </div>
            </div>
            <div className="bgt-step">
              <div className="bgt-step-n">2</div>
              <div>
                <div className="bgt-step-t">사본 만들기</div>
                <p className="bgt-step-d">링크를 누르면 내 구글 드라이브에 내 사본이 생겨요. (구글 로그인 필요) 온전히 내 것이라 자유롭게 고쳐 씁니다.</p>
              </div>
            </div>
            <div className="bgt-step">
              <div className="bgt-step-n">3</div>
              <div>
                <div className="bgt-step-t">엑셀로도 OK</div>
                <p className="bgt-step-d">엑셀이 편하면 구글 시트에서 파일 → 다운로드 → Microsoft Excel 로 받아서 쓰면 됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">자주 묻는 질문</div>
            <h2>FAQ</h2>
          </div>
          <BudgetFAQ />
        </div>
      </section>

      {/* 가격 + 최종 CTA */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)" }}>
        <div className="wrap" style={{ maxWidth: 560, textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>가격</div>
          <div style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: 40, color: "var(--ink)", letterSpacing: "-0.02em", marginTop: 4 }}>
            {PRODUCT.priceLabel}
          </div>
          <p className="muted" style={{ fontSize: 13.5, marginTop: 4 }}>한 번 결제로 평생 사용하는 내 사본</p>
          <div style={{ marginTop: 20 }}>
            <BuyButton enabled={enabled} priceLabel={PRODUCT.priceLabel} />
          </div>
          <p className="tfoot-note" style={{ marginTop: 18 }}>
            결제 후 구글 시트 ‘사본 만들기’ 링크를 바로 받습니다. 이 가계부는 가계 재무 정리를 돕는 교육용 도구이며,
            특정 투자 권유나 개별 투자자문이 아닙니다.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
