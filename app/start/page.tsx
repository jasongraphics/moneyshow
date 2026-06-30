import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";
import { PRINCIPLES, CHECKLIST } from "../lib/data";

export const metadata: Metadata = {
  title: "시작하기 · 흔들리지 않는 7가지 원칙",
  description:
    "미국주식·ETF 투자를 막 시작하는 분을 위한 출발점. 화려한 기법이 아니라, 시대가 바뀌어도 변하지 않는 7가지 원칙과 첫 계좌부터 첫 매수까지의 순서.",
};

export default function StartPage() {
  return (
    <>
      <Nav active="/start" />

      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span><span>시작하기</span>
          </div>
          <h1>처음 시작하는 분께</h1>
          <p className="lede">
            이 자료실은 ‘무엇을 살까’보다 <strong>‘어떻게 흔들리지 않을까’</strong>에 집중합니다.
            검증된 장기투자 원칙을 먼저 잡고, 그 위에 한국 투자자가 꼭 알아야 할 ETF·세금 지식을 얹었어요.
          </p>
          <div className="updated">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
            왕초보부터 직장인 투자자까지 · 한 번 읽고 두고두고 펴 보는 안내서
          </div>
        </div>
      </header>

      {/* 들어가며 */}
      <section className="rsec">
        <div className="wrap">
          <div className="prose">
            <div className="quote" style={{ fontSize: 22, marginTop: 0 }}>
              “투자에서 가장 어려운 건 종목을 고르는 게 아니라, 아무것도 하지 않고 버티는 것입니다.”
            </div>
            <p>
              주식 시장에는 매일 새로운 뉴스가 쏟아집니다. 금리, 환율, AI, 반도체, 폭락 경고.
              대부분은 1년만 지나도 기억나지 않는 소음입니다. 그런데도 많은 투자자가 이 소음에 반응해
              사고팔다가 수익을 깎아 먹습니다.
            </p>
            <p>아래 세 분께 특히 도움이 될 거예요.</p>
            <ul>
              <li>이제 막 미국주식·ETF를 시작하려는 <strong>왕초보</strong></li>
              <li>이미 투자 중이지만 세금·계좌가 헷갈리는 <strong>직장인</strong></li>
              <li>매일 차트를 보다 지쳐서, 편하게 오래 가는 법을 찾는 분</li>
            </ul>
          </div>

          <div className="callout green" style={{ maxWidth: 720 }}>
            <div className="ct">한 줄 요약</div>
            <p>좋은 자산을 꾸준히 사서, 세금을 줄이고, 오래 버티는 것. 이 세 가지면 됩니다. 나머지는 이 자료실이 도와드립니다.</p>
          </div>
        </div>
      </section>

      {/* 7 원칙 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">Part 01 · 뼈대</div>
            <h2>흔들리지 않는 7가지 원칙</h2>
            <p>화려한 매매 기법보다, 단순한 원칙을 오래 지키는 사람이 이깁니다. 흔들릴 때마다 다시 펴 보세요.</p>
          </div>
          <div className="principles">
            {PRINCIPLES.map((p) => (
              <div className="principle" key={p.n}>
                <span className="chip ptag">{p.tag}</span>
                <div className="pn">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 복리 teaser */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">왜 ‘시간’인가</div>
            <h2>복리는 평범한 사람의 가장 강력한 무기예요</h2>
            <p>수익률을 맞히는 건 어렵지만, 일찍 시작해서 오래 가는 건 누구나 할 수 있습니다.</p>
          </div>
          <div className="callout dark" style={{ maxWidth: 760 }}>
            <div className="ct">매달 50만원, 연 8% 가정이라면</div>
            <p style={{ fontSize: 15.5 }}>
              10년 뒤 약 9,200만원 · 20년 뒤 약 2억 9,500만원 · 30년 뒤 약 7억 4,400만원.
              원금은 1.8억인데 자산은 7억이 넘습니다. 그 차이를 만든 건 ‘시간’이에요.
            </p>
          </div>
          <Link className="btn btn-primary" href="/tools" style={{ marginTop: 8 }}>
            복리 계산기로 내 숫자 확인하기 →
          </Link>
        </div>
      </section>

      {/* 단순 구조 + 다음 단계 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">초보를 위한 단순 구조</div>
            <h2>ETF는 많을수록 좋은 게 아니에요</h2>
          </div>
          <div className="prose">
            <p>
              대부분의 장기투자자는 <strong>핵심 지수 ETF 1~2개</strong>(S&P500 또는 나스닥100)를 중심으로,
              현금흐름을 원하면 <strong>배당성장 ETF</strong>를 일부 더하는 정도면 충분합니다.
              종목을 늘리는 것보다, 정한 구조를 자동이체로 묶어 두는 게 훨씬 중요합니다.
            </p>
          </div>
          <div className="hub-grid" style={{ marginTop: 24 }}>
            <Link href="/etfs" className="hubcard">
              <div className="kic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6"><path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16v-9" /></svg></div>
              <h3>ETF 자료실</h3>
              <p>지수별·배당별 ETF의 보수와 세금을 한 표에서 비교하고, 국내상장 vs 해외상장을 정리.</p>
              <div className="go">팩트시트 보기 →</div>
            </Link>
            <Link href="/tax" className="hubcard">
              <div className="kic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6"><path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h6" /></svg></div>
              <h3>세금 가이드</h3>
              <p>양도세·배당세·종합과세 3가지와, ISA·연금·IRP 절세계좌를 채우는 순서.</p>
              <div className="go">세금·절세 보기 →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* 체크리스트 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">부록 · 실행</div>
            <h2>시작 체크리스트</h2>
            <p>철학을 잡았다면, 이제 실행입니다. 위에서부터 하나씩 체크해 보세요.</p>
          </div>
          <ul className="checklist">
            {CHECKLIST.map((c) => (
              <li key={c}><span className="box" />{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
