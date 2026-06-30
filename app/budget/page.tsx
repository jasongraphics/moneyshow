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
  { t: "설정 한 번 = 12개월 자동", d: "수입원·고정지출·지출 카테고리·저축 목표를 ‘설정’ 시트에 한 번만 적으면, 1월부터 12월까지 모든 시트에 그대로 나타나요." },
  { t: "30초 입력", d: "쓴 날짜·분류·금액만 적으면 끝. 분류는 칸을 누르면 목록에서 톡 고르면 됩니다." },
  { t: "이번 달 한눈에", d: "총수입·총지출·저축·남은 돈이 자동으로 계산돼요. 카드값 메우느라 정신없던 한 달이 정리됩니다." },
  { t: "카테고리별 자동 집계", d: "식비·외식·교통·통신비… 어디에 얼마 썼는지 카테고리별로 자동 합산되고, 도넛 그래프로 한눈에 보여요." },
  { t: "연간 대시보드", d: "월별 수입·지출·저축이 막대그래프로 쌓입니다. 1년 동안 얼마나 모았는지 흐름이 보여요." },
  { t: "한국 가구 기준", d: "전세·월세·관리비·통신비·청약·경조사 등 우리 실정에 맞는 항목과 원(₩) 단위로 처음부터 세팅돼 있어요." },
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
            돈이 어디로 가는지 한눈에. <strong>설정 한 번이면 12개월이 자동</strong>으로 채워지는 한국형 가계부예요.
            구글 시트나 엑셀로 바로 쓰고, 카테고리별 지출과 1년 흐름까지 그래프로 봅니다.
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
            <p>매달 시트 맨 위에서, 이번 달이 한눈에 정리됩니다.</p>
          </div>

          <div className="bgt-preview">
            <div className="bgt-pv-head">3월 가계부 · 이번 달 한눈에</div>
            <div className="bgt-kpis">
              {[
                { l: "총수입", v: "₩3,500,000", pos: true },
                { l: "총지출", v: "₩1,017,000" },
                { l: "저축·투자", v: "₩400,000", pos: true },
                { l: "남은 돈", v: "₩2,083,000", strong: true },
              ].map((k) => (
                <div key={k.l} className="bgt-kpi">
                  <span className="bgt-kpi-l">{k.l}</span>
                  <span className="bgt-kpi-v" style={{ color: k.strong ? "#1b1915" : k.pos === false ? "#1b1915" : "#0b5c3e" }}>{k.v}</span>
                </div>
              ))}
            </div>
            <div className="bgt-pv-sub">카테고리별 지출</div>
            <div className="bgt-bars">
              {[
                { l: "식비", w: 88, v: "₩320,000" },
                { l: "외식·카페", w: 60, v: "₩214,000" },
                { l: "교통", w: 34, v: "₩121,000" },
                { l: "통신", w: 18, v: "₩66,000" },
              ].map((b) => (
                <div key={b.l} className="bgt-bar-row">
                  <span className="bgt-bar-l">{b.l}</span>
                  <span className="bgt-bar-track"><i style={{ width: `${b.w}%` }} /></span>
                  <span className="bgt-bar-v">{b.v}</span>
                </div>
              ))}
            </div>
            <p className="bgt-pv-note">※ 예시 숫자입니다. 실제로는 입력한 내용에 따라 자동으로 계산돼요.</p>
          </div>
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
            <p>시작하기 · 설정 · 연간 대시보드 + 1~12월, 모두 15개 시트.</p>
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

      {/* FAQ */}
      <section className="rsec">
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
