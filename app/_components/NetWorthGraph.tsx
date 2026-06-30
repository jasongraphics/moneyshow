"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO } from "../lib/data";

// decorative rising path (net worth over time)
const LINE =
  "M0,190 L40,182 L80,188 L120,166 L160,172 L200,148 L240,138 L280,146 L320,116 L360,98 L400,106 L440,74 L480,56 L520,42 L556,28";

export default function NetWorthGraph() {
  const target = (PORTFOLIO.netLiqUSD * PORTFOLIO.usdToKrw) / 1e8; // 억 단위
  const [n, setN] = useState(target);

  useEffect(() => {
    const dur = 1500;
    const start = performance.now();
    setN(0);
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      setN((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(target);
    });
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const amount = n >= target - 0.05 ? target.toFixed(1) : n.toFixed(1);

  return (
    <div className="nw-panel">
      <div className="nw-mesh" aria-hidden />
      <div className="nw-glow" aria-hidden />
      <div className="nw-top">
        <span className="nw-label"><span className="nw-live" aria-hidden /> 제이슨의 순자산</span>
        <span className="nw-tag">NET WORTH · KRW</span>
      </div>
      <div className="nw-figure">
        <span className="nw-pre">약</span>
        <span className="nw-amt">{amount}</span>
        <span className="nw-unit">억원</span>
      </div>
      <div className="nw-sub">USD {PORTFOLIO.netLiqUSD.toLocaleString("en-US")} · 환율 약 {PORTFOLIO.usdToKrw.toLocaleString("ko-KR")}원/달러 · {PORTFOLIO.asOf} 기준, 매월 업데이트</div>
      <svg className="nw-chart" viewBox="0 0 560 220" aria-hidden>
        <defs>
          <linearGradient id="nwArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22e3a6" stopOpacity="0.30" />
            <stop offset="1" stopColor="#22e3a6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nwLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0f9b86" />
            <stop offset="1" stopColor="#3df0b0" />
          </linearGradient>
          <filter id="nwGlow" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={`${LINE} L556,220 L0,220 Z`} fill="url(#nwArea)" />
        <path className="nw-linepath" pathLength={100} d={LINE} fill="none" stroke="url(#nwLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#nwGlow)" />
        <circle className="nw-ring" cx="556" cy="28" r="5" fill="none" stroke="#5cffc4" strokeWidth="1.5" />
        <circle className="nw-node" cx="556" cy="28" r="4" fill="#7dffce" />
      </svg>
      <div className="nw-axis"><span>&apos;21</span><span>&apos;22</span><span>&apos;23</span><span>&apos;24</span><span>&apos;25</span><span>지금</span></div>
      <div className="nw-foot">화려한 비법이 아니라, 꾸준함이 쌓인 결과예요.</div>
    </div>
  );
}
