// ═══════════════════════════════════════════════════════════════════════════
//  자료실 데이터 — 모든 표·팩트시트가 이 파일에서 나옵니다.
//  숫자/보수는 작성 시점(2026) 기준. 운용사 공시가 바뀌면 여기만 고치면 됩니다.
//  출처: 「흔들리지 않는 투자 — 미국 ETF·세금 가이드」(2026 EDITION) + 운용사 공시.
// ═══════════════════════════════════════════════════════════════════════════

// ── 제이슨의 실제 포트폴리오 (증권계좌 캡처 기준) ───────────────────────────────
//  netLiqUSD = 미국 증권계좌 순자산(Net Liquidation Value, 달러). 매월 이 숫자만 갱신하세요.
//  usdToKrw = 환율(원/달러, 수시 변동). asOf = 기준 시점.
//  weight = %NetLiq (순자산 대비 비중). 현금은 소폭 신용(−)이라 합이 100%를 조금 넘습니다.
//  ⚠️ 보유 현황의 ‘사실 공유’일 뿐, 특정 종목 추천이 아닙니다.
export const PORTFOLIO = {
  netLiqUSD: 496600, // 미국 증권계좌 순자산(USD). 매월 이 숫자만 바꾸면 됩니다.
  usdToKrw: 1544,    // 환율(원/달러), 수시 변동.
  asOf: "2026년 6월", // 기준 시점 (매월 업데이트)
  holdings: [
    { ticker: "GOOG", name: "알파벳 (구글)", weight: 30.79, color: "#0e7a52" },
    { ticker: "AMZN", name: "아마존", weight: 23.96, color: "#1f9b78" },
    { ticker: "META", name: "메타", weight: 18.01, color: "#2bb0a4" },
    { ticker: "SPMO", name: "S&P500 모멘텀 ETF", weight: 17.79, color: "#3f86b8" },
    { ticker: "UBER", name: "우버", weight: 10.12, color: "#7d97b6" },
    { ticker: "SMH", name: "반도체 ETF", weight: 2.53, color: "#c2cad2" },
  ],
};

// ── 복리: 적립식 미래가치 ─────────────────────────────────────────────────────
// 매달 같은 금액을 넣고(기말 적립), 월 단위로 복리되는 일반적인 적립식 가정.
// FV = PMT × ( (1 + r/12)^(12·years) − 1 ) / (r/12)
export function futureValue(monthly: number, annualRatePct: number, years: number): number {
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i);
}

// 가이드에 실린 기준 예시 (월 50만원·연 8% 가정, 세금·수수료 제외).
export const COMPOUND_REFERENCE = [
  { years: 10, principal: 6000, value: 9150 }, // 단위: 만원
  { years: 20, principal: 12000, value: 29450 },
  { years: 30, principal: 18000, value: 74500 },
];

// ── Part 01 · 흔들리지 않는 7가지 원칙 ────────────────────────────────────────
export type Principle = { n: number; title: string; body: string; tag: string };
export const PRINCIPLES: Principle[] = [
  {
    n: 1,
    title: "시간이 곧 수익이다",
    tag: "복리",
    body: "수익률보다 시간이 중요합니다. 복리는 처음엔 느리지만 뒤로 갈수록 폭발합니다. 일찍 시작해서 오래 가는 것. 평범한 사람이 부자가 되는 거의 유일한 방법입니다.",
  },
  {
    n: 2,
    title: "좋은 자산을 사서 오래 보유한다",
    tag: "우량자산",
    body: "망하지 않을 우량한 자산(미국 대표 지수, 꾸준히 배당을 늘리는 기업군)을 사면 매일 들여다볼 이유가 줄어듭니다. 트레이더가 아니라 사업의 동업자처럼, 기업과 함께 성장한다고 생각하세요.",
  },
  {
    n: 3,
    title: "예측하지 말고 참여한다",
    tag: "적립식",
    body: "바닥을 맞히려는 시도는 대부분 실패합니다. 매달 같은 날, 같은 금액을 자동 투자하면 비쌀 때 적게, 쌀 때 많이 사게 됩니다. ‘타이밍’이 아니라 ‘타임 인 마켓’입니다.",
  },
  {
    n: 4,
    title: "소음을 무시한다",
    tag: "멘탈",
    body: "계좌를 매일 확인할수록 불안해서 더 자주 사고팔게 됩니다. 장기투자자에게 무관심은 전략입니다. 폭락 뉴스에 반응해 파는 순간, 종이 위의 손실이 진짜 손실이 됩니다.",
  },
  {
    n: 5,
    title: "분산으로 위험을 관리한다",
    tag: "분산",
    body: "한 종목 몰빵은 한 번의 실수로 끝납니다. 지수 ETF 하나만 사도 수백 개 기업에 자동 분산됩니다. 지역, 성격(성장·배당), 자산(주식·현금성)으로도 나눠 담으세요.",
  },
  {
    n: 6,
    title: "비용과 세금을 줄이면 그게 수익이다",
    tag: "비용",
    body: "수익률은 못 정해도 비용과 세금은 내가 통제할 수 있습니다. 0.5%의 보수 차이, 15.4%와 22%의 세율 차이는 30년 뒤 수천만 원이 됩니다. 그래서 다음 장들이 중요합니다.",
  },
  {
    n: 7,
    title: "자동화하고 꾸준히 실행한다",
    tag: "시스템",
    body: "의지력은 바닥납니다. 자동이체와 자동매수로 ‘결정’ 자체를 없애세요. 좋은 시스템은 나쁜 날에도 나를 대신해 투자합니다. 꾸준함이 천재성을 이깁니다.",
  },
];

// ── Part 02 · 미국 ETF 팩트시트 ───────────────────────────────────────────────
export type ETFCategory =
  | "sp500"
  | "nasdaq100"
  | "total_us"
  | "worldwide"
  | "dow"
  | "dividend_growth"
  | "high_dividend"
  | "covered_call"
  | "momentum";

export const CATEGORY_LABEL: Record<ETFCategory, string> = {
  sp500: "S&P 500",
  nasdaq100: "나스닥 100",
  total_us: "미국 전체시장",
  worldwide: "전세계 (글로벌)",
  dow: "다우존스",
  dividend_growth: "배당성장",
  high_dividend: "고배당",
  covered_call: "커버드콜 (고분배)",
  momentum: "모멘텀 (팩터)",
};

export type ETF = {
  category: ETFCategory;
  name: string;
  ticker: string;
  listing: "US" | "KR"; // 미국상장(달러) vs 국내상장(원화)
  index: string;
  expense: number; // 총보수 % (정렬용 숫자)
  expenseLabel?: string; // 표시용 (예: "약 0.01%")
  distribution: "월" | "분기" | "반기" | "없음";
  yield?: string; // 대략 분배수익률
  note?: string;
};

// 보수(expense)는 작성 시점 운용사 공시 기준. 정렬·비교용 숫자라 소수 자릿수까지 둡니다.
export const ETFS: ETF[] = [
  // ── S&P 500 ──
  { category: "sp500", name: "ACE 미국S&P500", ticker: "360200", listing: "KR", index: "S&P 500", expense: 0.0047, distribution: "분기", note: "국내 상장 S&P500 중 최저 보수권. 절세계좌에 담기 좋음." },
  { category: "sp500", name: "TIGER 미국S&P500", ticker: "360750", listing: "KR", index: "S&P 500", expense: 0.0068, distribution: "분기", note: "국내 상장·원화. 거래량이 많아 사고팔기 편함." },
  { category: "sp500", name: "VOO (Vanguard)", ticker: "VOO", listing: "US", index: "S&P 500", expense: 0.03, distribution: "분기", note: "미국 상장 S&P500의 표준. 보수 최저권." },
  { category: "sp500", name: "IVV (iShares)", ticker: "IVV", listing: "US", index: "S&P 500", expense: 0.03, distribution: "분기", note: "VOO와 사실상 동일. 운용사만 다름." },
  { category: "sp500", name: "SPY (SPDR)", ticker: "SPY", listing: "US", index: "S&P 500", expense: 0.0945, distribution: "분기", note: "가장 오래된 ETF. 보수는 다소 높지만 유동성 최고." },

  // ── 나스닥 100 ──
  { category: "nasdaq100", name: "KODEX 미국나스닥100", ticker: "379810", listing: "KR", index: "나스닥 100", expense: 0.0062, distribution: "분기", note: "국내 상장·원화(분배형). 분배금을 재투자하는 TR은 별도 상품(보수 약 0.0099%)." },
  { category: "nasdaq100", name: "TIGER 미국나스닥100", ticker: "133690", listing: "KR", index: "나스닥 100", expense: 0.0068, expenseLabel: "약 0.0068%", distribution: "분기", note: "국내 상장 나스닥100 대표." },
  { category: "nasdaq100", name: "QQQM (Invesco)", ticker: "QQQM", listing: "US", index: "나스닥 100", expense: 0.15, distribution: "분기", note: "QQQ와 같은 지수, 보수는 더 낮음. 장기 적립이면 보통 유리." },
  { category: "nasdaq100", name: "QQQ (Invesco)", ticker: "QQQ", listing: "US", index: "나스닥 100", expense: 0.18, distribution: "분기", note: "유동성·옵션 거래가 많은 원조. 2025년 구조 변경으로 0.18%로 인하됐고, QQQM과 차이는 0.03%p로 좁혀졌어요." },

  // ── 미국 전체시장 ──
  { category: "total_us", name: "VTI (Vanguard)", ticker: "VTI", listing: "US", index: "CRSP 미국 전체시장 (약 3,500종목)", expense: 0.03, distribution: "분기", note: "대형주부터 소형주까지 미국 시장 통째로. 가장 ‘게으른’ 한 종목." },

  // ── 전세계 (글로벌) ──
  { category: "worldwide", name: "VT (Vanguard)", ticker: "VT", listing: "US", index: "FTSE 전세계 (선진+신흥 약 9,000종목)", expense: 0.06, distribution: "분기", note: "한 종목으로 전 세계 주식. 국가 선택조차 시장에 맡기는 방식." },
  { category: "worldwide", name: "VXUS (Vanguard)", ticker: "VXUS", listing: "US", index: "FTSE 미국 제외 전세계", expense: 0.05, distribution: "분기", note: "미국 외 지역만. VTI와 섞어 비중을 직접 조절할 때." },
  { category: "worldwide", name: "ACWI (iShares)", ticker: "ACWI", listing: "US", index: "MSCI 전세계 (ACWI)", expense: 0.32, distribution: "반기", note: "전세계 지수의 또 다른 표준. 보수는 VT보다 높음." },
  { category: "worldwide", name: "KODEX MSCI선진국", ticker: "251350", listing: "KR", index: "MSCI World (선진 23개국, 신흥국 제외)", expense: 0.3, distribution: "분기", note: "국내 상장·원화로 담는 선진국 전체. 신흥국은 빠져 있어요." },

  // ── 다우존스 ──
  { category: "dow", name: "DIA (SPDR)", ticker: "DIA", listing: "US", index: "다우존스 산업평균 (30종목)", expense: 0.16, distribution: "월", note: "미국 대표 우량주 30개. 종목 수가 적고 주가가중이라 분산은 제한적." },

  // ── 배당성장 (SCHD 계열) ──
  { category: "dividend_growth", name: "TIGER 미국배당다우존스", ticker: "458730", listing: "KR", index: "Dow Jones 미국 배당성장 100 (SCHD 동일지수)", expense: 0.01, expenseLabel: "약 0.01%", distribution: "월", note: "SCHD와 같은 지수를 원화·월배당으로. 국내 월배당 인기 1순위." },
  { category: "dividend_growth", name: "ACE 미국배당다우존스", ticker: "402970", listing: "KR", index: "미국 배당성장 100", expense: 0.01, expenseLabel: "약 0.01%", distribution: "월", note: "동일 지수 추종. 보수·분배 구조 거의 동일." },
  { category: "dividend_growth", name: "SOL 미국배당다우존스", ticker: "446720", listing: "KR", index: "미국 배당성장 100", expense: 0.01, expenseLabel: "약 0.01%", distribution: "월", note: "동일 지수 추종. 셋 중 거래량·괴리율로 고르면 됩니다." },
  { category: "dividend_growth", name: "SCHD (Schwab)", ticker: "SCHD", listing: "US", index: "Dow Jones 미국 배당성장 100", expense: 0.06, distribution: "분기", yield: "약 3.3~3.5%", note: "배당 ‘성장’ 중심. 배당과 주가 상승을 함께 노리는 대표 ETF." },

  // ── 고배당 ──
  { category: "high_dividend", name: "VYM (Vanguard)", ticker: "VYM", listing: "US", index: "FTSE 고배당 수익률", expense: 0.04, distribution: "분기", yield: "약 2.2~2.3%", note: "배당수익률이 높은 대형주 묶음(약 550종목). SCHD보다 종목 수가 많고 보수가 더 낮아졌어요." },

  // ── 커버드콜 (고분배) ──
  { category: "covered_call", name: "JEPI (JPMorgan)", ticker: "JEPI", listing: "US", index: "S&P500 + 옵션 매도 (커버드콜)", expense: 0.35, distribution: "월", yield: "약 7~8%", note: "분배율은 높지만 상승폭이 제한되고 원금 변동 위험. ‘고배당=좋음’ 아님." },
  { category: "covered_call", name: "JEPQ (JPMorgan)", ticker: "JEPQ", listing: "US", index: "나스닥100 + 옵션 매도 (커버드콜)", expense: 0.35, distribution: "월", yield: "약 9~11%", note: "JEPI의 나스닥 버전. 분배 더 높고 변동성도 더 큼." },

  // ── 모멘텀 (팩터) ──
  { category: "momentum", name: "MTUM (iShares)", ticker: "MTUM", listing: "US", index: "MSCI USA 모멘텀 팩터", expense: 0.15, distribution: "반기", note: "최근 강했던 주식에 더 싣는 팩터 전략. 장기 핵심보다는 ‘위성’으로." },
  { category: "momentum", name: "KIWOOM 미국S&P500모멘텀", ticker: "0137V0", listing: "KR", index: "S&P 500 모멘텀", expense: 0.12, distribution: "없음", note: "국내 상장 ‘한국판 SPMO’. 2025년 말 상장이라 운용 기간이 짧아요." },
];

// ── Part 02-③ · 국내상장 vs 해외상장 ─────────────────────────────────────────
export const LISTING_COMPARE: { label: string; kr: string; us: string }[] = [
  { label: "매수 통화", kr: "원화. 환전 불필요, 간편", us: "달러. 환전 필요" },
  { label: "절세계좌(ISA·연금·IRP)", kr: "담을 수 있음", us: "대부분 불가" },
  { label: "매매차익 세금", kr: "15.4% 배당소득세 (전액)", us: "22% 양도세 (250만원 초과분)" },
  { label: "금융소득종합과세", kr: "포함", us: "매매차익 제외 (분류과세)" },
  { label: "손익통산", kr: "불가", us: "가능" },
];

// ── Part 03 · 세금 ───────────────────────────────────────────────────────────
export type TaxType = { kind: string; rate: string; body: string };
export const TAXES: TaxType[] = [
  {
    kind: "① 양도소득세",
    rate: "22%",
    body: "해외주식·해외상장 ETF의 매매차익에 부과. 연 250만원 기본공제 후 초과분에 22%(소득세 20% + 지방세 2%). 과세표준 3억원 초과분은 27.5%가 적용됩니다. 분류과세라 종합소득에 합쳐지지 않고, 1년간 손익통산이 됩니다. 신고는 이듬해 5월.",
  },
  {
    kind: "② 배당소득세",
    rate: "15.4%",
    body: "배당·분배금에 15.4%(소득세 14% + 지방세 1.4%) 원천징수. 국내상장 ‘해외’ ETF의 매매차익도 세법상 배당으로 보아 15.4%가 붙습니다.",
  },
  {
    kind: "③ 금융소득종합과세",
    rate: "2,000만원~",
    body: "1년 이자+배당 합계가 2,000만원을 넘으면 초과분이 다른 소득과 합산되어 누진세율로 과세됩니다. 고소득·고배당 투자자가 특히 주의.",
  },
];

export type TaxRow = { asset: string; example: string; gain: string; dividend: string; combined: string; offset: string };
export const TAX_TABLE: TaxRow[] = [
  { asset: "국내주식 (소액주주)", example: "", gain: "비과세", dividend: "15.4%", combined: "배당만 해당", offset: "없음" },
  { asset: "국내상장 국내주식형 ETF", example: "예: KODEX 200", gain: "비과세", dividend: "15.4%", combined: "배당만 해당", offset: "없음" },
  { asset: "국내상장 해외·기타 ETF", example: "예: TIGER 미국S&P500", gain: "15.4% (배당소득)", dividend: "15.4%", combined: "포함", offset: "불가" },
  { asset: "해외주식 · 해외상장 ETF", example: "예: VOO, SCHD", gain: "22% (250만원 초과분)", dividend: "15.4%", combined: "차익 제외", offset: "가능" },
];

// ── Part 04 · 절세계좌 3종 ─────────────────────────────────────────────────────
export type Account = {
  name: string;
  full: string;
  benefit: string;
  limit: string;
  perk: string;
  caution: string;
};
export const ACCOUNTS: Account[] = [
  {
    name: "ISA",
    full: "개인종합자산관리계좌",
    benefit: "수익 비과세 + 초과분 9.9% 분리과세, 계좌 내 손익통산",
    limit: "연 2,000만 / 총 1억 (확대안 4,000만 / 2억)",
    perk: "비과세 일반형 200만 / 서민형 400만 (확대안 500 / 1,000만)",
    caution: "3년 의무가입 · ‘슈퍼 ISA’ 확대안은 논의 중",
  },
  {
    name: "연금저축",
    full: "연금저축펀드",
    benefit: "납입액 세액공제 + 과세이연",
    limit: "연 1,800만원 (공제는 600만원)",
    perk: "13.2~16.5% 세액공제",
    caution: "만 55세 이후 연금 수령",
  },
  {
    name: "IRP",
    full: "개인형퇴직연금",
    benefit: "세액공제 + 과세이연",
    limit: "연 1,800만원 (연금저축 합산 공제 900만원)",
    perk: "13.2~16.5% 세액공제",
    caution: "중도해지 시 기타소득세 16.5%",
  },
];

export const ACCOUNT_PRIORITY: { rank: string; title: string; body: string }[] = [
  { rank: "1순위", title: "연금저축 · IRP", body: "세액공제 900만원 한도까지 채우면 즉시 13.2~16.5%를 돌려받습니다. 시장이 어떻든 확정 수익에 가깝습니다." },
  { rank: "2순위", title: "ISA", body: "비과세·분리과세·손익통산을 활용하고, 3년 뒤 연금계좌로 옮기면 추가 절세가 됩니다." },
  { rank: "3순위", title: "일반계좌", body: "위를 채운 뒤 추가 투자. 미국 지수를 크게 굴린다면 해외상장(VOO 등)을 검토하세요." },
];

// ── 목표별 자산배분 (교육용 예시, 추천 아님) ─────────────────────────────────────
export type AllocModel = { name: string; sub: string; core: number; dividend: number; safe: number };
export const ALLOCATIONS: AllocModel[] = [
  { name: "성장 중심", sub: "장기·젊은층", core: 80, dividend: 10, safe: 10 },
  { name: "균형형", sub: "대부분의 직장인", core: 50, dividend: 30, safe: 20 },
  { name: "현금흐름 중심", sub: "은퇴 근접", core: 30, dividend: 50, safe: 20 },
];

// ── Part 05 · 부록 ────────────────────────────────────────────────────────────
export const CHECKLIST: string[] = [
  "증권사 앱에서 연금저축·IRP 개설, 세액공제 한도 목표 설정",
  "ISA(중개형) 개설, 비과세 한도 확인",
  "핵심 지수 ETF 1~2개 선택 (S&P500 또는 나스닥100)",
  "매달 투자 금액 결정 (예산 계산)",
  "자동이체와 자동매수 설정",
  "계좌 확인 주기 정하기 (예: 한 달에 한 번)",
  "해외상장 투자 시 5월 양도세 신고 일정 메모",
];

export type Term = { term: string; def: string };
export const GLOSSARY: Term[] = [
  { term: "총보수", def: "ETF를 보유할 때 1년에 떼는 운용 비용(%). 낮을수록 유리. ‘기타비용’ 포함 실부담은 조금 더 높을 수 있습니다." },
  { term: "분배금", def: "ETF가 보유 종목에서 받은 배당 등을 투자자에게 나눠주는 돈." },
  { term: "적립식 (DCA)", def: "매달 일정 금액을 꾸준히 사는 방식. 평균 매입단가를 분산합니다." },
  { term: "분류과세", def: "다른 소득과 합치지 않고 따로 매기는 세금(예: 해외주식 양도세)." },
  { term: "손익통산", def: "같은 해의 이익과 손실을 합산해 세금을 계산하는 것." },
  { term: "TR (Total Return)", def: "분배금을 자동 재투자하는 ETF. 분배금 과세를 미루는 효과가 있습니다." },
  { term: "커버드콜", def: "옵션을 팔아 분배금을 높이는 전략. 분배율은 높지만 상승폭이 제한됩니다." },
  { term: "괴리율", def: "ETF 시장가격이 실제 순자산가치(NAV)에서 얼마나 벗어났는지를 나타내는 정도." },
];
