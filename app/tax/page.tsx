import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";
import { TAXES, TAX_TABLE, ACCOUNTS, ACCOUNT_PRIORITY, ALLOCATIONS } from "../lib/data";

export const metadata: Metadata = {
  title: "세금 가이드 · 양도세·배당세·절세계좌 완전정리",
  description:
    "한국 투자자가 알아야 할 세금은 사실상 세 가지. 양도소득세·배당소득세·금융소득종합과세와, ISA·연금저축·IRP 절세계좌를 채우는 순서까지 한눈에.",
};

export default function TaxPage() {
  return (
    <>
      <Nav active="/tax" />

      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span><span>세금 가이드</span>
          </div>
          <h1>세금 가이드</h1>
          <p className="lede">
            수익률은 못 정해도, <strong>세금과 비용은 내가 통제할 수 있습니다.</strong>
            한국 투자자가 알아야 할 세금은 사실상 세 가지뿐. 이것만 알면 90%는 끝납니다.
          </p>
          <div className="updated">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            2026년 기준 · 세법은 자주 바뀌니 신고 전 홈택스·전문가 확인
          </div>
        </div>
      </header>

      {/* 3 taxes */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">Part 03 · 과세 vs 비과세</div>
            <h2>알아야 할 세금은 세 가지</h2>
          </div>
          <div className="hub-grid tax-3up">
            {TAXES.map((t) => (
              <div className="hubcard" key={t.kind} style={{ cursor: "default" }}>
                <div className="crumb" style={{ marginBottom: 8 }}>{t.kind}</div>
                <div className="calc-figure" style={{ fontSize: 34, margin: "0 0 10px" }}>{t.rate}</div>
                <p style={{ color: "var(--ink2)" }}>{t.body}</p>
              </div>
            ))}
          </div>

          <div className="callout gold" style={{ maxWidth: 760 }}>
            <div className="ct">2025~2026 최신 · 금투세는 폐지됐어요</div>
            <p>
              2023년부터 시행이 예고됐던 금융투자소득세(금투세)는 2024년 12월 소득세법 개정으로 <strong>폐지되어 시행되지 않습니다.</strong>
              따라서 현재는 위 기존 과세 체계가 그대로 적용됩니다. (국내주식 증권거래세는 2026년 기준 약 0.20%, 코스피 0.05% + 농어촌특별세 0.15%)
            </p>
          </div>
        </div>
      </section>

      {/* 자산별 과세 표 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">한눈에 보기</div>
            <h2>자산별 과세 비교표</h2>
            <p>같은 ‘미국 S&P500’이라도, 어디에 상장된 ETF를 사느냐에 따라 세금이 달라집니다.</p>
          </div>
          <div className="tablewrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th>대상</th>
                  <th>매매차익</th>
                  <th>배당·분배금</th>
                  <th>종합과세</th>
                  <th>손익통산</th>
                </tr>
              </thead>
              <tbody>
                {TAX_TABLE.map((r) => (
                  <tr key={r.asset}>
                    <td>
                      <div className="name">{r.asset}</div>
                      {r.example && <div className="ticker">{r.example}</div>}
                    </td>
                    <td>{r.gain}</td>
                    <td>{r.dividend}</td>
                    <td>{r.combined}</td>
                    <td>{r.offset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="scroll-hint" aria-hidden="true">표를 좌우로 넘겨서 모든 항목을 볼 수 있어요</p>
          <p className="tfoot-note">
            국내상장 ETF는 증권거래세가 면제됩니다. 미국 배당은 미국에서 15% 원천징수되며, 한·미 조세조약상 국내 추가 배당세는 일반적으로 크지 않으나 종합과세 대상에는 포함됩니다.
            국내상장 vs 해외상장 비교는 <Link href="/etfs" style={{ color: "var(--accent)", fontWeight: 700 }}>ETF 자료실</Link>에서 더 자세히 볼 수 있어요.
          </p>

          <div className="callout green" style={{ maxWidth: 760 }}>
            <div className="ct">절세 직관 3가지</div>
            <p style={{ marginBottom: 6 }}>· 국내 지수에 투자한다면 <strong>국내주식형 ETF(KODEX 200 등)의 매매차익 비과세</strong>가 가장 강력합니다.</p>
            <p style={{ marginBottom: 6 }}>· 미국 지수를 일반계좌에서 크게 굴린다면, 250만원 공제·손익통산·분류과세가 되는 <strong>해외상장(VOO 등)</strong>이 유리할 때가 많습니다.</p>
            <p style={{ margin: 0 }}>· 가능하면 먼저 <strong>절세계좌부터</strong> 채우세요. 세금을 미루거나 없애는 효과가 가장 큽니다.</p>
          </div>
        </div>
      </section>

      {/* 절세계좌 3종 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">Part 04 · 절세계좌</div>
            <h2>한국엔 강력한 절세계좌 3종이 있어요</h2>
            <p>같은 ETF를 사도, 어떤 계좌에 담느냐에 따라 세금이 크게 달라집니다.</p>
          </div>
          <div className="tablewrap">
            <table className="dtable">
              <thead>
                <tr>
                  <th>계좌</th>
                  <th>핵심 혜택</th>
                  <th>납입한도 (2026)</th>
                  <th>세제 혜택</th>
                  <th>유의점</th>
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.map((a) => (
                  <tr key={a.name}>
                    <td>
                      <div className="name">{a.name}</div>
                      <div className="ticker">{a.full}</div>
                    </td>
                    <td className="note">{a.benefit}</td>
                    <td className="note">{a.limit}</td>
                    <td className="note">{a.perk}</td>
                    <td className="note">{a.caution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="scroll-hint" aria-hidden="true">표를 좌우로 넘겨서 모든 항목을 볼 수 있어요</p>
          <p className="tfoot-note">
            세액공제율은 총급여 5,500만원(종합소득 4,500만원) 이하 16.5%, 초과 13.2%입니다.
            ISA의 납입·비과세 한도 확대(이른바 ‘슈퍼 ISA’: 연 4,000만 / 총 2억, 비과세 500만·1,000만, 분리과세율 인하)는 <strong>2026년 현재 확정이 아니라 추진·논의 중</strong>입니다. 위 표에는 현행 기준과 확대안을 함께 적었어요. 가입 전 증권사·기획재정부 발표로 최신 기준을 꼭 확인하세요.
          </p>

          <div className="callout dark" style={{ maxWidth: 760 }}>
            <div className="ct">세액공제는 ‘즉시 확정 수익’이에요</div>
            <p style={{ fontSize: 15.5 }}>
              연금저축 600만원에 IRP 300만원을 더해 900만원을 채우면, 총급여 5,500만원 이하 기준 연말정산에서
              최대 <strong style={{ color: "#fff" }}>148.5만원(900만 × 16.5%)</strong>을 돌려받습니다.
              시장이 어떻든 16.5%의 확정 수익과 같습니다. 안 쓰면 손해예요.
            </p>
          </div>
        </div>
      </section>

      {/* 계좌 순서 */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">실전 · 어디부터 채울까</div>
            <h2>절세 우선순위</h2>
          </div>
          <div className="steps" style={{ maxWidth: 760 }}>
            {ACCOUNT_PRIORITY.map((s) => (
              <div className="step" key={s.rank}>
                <span className="rank">{s.rank}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 자산배분 교육용 예시 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">교육용 예시 · 추천 아님</div>
            <h2>목표별 자산배분 예시</h2>
            <p>‘자산배분’이라는 개념을 설명하기 위한 예시일 뿐, 특정 비중·종목을 추천하는 것이 아닙니다.</p>
          </div>
          <div className="alloc-grid">
            {ALLOCATIONS.map((a) => (
              <div className="alloc" key={a.name}>
                <h4>{a.name}</h4>
                <div className="sub">{a.sub}</div>
                <div className="bar">
                  <span className="seg core" style={{ width: `${a.core}%` }} />
                  <span className="seg div" style={{ width: `${a.dividend}%` }} />
                  <span className="seg safe" style={{ width: `${a.safe}%` }} />
                </div>
                <div className="legend">
                  <div className="row"><span className="lab"><span className="sw" style={{ background: "var(--green)" }} />핵심 지수 ETF</span><span className="pct">{a.core}%</span></div>
                  <div className="row"><span className="lab"><span className="sw" style={{ background: "var(--accent)" }} />배당 ETF</span><span className="pct">{a.dividend}%</span></div>
                  <div className="row"><span className="lab"><span className="sw" style={{ background: "#c2cad2" }} />안전자산(현금성·채권)</span><span className="pct">{a.safe}%</span></div>
                </div>
              </div>
            ))}
          </div>
          <p className="tfoot-note" style={{ maxWidth: 760 }}>
            위 비중은 교육용 예시입니다. 본인의 목표·기간·위험성향에 맞게 조정하세요. 배분을 정했다면 자동이체·자동매수로 묶어 두는 게 핵심입니다.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
