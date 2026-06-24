"use client";

import { useState, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════
//  ✏️  EDIT ME — all your links, videos, and content live in this one block.
//      Everything below this block is layout you usually won't need to touch.
// ═══════════════════════════════════════════════════════════════════════════

const SITE = {
  // Your channels. Paste the full URLs.
  youtube: "https://www.youtube.com/@Jasonsmoneyshow",
  instagram: "https://www.instagram.com/", // ← 인스타 주소를 넣으세요

  // 프로필 일러스트(아바타). public/ 폴더에 파일을 넣고 경로만 바꾸면 됩니다.
  avatar: "/jason-avatar.webp",

  // 문의 이메일 (선택). 비워두면 "유튜브·인스타 DM" 안내가 표시됩니다.
  contactEmail: "",

  // Email signups. Paste a form endpoint to make the forms REAL.
  //   • Formspree:   https://formspree.io  → "https://formspree.io/f/abcdxyz"
  //   • Buttondown:  https://buttondown.email  (form action URL)
  //   • ConvertKit / Mailchimp embedded form action URL also works.
  // Leave it "" to run the forms in safe demo mode (no email is actually sent).
  emailFormAction: "",
};

// 무료 영상 — 유튜브 영상 ID만 넣으면 썸네일·재생이 자동으로 연결됩니다.
//   youtubeId = youtube.com/watch?v=★★★★★★★★★★★  의 ★ 부분 (11자)
//   비워두면("") "곧 공개" 카드로 표시되고, 클릭 시 유튜브 채널로 이동합니다.
const FREE_VIDEOS: { youtubeId: string; title: string; desc: string; duration: string }[] = [
  { youtubeId: "", title: "미국주식 계좌, 5분에 개설하기", desc: "증권사 선택부터 첫 매수까지, 왕초보용 시작 가이드.", duration: "8분" },
  { youtubeId: "", title: "ISA·연금으로 세금 줄이는 법", desc: "절세계좌 3종을 5분 만에 이해하는 핵심 정리.", duration: "11분" },
  { youtubeId: "", title: "흔들리지 않는 투자 마인드셋", desc: "소음에 휘둘리지 않고 오래 버티는 사고법.", duration: "9분" },
];

// 멤버십에서 준비 중인 영상 콘텐츠 (오픈 예정). 자유롭게 수정하세요.
const PREMIUM_VIDEOS = [
  { title: "미국 ETF 완전 분석 시리즈", desc: "S&P500·나스닥100·배당 ETF를 깊이 있게.", meta: "6편 · 총 72분", thumb: "" },
  { title: "포트폴리오 설계 워크숍", desc: "자산배분 프레임워크를 내 상황에 적용하기.", meta: "4편 · 총 58분", thumb: "alt" },
  { title: "절세계좌 200% 활용 이야기", desc: "ISA·연금·IRP를 한도까지 굴리는 실전 순서.", meta: "5편 · 총 64분", thumb: "alt2" },
  { title: "월배당 현금흐름 만들기", desc: "배당 ETF로 매달 들어오는 흐름 설계하기.", meta: "3편 · 총 41분", thumb: "alt" },
  { title: "시장 폭락 대응 플레이북", desc: "흔들릴 때 팔지 않는 사람의 체크리스트.", meta: "3편 · 총 37분", thumb: "alt2" },
  { title: "연말정산 절세 실전", desc: "연금·ISA로 환급을 극대화하는 시즌 영상.", meta: "4편 · 총 49분", thumb: "" },
];

// ═══════════════════════════════════════════════════════════════════════════

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

/** POST an email to the configured form endpoint. Returns true on success
 *  (or in demo mode when no endpoint is set). Swap SITE.emailFormAction to
 *  make this capture real subscribers. */
async function subscribeEmail(email: string, source: string): Promise<boolean> {
  if (!SITE.emailFormAction) return true; // demo mode
  try {
    const res = await fetch(SITE.emailFormAction, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, source }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

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

const YouTubeGlyph = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#e23b2e"
      d="M23 12s0-3.7-.46-5.46a2.78 2.78 0 0 0-1.94-1.94C18.84 4.13 12 4.13 12 4.13s-6.84 0-8.6.47A2.78 2.78 0 0 0 1.46 6.54C1 8.3 1 12 1 12s0 3.7.46 5.46a2.78 2.78 0 0 0 1.94 1.94c1.76.47 8.6.47 8.6.47s6.84 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.94C23 15.7 23 12 23 12Z"
    />
    <path fill="#fff" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

/** Circular doodle avatar. `className` controls size via CSS (.avatar-sm / .avatar-lg). */
function Avatar({ className = "" }: { className?: string }) {
  return (
    <span className={`avatar-circle ${className}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SITE.avatar} alt="" />
    </span>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "#free", label: "무료 콘텐츠" },
    { href: "#membership", label: "멤버십" },
    { href: "#about", label: "소개" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="nav" id="topnav" style={mobileOpen ? { position: "sticky", top: 0, zIndex: 50 } : undefined}>
      <div className="wrap nav-in">
        <a href="#top" className="brand brand-row">
          <Avatar className="avatar-sm" />
          <span className="brand-text">제이슨의 머니쇼<small>JASON&apos;S MONEY SHOW</small></span>
        </a>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="btn btn-ghost" href={SITE.youtube} target="_blank" rel="noreferrer noopener">
            <YouTubeGlyph /> 구독
          </a>
          <a className="btn btn-primary" href="#ebook">무료로 시작</a>
          <button className="hamb" aria-label="menu" onClick={() => setMobileOpen((v) => !v)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={SITE.youtube} target="_blank" rel="noreferrer noopener" style={{ color: "var(--ink)", fontWeight: 600 }}>
            유튜브 구독 ↗
          </a>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" style={{ paddingTop: 70 }}>
      <div className="wrap">
        <div className="hero-intro">
          <Avatar className="avatar-lg" />
          <span className="hero-hi">안녕하세요, 제이슨이에요 👋</span>
        </div>
        <div className="eyebrow">미국주식 · ETF · 절세 · 평범한 사람의 투자 기록</div>
        <h1>흔들리지 않는 투자,<br />함께 시작해요.</h1>
        <p className="lead">
          전문가의 비법이 아니라, 같은 길을 걷는 평범한 투자자의 기록입니다. 미국주식·ETF·절세를 왕초보 눈높이로 풀어드려요.
          무료 영상으로 가볍게 시작하고, 새 글은 이메일로 받아보세요.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#ebook">무료 가이드 받기</a>
          <a className="btn btn-ghost" href={SITE.youtube} target="_blank" rel="noreferrer noopener">
            <YouTubeGlyph /> 유튜브 구독하기
          </a>
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

// ── Honest promise bar ─────────────────────────────────────────────────────────
function HonestBar() {
  const items = ["종목 추천·리딩 아님", "수익 보장 아님", "제 경험과 공부를 솔직하게 공유"];
  return (
    <div className="honest-bar">
      <div className="wrap honest-in">
        {items.map((t) => (
          <span key={t} className="honest-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3f5e44" strokeWidth="2.4">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Free Content ──────────────────────────────────────────────────────────────
function FreeContent({ onPlay }: { onPlay: (id: string) => void }) {
  const thumbVariants = ["", "alt", "alt2"];
  return (
    <section id="free">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">무료 콘텐츠</div>
          <h2>무료로 먼저 보기</h2>
          <p>핵심만 담은 무료 영상으로 가볍게 시작하세요. 더 많은 영상은 유튜브 채널에서 이어집니다.</p>
        </div>
        <div className="grid g3">
          {FREE_VIDEOS.map((v, i) => {
            const live = Boolean(v.youtubeId);
            const card = (
              <>
                <div className={`thumb${thumbVariants[i % 3] ? " " + thumbVariants[i % 3] : ""}`}>
                  {live && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="thumb-img" src={ytThumb(v.youtubeId)} alt="" />
                  )}
                  <span className="tag-free">무료</span>
                  {live ? (
                    <div className="play"><PlayIcon /></div>
                  ) : (
                    <span className="badge-soon">곧 공개</span>
                  )}
                </div>
                <div className="body">
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                  <div className="meta">영상 · {v.duration}</div>
                </div>
              </>
            );
            return live ? (
              <button key={v.title} className="card card-btn" onClick={() => onPlay(v.youtubeId)}>
                {card}
              </button>
            ) : (
              <a key={v.title} className="card card-btn" href={SITE.youtube} target="_blank" rel="noreferrer noopener">
                {card}
              </a>
            );
          })}
        </div>
        <div className="free-foot">
          <a className="btn btn-ghost" href={SITE.youtube} target="_blank" rel="noreferrer noopener">
            <YouTubeGlyph /> 유튜브에서 더 보기
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Lead Magnet ───────────────────────────────────────────────────────────────
function LeadMagnet() {
  const [note, setNote] = useState("스팸 없이, 새 글과 영상 소식만 가끔 보내드려요.");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    const ok = await subscribeEmail(email, "ebook");
    setBusy(false);
    if (ok) {
      setNote(
        SITE.emailFormAction
          ? "✓ 등록되었습니다. 메일함에서 체크리스트를 확인하세요!"
          : "✓ 등록되었습니다! (데모 — 이메일 폼을 연결하면 실제로 발송됩니다)"
      );
      setEmail("");
    } else {
      setNote("앗, 잠시 후 다시 시도해 주세요.");
    }
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
              <button className="btn btn-gold" type="submit" disabled={busy}>
                {busy ? "등록 중…" : "무료로 받기"}
              </button>
            </form>
            <div className="lead-note">{note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Membership (coming soon) ────────────────────────────────────────────────────
function PremiumSection({ onWaitlist }: { onWaitlist: () => void }) {
  return (
    <section
      id="membership"
      style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}
    >
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">멤버십 · 준비 중</div>
          <h2>더 깊은 이야기, 멤버십으로 준비하고 있어요</h2>
          <p>무료 콘텐츠를 충분히 보신 분들을 위해 차근차근 정리한 영상과 실전 자료를 만들고 있습니다. 오픈하면 가장 먼저 알려드릴게요.</p>
        </div>
        <div className="premium-tools">
          <span className="muted" style={{ fontSize: 14 }}>아래는 준비 중인 영상 미리보기입니다 · 매주 추가 예정</span>
          <button className="btn btn-primary" onClick={onWaitlist}>오픈 알림 받기</button>
        </div>
        <div className="grid g3">
          {PREMIUM_VIDEOS.map((v) => (
            <button key={v.title} className="card locked card-btn" onClick={onWaitlist}>
              <div className={`thumb${v.thumb ? " " + v.thumb : ""}`}>
                <span className="tag-lock">준비 중</span>
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing({ onWaitlist }: { onWaitlist: () => void }) {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">요금제</div>
          <h2>지금은 전부 무료로 시작하세요</h2>
          <p>무료 콘텐츠와 뉴스레터는 지금 바로 이용할 수 있어요. 멤버십은 준비가 되면 합리적인 가격으로 오픈할 예정입니다.</p>
        </div>
        <div className="plans">
          <div className="plan feat">
            <div className="feat-flag">지금 이용 가능</div>
            <div className="pname">무료</div>
            <div className="pdesc">지금 바로 시작하는 분께</div>
            <div className="price">₩0</div>
            <div className="price-sub">신용카드 필요 없음</div>
            <ul>
              <li><CheckIcon /> 무료 영상 콘텐츠</li>
              <li><CheckIcon /> 미국주식 시작 체크리스트 eBook</li>
              <li><CheckIcon /> 새 글·영상 뉴스레터</li>
              <li><CheckIcon /> 유튜브·인스타 커뮤니티</li>
            </ul>
            <a className="btn btn-primary btn-block" href="#ebook">무료로 시작</a>
          </div>
          <div className="plan">
            <div className="pname">멤버십 <span className="soon-pill">곧 오픈</span></div>
            <div className="pdesc">더 깊이 함께 공부하고 싶은 분께</div>
            <div className="price">₩9,900 <small>/ 월 (예정)</small></div>
            <div className="price-sub">오픈 시 얼리버드 혜택 예정</div>
            <ul>
              <li><CheckIcon /> 전체 영상 콘텐츠 라이브러리</li>
              <li><CheckIcon /> 매주 추가되는 새 영상</li>
              <li><CheckIcon /> 전자책·엑셀 템플릿 전체</li>
              <li><CheckIcon /> 멤버 전용 Q&amp;A 커뮤니티</li>
            </ul>
            <button className="btn btn-ghost btn-block" onClick={onWaitlist}>오픈 알림 받기</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────
function Benefits() {
  const benefits = [
    { t: "왕초보 눈높이", d: "용어부터 차근차근, 처음 시작하는 분도 따라올 수 있게.", p: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></> },
    { t: "꾸준한 업데이트", d: "시장 흐름과 시즌 이슈를 영상·글로 꾸준히 나눕니다.", p: <path d="M12 2v20M2 12h20" /> },
    { t: "한국 투자자 맞춤", d: "ISA·연금·IRP 등 한국 세금·계좌 현실에 맞춘 설명.", p: <><path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h6" /></> },
    { t: "솔직한 기록", d: "성공만이 아니라 시행착오도 가감 없이 공유합니다.", p: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
    { t: "원칙 중심", d: "종목 추천이 아니라, 흔들리지 않는 원칙을 함께 세웁니다.", p: <path d="M12 2 4 6v6c0 5 8 8 8 8s8-3 8-8V6z" /> },
    { t: "부담 없이", d: "무료로 충분히 보고, 필요할 때만 더 깊이 들어가세요.", p: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
  ];
  return (
    <section style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">이 채널이 다루는 것</div>
          <h2>무엇을 얻어가게 될까요</h2>
        </div>
        <div className="benefits">
          {benefits.map((b) => (
            <div className="benefit" key={b.t}>
              <div className="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">
                  {b.p}
                </svg>
              </div>
              <div><h4>{b.t}</h4><p>{b.d}</p></div>
            </div>
          ))}
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
        <div className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.avatar} alt="제이슨 일러스트" className="portrait-img" />
        </div>
        <div>
          <div className="eyebrow">제이슨 소개</div>
          <h2>저도 같은 길을 걷는 중입니다</h2>
          <p>
            안녕하세요, &apos;제이슨의 머니쇼&apos;를 운영하는 제이슨입니다. 저는 투자 전문가도, 부자도 아닙니다.
            여러분과 똑같이 평범하게 벌고 모으며 투자하는 사람이에요.
          </p>
          <div className="quote">&ldquo;가장 어려운 건 종목을 고르는 게 아니라, 아무것도 하지 않고 버티는 것입니다.&rdquo;</div>
          <p>
            화려한 비법 대신, 좋은 자산을 꾸준히 사서 오래 보유한다는 단순한 원칙을 지키며 제 경험과 시행착오를 솔직하게 기록합니다.
            이 채널은 종목을 찍어주거나 수익을 보장하는 곳이 아니라, 흔들리지 않고 오래 투자하는 법과 한국 투자자에게 꼭 필요한
            세금·계좌 지식을 함께 공부하는 공간입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Promises (honest social proof) ──────────────────────────────────────────────
function Promises() {
  const cards = [
    { h: "팔라고 부추기지 않아요", d: "조회수를 위한 공포·과장 대신, 차분하게 원칙을 이야기합니다." },
    { h: "쉽게 풀어드려요", d: "어려운 용어는 일상의 말로. 처음 보는 분도 끝까지 따라올 수 있게." },
    { h: "솔직하게 공유해요", d: "제가 직접 공부하고 겪은 것만. 모르는 건 모른다고 말합니다." },
  ];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">약속</div>
          <h2>이 채널이 지키는 것</h2>
        </div>
        <div className="tcards">
          {cards.map((c) => (
            <div className="tcard" key={c.h}>
              <div className="promise-h">{c.h}</div>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
        {/* 실제 구독자 후기가 모이면, 위 카드를 후기로 교체해도 좋습니다. */}
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "정말 전부 무료인가요?", a: "네. 현재 영상 콘텐츠, eBook, 뉴스레터는 모두 무료로 이용하실 수 있습니다. 멤버십은 준비가 되면 별도로 안내드릴게요." },
  { q: "투자 전문가인가요?", a: "아닙니다. 저는 금융투자업 인가를 받은 전문가가 아니라, 같은 길을 걷는 평범한 투자자입니다. 제 경험과 공부를 나눌 뿐, 종목 추천이나 리딩은 하지 않습니다." },
  { q: "종목을 추천해 주나요?", a: "하지 않습니다. 이 채널은 '무엇을 사라'가 아니라 '어떻게 흔들리지 않고 오래 투자하느냐'에 집중합니다. 모든 판단과 책임은 본인에게 있습니다." },
  { q: "멤버십은 언제 오픈하나요?", a: "콘텐츠가 충분히 쌓이면 오픈할 예정입니다. '오픈 알림 받기'로 이메일을 남겨두시면 가장 먼저, 얼리버드 혜택과 함께 알려드립니다." },
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
function FinalCTA() {
  return (
    <section className="cta-final">
      <div className="wrap">
        <h2>오늘, 흔들리지 않는 투자를 함께 시작해요</h2>
        <p>무료 가이드를 받고, 새 글과 영상을 이메일로 챙겨보세요. 부담은 전혀 없습니다.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn-primary" href="#ebook">무료 가이드 받기</a>
          <a className="btn btn-ghost" href={SITE.youtube} target="_blank" rel="noreferrer noopener">
            <YouTubeGlyph /> 유튜브 구독하기
          </a>
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
            <p className="muted" style={{ fontSize: 13.5 }}>흔들리지 않는 장기투자, 한국 투자자를 위한 미국주식·ETF·절세 이야기.</p>
          </div>
          <div className="foot-col">
            <h5>콘텐츠</h5>
            <a href="#free">무료 콘텐츠</a>
            <a href="#membership">멤버십</a>
            <a href="#ebook">무료 eBook</a>
            <a href="#about">소개</a>
          </div>
          <div className="foot-col">
            <h5>채널</h5>
            <a href={SITE.youtube} target="_blank" rel="noreferrer noopener">YouTube</a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer noopener">Instagram</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="foot-col">
            <h5>정책</h5>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">환불 정책</a>
          </div>
        </div>
        <div className="disclaimer">
          {SITE.contactEmail ? (
            <>문의: <a href={`mailto:${SITE.contactEmail}`} style={{ textDecoration: "underline" }}>{SITE.contactEmail}</a><br /><br /></>
          ) : (
            <>문의는 유튜브·인스타그램 채널 메시지로 받습니다.<br /><br /></>
          )}
          본 사이트의 모든 콘텐츠는 일반적인 정보 제공 및 교육 목적이며, 특정 종목의 매수·매도 추천이나 투자자문이 아닙니다. 운영자는 자본시장법상 금융투자업(투자자문업 등) 인가·등록을 받은 자가 아니며, 콘텐츠는 어떠한 수익도 보장하지 않습니다. 모든 투자 결정과 그 결과에 대한 책임은 투자자 본인에게 있습니다. © 2026 제이슨의 머니쇼.
        </div>
      </div>
    </footer>
  );
}

// ── YouTube Lightbox ────────────────────────────────────────────────────────────
function VideoLightbox({ videoId, onClose }: { videoId: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!videoId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoId, onClose]);

  if (!videoId) return null;
  return (
    <div className="yt-bg show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="yt-box">
        <button className="yt-close" onClick={onClose} aria-label="close">&times;</button>
        <div className="yt-frame">
          <iframe
            src={ytEmbed(videoId)}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// ── Waitlist Modal ──────────────────────────────────────────────────────────────
function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    const ok = await subscribeEmail(email, "waitlist");
    setBusy(false);
    if (ok) { setDone(true); setEmail(""); }
  };

  return (
    <div className="modal-bg show" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="x" onClick={onClose} aria-label="close">&times;</button>
        <div className="eyebrow">멤버십 · 곧 오픈</div>
        <h3>오픈하면 가장 먼저 알려드릴게요</h3>
        {done ? (
          <p style={{ marginBottom: 0 }}>
            ✓ 등록되었습니다! 멤버십이 열리면 얼리버드 혜택과 함께 이메일로 안내드릴게요.
            {!SITE.emailFormAction && <span className="muted"> (데모 — 이메일 폼 연결 시 실제 저장됩니다)</span>}
          </p>
        ) : (
          <>
            <p>이메일을 남겨두시면 멤버십 오픈 소식과 얼리버드 혜택을 가장 먼저 보내드립니다.</p>
            <form className="lead-form" onSubmit={submit} style={{ flexDirection: "column", alignItems: "stretch" }}>
              <input
                type="email"
                placeholder="이메일 주소"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: "var(--card)", color: "var(--ink)", border: "1px solid var(--hair2)", minWidth: 0, width: "100%", marginBottom: 10 }}
              />
              <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
                {busy ? "등록 중…" : "오픈 알림 받기"}
              </button>
            </form>
            <p className="muted" style={{ fontSize: 12, textAlign: "center", marginTop: 12, marginBottom: 0 }}>
              스팸 없이 오픈 소식만 보내드려요. 언제든 수신 거부할 수 있습니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const play = useCallback((id: string) => setPlayingId(id), []);
  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);

  return (
    <>
      <a id="top" />
      <Navbar />
      <Hero />
      <HonestBar />
      <FreeContent onPlay={play} />
      <LeadMagnet />
      <PremiumSection onWaitlist={openWaitlist} />
      <Pricing onWaitlist={openWaitlist} />
      <Benefits />
      <About />
      <Promises />
      <FAQ />
      <FinalCTA />
      <Footer />
      <VideoLightbox videoId={playingId} onClose={() => setPlayingId(null)} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
