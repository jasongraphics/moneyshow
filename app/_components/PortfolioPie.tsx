import { PORTFOLIO } from "../lib/data";

const R = 80; // donut radius (viewBox 0 0 200 200, center 100,100)
const GAP = 0.7; // gap between slices, in pathLength(100) units

export default function PortfolioPie() {
  const P = PORTFOLIO;
  const sum = P.holdings.reduce((s, h) => s + h.weight, 0);

  // build donut segments using pathLength=100 so dash units are percentages
  let acc = 0;
  const segs = P.holdings.map((h) => {
    const pct = (h.weight / sum) * 100;
    const seg = { color: h.color, dash: Math.max(0, pct - GAP), offset: -acc };
    acc += pct;
    return seg;
  });

  return (
    <div className="pf-panel">
      <div className="pf-donut-wrap">
        <svg className="pf-donut" viewBox="0 0 200 200" aria-hidden>
          {segs.map((s, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="26"
              pathLength={100}
              strokeDasharray={`${s.dash} ${100 - s.dash}`}
              strokeDashoffset={s.offset}
            />
          ))}
        </svg>
        <div className="pf-center">
          <span className="pre">자산 배분</span>
          <span className="amt">{P.holdings.length}<small>개</small></span>
          <span className="lab">보유 종목</span>
        </div>
      </div>

      <div className="pf-legend">
        {P.holdings.map((h) => (
          <div className="pf-row" key={h.ticker}>
            <span className="pf-sw" style={{ background: h.color }} />
            <span className="pf-name"><b>{h.ticker}</b><span className="tk">{h.name}</span></span>
            <span className="pf-w">{h.weight.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
