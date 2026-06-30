"use client";

import { useMemo, useState } from "react";
import { ETFS, CATEGORY_LABEL, type ETFCategory } from "../lib/data";

const CATS = Object.keys(CATEGORY_LABEL) as ETFCategory[];

export default function ETFTable() {
  const [cat, setCat] = useState<ETFCategory | "all">("all");
  const [listing, setListing] = useState<"all" | "KR" | "US">("all");

  const rows = useMemo(
    () => ETFS.filter((e) => (cat === "all" || e.category === cat) && (listing === "all" || e.listing === listing)),
    [cat, listing],
  );

  return (
    <div>
      <div className="filterbar">
        <button className={cat === "all" ? "on" : ""} onClick={() => setCat("all")}>전체</button>
        {CATS.map((c) => (
          <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>
      <div className="filterbar" style={{ marginBottom: 16 }}>
        <span className="muted" style={{ fontSize: 12.5, fontWeight: 600, alignSelf: "center", marginRight: 4 }}>상장</span>
        <button className={listing === "all" ? "on" : ""} onClick={() => setListing("all")}>전체</button>
        <button className={listing === "KR" ? "on" : ""} onClick={() => setListing("KR")}>국내 (원화)</button>
        <button className={listing === "US" ? "on" : ""} onClick={() => setListing("US")}>해외 (달러)</button>
      </div>

      <div className="tablewrap">
        <table className="dtable">
          <thead>
            <tr>
              <th>종목</th>
              <th>상장</th>
              <th>추종 지수</th>
              <th>분배</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.ticker + e.name}>
                <td>
                  <div className="name">{e.name}</div>
                  <div className="ticker">{e.listing === "KR" ? e.ticker : `$${e.ticker}`}</div>
                </td>
                <td><span className={`chip ${e.listing === "KR" ? "kr" : "us"}`}>{e.listing === "KR" ? "원화" : "달러"}</span></td>
                <td className="note" style={{ color: "var(--ink2)" }}>{e.index}</td>
                <td>{e.distribution === "없음" ? "없음" : `${e.distribution}배당`}{e.yield ? ` · ${e.yield}` : ""}</td>
                <td className="note">{e.note}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} className="note" style={{ textAlign: "center", padding: 28 }}>해당 조건의 ETF가 없어요.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="scroll-hint" aria-hidden="true">표를 좌우로 넘겨서 모든 항목을 볼 수 있어요</p>

      <p className="tfoot-note">
        총 {rows.length}개 표시 중.
        ‘TR’ 버전(예: KODEX 미국S&P500TR)은 분배금을 자동 재투자해 분배금 과세를 미루는 효과가 있습니다.
        총보수·수익률 등 세부 수치는 운용사·증권사 공시에서 매수 전 직접 확인하세요.
      </p>
    </div>
  );
}
