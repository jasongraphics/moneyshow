"use client";

import { useState, useCallback } from "react";

// ── SVG helpers ──────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f5e44" strokeWidth="2.2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#faf8f2">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.7">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="nav" id="topnav" style={mobileOpen ? { position: "sticky", top: 0, zIndex: 50 } : undefined}>
      <div className="wrap nav-in">
        <a href="#top" className="brand">
          제이슨의 머니쇼<small>JASON&apos;S MONEY SHOW</small>
        </a>
        <nav className={`nav-links${mobileOpen ? " mobile-open-nav" : ""}`}>
          <a href="#free" onClick={() => setMobileOpen(false)}>무료 콘텐츠</a>
          <a href="#membership" onClick={() => setMobileOpen(false)}>멤버십</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>요금제</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="#ebook">무료 eBook</a>
          <button className="btn btn-primary" onClick={onOpenModal}>멤버십 시작</button>
          <button
            className="hamb"
            aria-label="menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div style={{
          display: "flex", flexDirection: "column", background: "var(--paper)",
          borderBottom: "1px solid var(--hair)", padding: "16px 24px", gap: 14,
        }}>
          <a href="#free" onClick={() => setMobileOpen(false)} style={{ fontSize: 14.5, fontWeight: 500, color: "var(--ink2)" }}>무료 콘텐츠</a>
          <a href="#membership" onClick={() => setMobileOpen(false)} style={{ fontSize: 14.5, fontWeight: 500, color: "var(--ink2)" }}>멤버십</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} style={{ fontSize: 14.5, fontWeight: 500, color: "var(--ink2)" }}>요금제</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} style={{ fontSize: 14.5, fontWeight: 500, color: "var(--ink2)" }}>FAQ</a>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="hero" style={{ paddingTop: 70 }}>
      <div className="wrap">
        <div className="eyebrow">미국주식 · ETF · 절세 인사이트</div>
        <h1>흔들리지 않는 투자,<br />오늘 시작하세요.</h1>
        <p className="lead">
          왕초보도 따라 하는 미국주식·ETF·절세. 무료 콘텐츠로 먼저 맛보고, 멤버십으로 전체 영상 강의와 자료를 모두 잠금 해제하세요.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#ebook">무료로 시작하기</a>
          <a className="btn btn-ghost" href="#membership">멤버십 살펴보기</a>
        </div>
        <div className="hero-trust">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b08d3c" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          유튜브·인스타그램에서 &apos;제이슨의 머니쇼&apos;를 운영합니다
        </div>
        <div className="pillrow">
          <span className="pill">미국주식 ETF</span>
          <span className="pill">국내상장 vs 해외상장</span>
          <span className="pill">ISA · 연금 · IRP 절세</span>
          <span className="pill">장기투자 마인드셋</span>
        </div>
      </div>
    </section>
  );
}

// ── Free Content ──────────────────────────────────────────────────────────────
function FreeContent() {
  return (
    <section id="free">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">무료 콘텐츠</div>
          <h2>무료로 먼저 맛보기</h2>
          <p>핵심만 담은 무료 영상으로 가볍게 시작하세요. 마음에 들면 멤버십에서 전체 시리즈를 만날 수 있습니다.</p>
        </div>
        <div className="grid g3">
          <div className="card">
            <div className="thumb">
              <span className="tag-free">무료</span>
              <div className="play"><PlayIcon /></div>
            </div>
            <div className="body">
              <h4>미국주식 계좌, 5분에 개설하기</h4>
              <p>증권사 선택부터 첫 매수까지, 왕초보용 시작 가이드.</p>
              <div className="meta">영상 · 8분</div>
            </div>
          </div>
          <div className="card">
            <div className="thumb alt">
              <span className="tag-free">무료</span>
              <div className="play"><PlayIcon /></div>
            </div>
            <div className="body">
              <h4>ISA·연금으로 세금 줄이는 법</h4>
              <p>절세계좌 3종을 5분 만에 이해하는 핵심 정리.</p>
              <div className="meta">영상 · 11분</div>
            </div>
          </div>
          <div className="card">
            <div className="thumb alt2">
              <span className="tag-free">무료</span>
              <div className="play"><PlayIcon /></div>
            </div>
            <div className="body">
              <h4>8억 모은 투자 마인드셋</h4>
              <p>소음에 흔들리지 않는 장기투자자의 사고법.</p>
              <div className="meta">영상 · 9분</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Lead Magnet ───────────────────────────────────────────────────────────────
function LeadMagnet() {
  const [note, setNote] = useState("스팸 없이, 새 콘텐츠 소식만 가끔 보내드려요.");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNote("✓ 등록되었습니다. 메일함에서 eBook을 확인하세요! (데모)");
    setEmail("");
  };

  return (
    <section id="ebook" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="lead-band">
          <div>
            <div className="eyebrow" style={{ color: "#cda349" }}>무료 eBook</div>
            <h3>「미국주식 시작 체크리스트」를 무료로 받으세요</h3>
            <p>이메일만 남기면, 계좌 개설부터 첫 매수까지 한 장으로 정리한 PDF 체크리스트를 보내드립니다.</p>
          </div>
          <div>
            <form className="lead-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="이메일 주소"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-gold" type="submit">무료로 받기</button>
            </form>
            <div className="lead-note">{note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Premium / Locked Content ──────────────────────────────────────────────────
const premiumVideos = [
  { title: "미국 ETF 완전 분석 시리즈", desc: "S&P500·나스닥100·배당 ETF를 깊이 있게.", meta: "6편 · 총 72분", thumb: "" },
  { title: "포트폴리오 설계 워크숍", desc: "자산배분 프레임워크를 내 상황에 적용하기.", meta: "4편 · 총 58분", thumb: "alt" },
  { title: "절세계좌 200% 활용 강의", desc: "ISA·연금·IRP를 한도까지 굴리는 실전 순서.", meta: "5편 · 총 64분", thumb: "alt2" },
  { title: "월배당 현금흐름 만들기", desc: "배당 ETF로 매달 들어오는 흐름 설계하기.", meta: "3편 · 총 41분", thumb: "alt" },
  { title: "시장 폭락 대응 플레이북", desc: "흔들릴 때 팔지 않는 사람의 체크리스트.", meta: "3편 · 총 37분", thumb: "alt2" },
  { title: "연말정산 절세 실전", desc: "연금·ISA로 환급을 극대화하는 시즌 강의.", meta: "4편 · 총 49분", thumb: "" },
];

function PremiumSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section
      id="membership"
      style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}
    >
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">멤버십 전용</div>
          <h2>멤버십으로 전체 강의 잠금 해제</h2>
          <p>체계적인 영상 강의 라이브러리와 실전 자료. 멤버가 되면 아래 콘텐츠가 모두 열립니다.</p>
        </div>
        <div className="premium-tools">
          <span className="muted" style={{ fontSize: 14 }}>멤버십 전용 콘텐츠 · 6개 시리즈 외 매주 추가</span>
          <button className="btn btn-ghost" onClick={() => setUnlocked((v) => !v)}>
            {unlocked ? "다시 잠그기" : "미리보기 잠금 해제"}
          </button>
        </div>
        <div className="grid g3">
          {premiumVideos.map((v) => (
            <div
              key={v.title}
              className={`card locked${unlocked ? " unlocked" : ""}`}
              onClick={onOpenModal}
            >
              <div className={`thumb${v.thumb ? " " + v.thumb : ""}`}>
                <span className="tag-lock">멤버십</span>
                <div className="blur" />
                <div className="lockwrap">
                  <div className="lockbadge"><LockIcon /></div>
                </div>
              </div>
              <div className="body">
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
                <div className="meta">{v.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing({ onOpenModal }: { onOpenModal: () => void }) {
  const [billing, setBilling] = useState<"month" | "year">("month");

  const price = billing === "month" ? "₩9,900" : "₩99,000";
  const period = billing === "month" ? "/ 월" : "/ 년";
  const sub = billing === "month" ? "언제든 해지 가능" : "월 ₩8,250 꼴 · 2개월 무료";

  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">요금제</div>
          <h2>부담 없이 시작하고, 필요하면 멤버십으로</h2>
          <p>무료로 충분히 둘러본 뒤 결정하세요. 멤버십은 언제든 해지할 수 있습니다.</p>
        </div>
        <div className="toggle">
          <button className={billing === "month" ? "on" : ""} onClick={() => setBilling("month")}>월간</button>
          <button className={billing === "year" ? "on" : ""} onClick={() => setBilling("year")}>
            연간 <span style={{ color: "var(--gold)" }}>· 2개월 무료</span>
          </button>
        </div>
        <div className="plans">
          <div className="plan">
            <div className="pname">무료</div>
            <div className="pdesc">가볍게 시작하는 분께</div>
            <div className="price">₩0</div>
            <div className="price-sub" />
            <ul>
              <li><CheckIcon /> 무료 영상 콘텐츠</li>
              <li><CheckIcon /> 무료 eBook 1종</li>
              <li><CheckIcon /> 새 콘텐츠 뉴스레터</li>
            </ul>
            <a className="btn btn-ghost btn-block" href="#ebook">무료로 시작</a>
          </div>
          <div className="plan feat">
            <div className="feat-flag">가장 인기</div>
            <div className="pname">멤버십</div>
            <div className="pdesc">제대로 배우고 싶은 분께</div>
            <div className="price">{price} <small>{period}</small></div>
            <div className="price-sub">{sub}</div>
            <ul>
              <li><CheckIcon /> 전체 영상 강의 라이브러리</li>
              <li><CheckIcon /> 매주 추가되는 새 강의</li>
              <li><CheckIcon /> 전자책·엑셀 템플릿 전체</li>
              <li><CheckIcon /> 멤버 전용 Q&amp;A 커뮤니티</li>
            </ul>
            <button className="btn btn-primary btn-block" onClick={onOpenModal}>멤버십 시작하기</button>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>가격은 예시입니다. 실제 결제 연결 후 자유롭게 조정하세요.</p>
      </div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">멤버십 혜택</div>
          <h2>멤버십에 포함된 것</h2>
        </div>
        <div className="benefits">
          <div className="benefit">
            <div className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" />
              </svg>
            </div>
            <div><h4>전체 영상 강의</h4><p>체계적으로 정리된 강의를 처음부터 끝까지.</p></div>
          </div>
          <div className="benefit">
            <div className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <div><h4>매주 새 콘텐츠</h4><p>시장 흐름과 시즌 이슈를 꾸준히 업데이트.</p></div>
          </div>
          <div className="benefit">
            <div className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                <path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h6" />
              </svg>
            </div>
            <div><h4>전자책·템플릿 전체</h4><p>가이드 PDF와 예산·자산 관리 엑셀을 모두.</p></div>
          </div>
          <div className="benefit">
            <div className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div><h4>멤버 커뮤니티</h4><p>질문하고 함께 성장하는 비공개 공간.</p></div>
          </div>
          <div className="benefit">
            <div className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                <path d="M12 2 4 6v6c0 5 8 8 8 8s8-3 8-8V6z" />
              </svg>
            </div>
            <div><h4>멤버 전용 자료</h4><p>체크리스트·시트 등 실전 자료를 우선 제공.</p></div>
          </div>
          <div className="benefit">
            <div className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div><h4>언제든 해지</h4><p>약정 없이 원할 때 자유롭게 해지하세요.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div className="portrait"><span className="ph">프로필 사진을 넣으세요</span></div>
        <div>
          <div className="eyebrow">제이슨 소개</div>
          <h2>평범한 직장인에서 시작했습니다</h2>
          <p>안녕하세요, &apos;제이슨의 머니쇼&apos;를 운영하는 제이슨입니다. 화려한 비법이 아니라, 좋은 자산을 꾸준히 사서 오래 보유하는 단순한 원칙으로 자산을 모아왔습니다.</p>
          <div className="quote">&ldquo;가장 어려운 건 종목을 고르는 게 아니라, 아무것도 하지 않고 버티는 것입니다.&rdquo;</div>
          <p>이 채널은 종목을 찍어주는 곳이 아닙니다. 흔들리지 않고 오래 투자하는 법, 그리고 한국 투자자에게 꼭 필요한 세금·계좌 지식을 쉽게 풀어드립니다.</p>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">멤버 후기</div>
          <h2>먼저 시작한 분들의 이야기</h2>
        </div>
        <div className="tcards">
          <div className="tcard">
            <div className="stars">★★★★★</div>
            <p>&ldquo;계좌랑 세금이 늘 헷갈렸는데, 영상 한 번 보고 바로 정리됐어요. 자동이체까지 세팅 완료.&rdquo;</p>
            <div className="who">직장인 3년차 · 30대</div>
          </div>
          <div className="tcard">
            <div className="stars">★★★★★</div>
            <p>&ldquo;종목 추천이 아니라 &apos;원칙&apos;을 알려줘서 좋아요. 폭락장에 안 팔고 버틸 수 있었습니다.&rdquo;</p>
            <div className="who">초보 투자자 · 40대</div>
          </div>
          <div className="tcard">
            <div className="stars">★★★★★</div>
            <p>&ldquo;ISA·연금 활용 강의 덕분에 연말정산 환급이 늘었어요. 멤버십 값은 이미 뽑았습니다.&rdquo;</p>
            <div className="who">사회초년생 · 20대</div>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 14 }}>※ 위 후기는 예시입니다. 실제 멤버 후기로 교체해서 사용하세요.</p>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "멤버십은 언제든 해지할 수 있나요?", a: "네. 약정이 없어 원하실 때 바로 해지할 수 있고, 해지 후에도 결제한 기간까지는 이용할 수 있습니다." },
  { q: "결제는 어떻게 진행되나요?", a: "월간 또는 연간으로 카드 결제됩니다. 결제 수단은 연결하는 결제 서비스(예: 포트원·토스페이먼츠, 또는 Stripe)에 따라 달라집니다." },
  { q: "환불 정책은 어떻게 되나요?", a: "디지털 콘텐츠 특성에 맞춰 환불 정책을 안내합니다. 관련 법령과 결제 서비스 정책에 따라 청약철회 기준을 명시해 운영하세요." },
  { q: "영상은 어디에서 보나요?", a: "멤버 로그인 후 사이트 안에서 시청합니다. 영상은 비공개 호스팅으로 보호되며, 멤버에게만 노출됩니다." },
  { q: "이건 투자 자문인가요?", a: "아닙니다. 모든 콘텐츠는 일반적인 금융·투자 교육 및 정보 제공 목적이며, 특정 종목 추천이나 투자자문이 아닙니다. 투자 판단과 책임은 본인에게 있습니다." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">자주 묻는 질문</div>
          <h2>FAQ</h2>
        </div>
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={i} className={`qa${openIdx === i ? " open" : ""}`}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q}<span className="pm">+</span>
              </button>
              <div className="ans">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="cta-final">
      <div className="wrap">
        <h2>오늘, 흔들리지 않는 투자를 시작하세요</h2>
        <p>무료 콘텐츠로 가볍게 시작해, 준비되면 멤버십으로 전체를 잠금 해제하세요.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn-primary" href="#ebook">무료로 시작하기</a>
          <button className="btn btn-ghost" onClick={onOpenModal}>멤버십 시작하기</button>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-col" style={{ maxWidth: 280 }}>
            <div className="brand" style={{ fontSize: 18, marginBottom: 8 }}>제이슨의 머니쇼</div>
            <p className="muted" style={{ fontSize: 13.5 }}>흔들리지 않는 장기투자, 한국 투자자를 위한 미국주식·ETF·절세 콘텐츠.</p>
          </div>
          <div className="foot-col">
            <h5>콘텐츠</h5>
            <a href="#free">무료 콘텐츠</a>
            <a href="#membership">멤버십</a>
            <a href="#ebook">무료 eBook</a>
            <a href="#pricing">요금제</a>
          </div>
          <div className="foot-col">
            <h5>채널</h5>
            <a href="#">YouTube</a>
            <a href="#">Instagram</a>
            <a href="#faq">FAQ</a>
            <a href="#">문의하기</a>
          </div>
          <div className="foot-col">
            <h5>정책</h5>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">환불 정책</a>
          </div>
        </div>
        <div className="disclaimer">
          사업자 정보: (상호) · (대표) · (사업자등록번호) · (통신판매업신고번호) · (주소) · (연락처) — 실제 정보로 교체하세요.<br /><br />
          본 사이트의 모든 콘텐츠는 일반적인 금융·투자 교육 및 정보 제공을 목적으로 하며, 특정 종목의 매수·매도 추천이나 투자자문이 아닙니다. 운영자는 자본시장법상 금융투자업(투자자문업 등) 인가·등록을 받은 자가 아닙니다. 모든 투자 결정과 그 결과에 대한 책임은 투자자 본인에게 있습니다. © 2026 제이슨의 머니쇼.
        </div>
      </div>
    </footer>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className={`modal-bg${open ? " show" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="x" onClick={onClose} aria-label="close">&times;</button>
        <div className="eyebrow">멤버십</div>
        <h3>전체 강의를 잠금 해제하세요</h3>
        <p>멤버가 되면 모든 영상 강의와 전자책·템플릿, 멤버 커뮤니티를 이용할 수 있습니다.</p>
        <div className="mprice">₩9,900 <small>/ 월</small></div>
        <ul>
          <li><CheckIcon /> 전체 영상 강의 + 매주 추가</li>
          <li><CheckIcon /> 전자책·엑셀 템플릿 전체</li>
          <li><CheckIcon /> 멤버 전용 커뮤니티</li>
        </ul>
        <button
          className="btn btn-primary btn-block"
          onClick={() => alert("데모 화면입니다. 결제 연결 후 실제 결제로 이어집니다.")}
        >
          결제하고 시작하기
        </button>
        <p className="muted" style={{ fontSize: 12, textAlign: "center", marginTop: 12, marginBottom: 0 }}>
          결제 서비스를 연결하면 실제 결제로 이어집니다.
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <a id="top" />
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <FreeContent />
      <LeadMagnet />
      <PremiumSection onOpenModal={openModal} />
      <Pricing onOpenModal={openModal} />
      <Benefits />
      <About />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenModal={openModal} />
      <Footer />
      <Modal open={modalOpen} onClose={closeModal} />
    </>
  );
}
