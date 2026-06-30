import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";
import CompoundCalculator from "./CompoundCalculator";

export const metadata: Metadata = {
  title: "복리 계산기 · 매달 얼마면, 30년 뒤 얼마가 될까",
  description:
    "매달 투자 금액·기간·수익률만 넣으면 복리로 불어나는 자산을 바로 보여주는 계산기. 시간이 곧 수익이라는 말을 숫자로 확인하세요. 교육용.",
};

export default function ToolsPage() {
  return (
    <>
      <Nav active="/tools" />

      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span><span>계산기</span>
          </div>
          <h1>복리 계산기</h1>
          <p className="lede">
            매달 얼마를, 몇 년 동안, 몇 %로 굴리면 얼마가 될까. 슬라이더만 움직여 보세요.
            “시간이 곧 수익”이라는 말이 왜 진짜인지, 숫자로 직접 확인할 수 있습니다.
          </p>
          <div className="updated">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            교육용 단순 가정 · 세금·수수료 제외
          </div>
        </div>
      </header>

      <section className="rsec">
        <div className="wrap">
          <CompoundCalculator />
        </div>
      </section>

      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">복리의 비밀</div>
            <h2>처음엔 시시하지만, 뒤로 갈수록 폭발합니다</h2>
          </div>
          <div className="prose">
            <p>
              복리는 ‘수익이 다시 수익을 낳는’ 구조입니다. 그래서 초반 10년은 답답할 만큼 느리고,
              ‘이게 되나?’ 싶은 구간이 길어요. 하지만 원금이 충분히 쌓이고 나면, 매년 불어나는 수익이
              내가 새로 넣는 돈보다 커지는 순간이 옵니다. 그 뒤로는 곡선이 가팔라집니다.
            </p>
            <p>
              위 계산기에서 기간만 10년 → 20년 → 30년으로 바꿔 보세요. 원금은 2배, 3배로 느는데
              <strong> 자산은 몇 배로 뛰는지</strong> 보일 겁니다. 차이를 만드는 건 화려한 종목이 아니라,
              <strong> 일찍 시작해서 오래 버티는 시간</strong>입니다.
            </p>
            <p>
              그래서 우리가 통제할 수 있는 두 가지에 집중합니다. 하나는 <Link href="/tax" style={{ color: "var(--accent)", fontWeight: 700 }}>세금과 비용을 줄이는 것</Link>,
              다른 하나는 <Link href="/start" style={{ color: "var(--accent)", fontWeight: 700 }}>중간에 팔지 않고 자동으로 계속하는 것</Link>입니다.
            </p>
          </div>

          <div className="hub-grid" style={{ marginTop: 30 }}>
            <Link href="/start" className="hubcard">
              <div className="kic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
              <h3>처음이라면, 시작하기</h3>
              <p>흔들리지 않는 7가지 원칙과, 첫 계좌부터 첫 매수까지의 순서.</p>
              <div className="go">시작 가이드 보기 →</div>
            </Link>
            <Link href="/etfs" className="hubcard">
              <div className="kic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6"><path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16v-9" /></svg>
              </div>
              <h3>무엇을 살까? ETF 자료실</h3>
              <p>S&P500·나스닥100·전세계·배당까지, 보수와 세금을 한 표에서 비교.</p>
              <div className="go">ETF 비교표 보기 →</div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
