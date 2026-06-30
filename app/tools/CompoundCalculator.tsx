"use client";

import { useMemo, useState } from "react";
import { futureValue, COMPOUND_REFERENCE } from "../lib/data";

function fmtKorean(won: number): string {
  const v = Math.max(0, Math.round(won));
  const eok = Math.floor(v / 1e8);
  const man = Math.floor((v % 1e8) / 1e4);
  if (eok > 0) return `${eok}억 ${man.toLocaleString("ko-KR")}만`;
  if (man > 0) return `${man.toLocaleString("ko-KR")}만`;
  return v.toLocaleString("ko-KR");
}

const CHART_W = 560;
const CHART_H = 200;

export default function CompoundCalculator() {
  const [monthly, setMonthly] = useState(50); // 만원 단위
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8);

  const { fv, principal, profit, totalPath, areaPath, principalPath } = useMemo(() => {
    const pmt = monthly * 10000;
    const fv = futureValue(pmt, rate, years);
    const principal = pmt * 12 * years;
    const profit = Math.max(0, fv - principal);

    const yMax = Math.max(fv, 1);
    const pts: { x: number; total: number; prin: number }[] = [];
    for (let t = 0; t <= years; t++) {
      const x = years === 0 ? 0 : (t / years) * CHART_W;
      pts.push({ x, total: futureValue(pmt, rate, t), prin: pmt * 12 * t });
    }
    const y = (v: number) => CHART_H - (v / yMax) * (CHART_H - 8);
    const toPath = (key: "total" | "prin") =>
      pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${y(p[key]).toFixed(1)}`).join(" ");
    const totalPath = toPath("total");
    const principalPath = toPath("prin");
    const areaPath = `${totalPath} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
    return { fv, principal, profit, totalPath, areaPath, principalPath };
  }, [monthly, years, rate]);

  const multiple = principal > 0 ? fv / principal : 0;

  return (
    <div>
      <div className="calc">
        <div className="calc-controls">
          <div className="field">
            <label>매달 투자 금액 <span className="val">{monthly.toLocaleString("ko-KR")}만원</span></label>
            <input type="range" min={5} max={300} step={5} value={monthly} onChange={(e) => setMonthly(+e.target.value)} />
            <div className="hint">월 5만 ~ 300만원</div>
          </div>
          <div className="field">
            <label>투자 기간 <span className="val">{years}년</span></label>
            <input type="range" min={1} max={40} step={1} value={years} onChange={(e) => setYears(+e.target.value)} />
            <div className="hint">길수록 복리가 폭발합니다</div>
          </div>
          <div className="field">
            <label>기대 연수익률 <span className="val">{rate}%</span></label>
            <input type="range" min={1} max={12} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} />
            <div className="hint">미국 대표 지수의 장기 평균은 대략 7~10% 수준이었지만, 미래를 보장하지는 않아요.</div>
          </div>
        </div>

        <div className="calc-out">
          <div className="calc-result-label">{years}년 뒤 예상 자산</div>
          <div className="calc-figure">{fmtKorean(fv)}<small>원</small></div>
          <div className="muted" style={{ fontSize: 13 }}>
            원금의 <b style={{ color: "var(--ink)" }}>{multiple.toFixed(1)}배</b> · 매달 {monthly}만원씩 {years}년
          </div>

          <div className="calc-split">
            <div className="s">
              <span className="muted"><span className="dot" style={{ background: "#c2cad2" }} />넣은 원금</span>
              <b>{fmtKorean(principal)}원</b>
            </div>
            <div className="s">
              <span className="muted"><span className="dot" style={{ background: "var(--green)" }} />불어난 수익</span>
              <b>{fmtKorean(profit)}원</b>
            </div>
          </div>

          <svg className="calc-chart" viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="calcArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3f5e44" stopOpacity="0.22" />
                <stop offset="1" stopColor="#3f5e44" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#calcArea)" />
            <path d={principalPath} fill="none" stroke="#c2cad2" strokeWidth="2" strokeDasharray="4 4" />
            <path d={totalPath} fill="none" stroke="#3f5e44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="calc-x"><span>지금</span><span>{Math.round(years / 2)}년</span><span>{years}년</span></div>
        </div>
      </div>

      <p className="muted" style={{ fontSize: 12.5, marginTop: 14, lineHeight: 1.6 }}>
        매달 같은 금액을 넣고 월 단위로 복리된다고 가정한 <strong>교육용 단순 계산</strong>입니다.
        세금·수수료·물가는 반영하지 않았고, 실제 수익률은 매년 다르며 손실이 날 수도 있습니다. 미래 수익을 보장하지 않습니다.
      </p>

      <div className="callout gold" style={{ marginTop: 26 }}>
        <div className="ct">가이드의 기준 예시 (월 50만원 · 연 8% 가정)</div>
        <table className="miniref">
          <thead>
            <tr><th>기간</th><th>넣은 원금</th><th>예상 자산</th></tr>
          </thead>
          <tbody>
            {COMPOUND_REFERENCE.map((r) => (
              <tr key={r.years}>
                <td>{r.years}년 후</td>
                <td>{fmtKorean(r.principal * 10000)}원</td>
                <td className="hl">약 {fmtKorean(r.value * 10000)}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
