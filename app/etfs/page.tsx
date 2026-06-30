import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";
import ETFTable from "./ETFTable";
import { LISTING_COMPARE, GLOSSARY } from "../lib/data";

export const metadata: Metadata = {
  title: "ETF 자료실 · 보수·세금 한눈에 비교",
  description:
    "S&P500·나스닥100·미국 전체시장·전세계·다우·배당·모멘텀 ETF를, 국내상장(원화)과 해외상장(달러)으로 나눠 총보수와 세금까지 한 표에서 비교하세요. 교육용 팩트시트.",
};

export default function ETFsPage() {
  return (
    <>
      <Nav active="/etfs" />

      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span><span>ETF 자료실</span>
          </div>
          <h1>ETF 팩트시트 &amp; 비교</h1>
          <p className="lede">
            ETF는 수십~수백 개 종목을 한 번에 담은 <strong>‘바구니’</strong>입니다. 한 주만 사도 자동 분산이 되죠.
            같은 미국 지수라도 <strong>국내상장(원화)</strong>과 <strong>해외상장(달러)</strong> 둘 다 살 수 있는데, 세금이 다릅니다.
          </p>
          <div className="updated">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            마지막 업데이트: 2026.06 · 보수는 운용사 공시 기준
          </div>
        </div>
      </header>

      <section className="rsec">
        <div className="wrap">
          <div className="callout green" style={{ maxWidth: 820, marginTop: 0 }}>
            <div className="ct">제이슨의 단순 구조</div>
            <p>
              대부분의 장기투자자는 <strong>핵심 지수 ETF 1~2개</strong>(S&P500 또는 나스닥100)를 중심으로,
              현금흐름을 원하면 <strong>배당성장 ETF</strong>를 일부 더하는 정도면 충분합니다.
              ETF는 많을수록 좋은 게 아니에요. (※ 특정 종목 추천이 아니라, 구조를 설명하는 교육용 의견입니다.)
            </p>
          </div>

          <div className="rhead" style={{ marginTop: 36 }}>
            <div className="eyebrow">팩트시트</div>
            <h2>ETF 비교표</h2>
            <p>카테고리·상장으로 거르고, ‘총보수’를 눌러 정렬해 보세요. 보수 막대는 표시된 ETF 중 상대적인 비용입니다.</p>
          </div>
          <ETFTable />
        </div>
      </section>

      {/* 국내 vs 해외 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">가장 중요한 갈림길</div>
            <h2>국내상장 vs 해외상장</h2>
            <p>같은 ‘미국 S&P500’이라도, 어디에 상장된 ETF를 사느냐에 따라 세금과 편의성이 달라집니다.</p>
          </div>
          <div className="tablewrap" style={{ maxWidth: 820 }}>
            <table className="dtable">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>국내상장 ETF <span className="chip kr" style={{ marginLeft: 6 }}>원화</span></th>
                  <th>해외상장 ETF <span className="chip us" style={{ marginLeft: 6 }}>달러</span></th>
                </tr>
              </thead>
              <tbody>
                {LISTING_COMPARE.map((r) => (
                  <tr key={r.label}>
                    <td className="name">{r.label}</td>
                    <td>{r.kr}</td>
                    <td>{r.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="callout gold" style={{ maxWidth: 820 }}>
            <div className="ct">한 줄 가이드</div>
            <p>
              절세계좌 안이거나 수익 규모가 작다면 <strong>국내상장(원화)</strong>이 간편합니다.
              반대로 일반계좌에서 수익 규모가 크다면 <strong>해외상장(달러)</strong>이 종합과세에서 빠지고 손익통산이 돼 유리할 때가 많아요.
              자세한 세금은 <Link href="/tax" style={{ color: "var(--accent)", fontWeight: 700 }}>세금 가이드</Link>에서.
            </p>
          </div>
        </div>
      </section>

      {/* 용어집 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">부록</div>
            <h2>ETF 용어집</h2>
            <p>표를 읽다 막히는 단어가 있으면 여기서 찾아보세요.</p>
          </div>
          <dl className="glossary" style={{ maxWidth: 820 }}>
            {GLOSSARY.map((g) => (
              <div className="g" key={g.term}>
                <dt>{g.term}</dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>

          <div className="hub-grid" style={{ marginTop: 34 }}>
            <Link href="/tools" className="hubcard">
              <div className="kic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6"><path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16v-9" /></svg></div>
              <h3>복리 계산기</h3>
              <p>고른 ETF에 매달 얼마씩 넣으면 몇 년 뒤 얼마가 될지, 숫자로 확인.</p>
              <div className="go">계산기 열기 →</div>
            </Link>
            <Link href="/tax" className="hubcard">
              <div className="kic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6"><path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h6" /></svg></div>
              <h3>세금 가이드</h3>
              <p>양도세·배당세·종합과세와 ISA·연금·IRP 절세계좌 채우는 순서.</p>
              <div className="go">세금 보기 →</div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
