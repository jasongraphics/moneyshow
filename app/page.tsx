"use client";

import Link from "next/link";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";
import NetWorthGraph from "./_components/NetWorthGraph";
import PortfolioPie from "./_components/PortfolioPie";
import { SITE, CHANNELS, DISCORD } from "./lib/site";
import { useState, useEffect, useRef } from "react";

// ── SVG helpers ──────────────────────────────────────────────────────────────
const YouTubeGlyph = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#e23b2e"
      d="M23 12s0-3.7-.46-5.46a2.78 2.78 0 0 0-1.94-1.94C18.84 4.13 12 4.13 12 4.13s-6.84 0-8.6.47A2.78 2.78 0 0 0 1.46 6.54C1 8.3 1 12 1 12s0 3.7.46 5.46a2.78 2.78 0 0 0 1.94 1.94c1.76.47 8.6.47 8.6.47s6.84 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.94C23 15.7 23 12 23 12Z"
    />
    <path fill="#fff" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const InstagramGlyph = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#c1399a" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5.2" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="#c1399a" stroke="none" />
  </svg>
);

/** SNS channels shown as a quiet list, not a primary CTA. */
function Channels({ center = false }: { center?: boolean }) {
  return (
    <div className={`channels${center ? " center" : ""}`}>
      {CHANNELS.map((c) => (
        <a key={c.type} className="ch" href={c.href} target="_blank" rel="noreferrer noopener">
          {c.type === "youtube" ? <YouTubeGlyph /> : <InstagramGlyph />}
          <span className="ch-l">{c.label}</span>
          <span className="ch-h">{c.handle}</span>
        </a>
      ))}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" style={{ paddingTop: 36 }}>
      <div className="wrap">
        <div className="eyebrow">미국주식 · ETF · 절세 · 평범한 사람의 투자 기록</div>
        <h1>흔들리지 않는 투자,<br />여기서 시작해요.</h1>
        <p className="lead">
          전문가의 비법이 아니라, 같은 길을 걷는 평범한 투자자의 기록입니다.
          미국주식·ETF·절세와 복리의 힘을 왕초보 눈높이로, 이 사이트 안에서 전부 무료로 공부할 수 있어요.
        </p>
        <div className="hero-cta">
          <Link className="btn btn-primary" href="/start">투자, 어떻게 시작할까</Link>
          <Link className="btn btn-ghost" href="/tools">복리 계산기 열기</Link>
        </div>
        <div className="hero-trust">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          유튜브·인스타그램에서 &apos;제이슨의 머니쇼&apos;를 운영합니다
        </div>
        <Channels />
        <div className="pillrow">
          <span className="pill">미국주식 ETF</span>
          <span className="pill">국내상장 vs 해외상장</span>
          <span className="pill">ISA · 연금 · IRP 절세</span>
          <span className="pill">복리·장기투자</span>
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

// ── 자료실 허브 (resource hub) ──────────────────────────────────────────────────
const HUB: { href: string; t: string; d: string; p: React.ReactNode }[] = [
  { href: "/start", t: "시작하기", d: "흔들리지 않는 7가지 원칙과, 첫 계좌부터 첫 매수까지의 순서.", p: <path d="M5 12h14M13 6l6 6-6 6" /> },
  { href: "/etfs", t: "ETF 자료실", d: "S&P500·나스닥·전세계·배당까지, 보수와 세금을 한 표에서 비교.", p: <path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16v-9" /> },
  { href: "/tools", t: "복리 계산기", d: "매달 얼마면 30년 뒤 얼마가 될까. 시간의 힘을 숫자로.", p: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { href: "/tax", t: "세금 가이드", d: "양도세·배당세·종합과세와 ISA·연금·IRP 절세계좌 순서.", p: <><path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h6" /></> },
];

function ResourceHub() {
  return (
    <section id="library">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">자료실 · 전부 무료</div>
          <h2>필요한 건 전부 사이트 안에 있어요</h2>
          <p>인덱스 투자와 ETF를 처음 공부하는 분이 ‘시작점’으로 삼을 수 있는 자료와 도구입니다. 다운로드도 가입도 필요 없어요.</p>
        </div>
        <div className="hub-grid">
          {HUB.map((h) => (
            <Link key={h.href} href={h.href} className="hubcard">
              <div className="kic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1915" strokeWidth="1.6">{h.p}</svg>
              </div>
              <h3>{h.t}</h3>
              <p>{h.d}</p>
              <div className="go">열어보기 →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Warren Buffett quote → 복리 계산기 ───────────────────────────────────────────
function BuffettQuote() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const i = imgRef.current;
    if (i && i.complete && i.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <section style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
      <div className="wrap">
        <div className="quotewrap">
          <span className="quote-face" title="public/buffett.jpg 에 사진을 넣으세요">
            <span className="quote-ph" aria-hidden>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5">
                <circle cx="12" cy="9" r="3.6" />
                <path d="M4.5 20.5c0-4.2 3.4-6.8 7.5-6.8s7.5 2.6 7.5 6.8" />
              </svg>
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} className={`quote-photo${loaded ? " on" : ""}`} src={SITE.buffettPhoto} alt="워런 버핏" onLoad={() => setLoaded(true)} />
          </span>
          <div className="quote-body">
            <div className="eyebrow">복리의 힘</div>
            <blockquote className="bigquote">
              “오늘 누군가 나무 그늘에서 쉴 수 있는 건, 아주 오래 전에 누군가 그 나무를 심었기 때문입니다.”
            </blockquote>
            <div className="quote-attr">워런 버핏 · 버크셔 해서웨이</div>
            <p className="quote-lead">
              일찍 시작해서 오래 두는 것만으로 돈이 스스로 불어납니다. 매달 얼마면 30년 뒤 얼마가 되는지, 직접 숫자로 확인해 보세요.
            </p>
            <Link className="btn btn-primary" href="/tools">복리 계산기 열어보기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Portfolio (real holdings, transparent, not a recommendation) ─────────────────
function PortfolioSection() {
  return (
    <section id="portfolio">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">투명하게 · 제 실제 포트폴리오</div>
          <h2>제 포트폴리오를 그대로 공개해요</h2>
          <p>
            화려한 비법이 아니라, 꾸준히 모은 결과예요. 제가 실제로 들고 있는 자산을 사실 그대로 보여드립니다.
            따라 사라는 추천이 아니라, ‘저는 이렇게 굴리고 있어요’라는 기록이에요.
          </p>
        </div>
        <div className="pf-stack">
          <NetWorthGraph />
          <PortfolioPie />
        </div>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 18, lineHeight: 1.6, maxWidth: 820 }}>
          실제 증권계좌 순자산(NLV) 기준이며 원화는 환율로 환산했습니다. 환율과 시세에 따라 수시로 바뀝니다.
          현금이 소폭 신용(−)이라 비중 합계가 100%를 조금 넘습니다. 특정 종목의 매수·매도 추천이 아니라 보유 현황의 사실 공유이며,
          투자 판단과 책임은 본인에게 있습니다.
        </p>
      </div>
    </section>
  );
}

// ── Benefits ──────────────────────────────────────────────────────────────────
function Benefits() {
  const benefits = [
    { t: "왕초보 눈높이", d: "용어부터 차근차근, 처음 시작하는 분도 따라올 수 있게.", p: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></> },
    { t: "한국 투자자 맞춤", d: "ISA·연금·IRP 등 한국 세금·계좌 현실에 맞춘 설명.", p: <><path d="M4 4h12l4 4v12H4z" /><path d="M8 12h8M8 16h6" /></> },
    { t: "복리 중심", d: "큰 한 방이 아니라, 시간과 꾸준함이 만드는 결과에 집중합니다.", p: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
    { t: "솔직한 기록", d: "성공만이 아니라 시행착오도, 제 포트폴리오도 가감 없이 공개합니다.", p: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
    { t: "원칙 중심", d: "종목 추천이 아니라, 흔들리지 않는 원칙을 함께 세웁니다.", p: <path d="M12 2 4 6v6c0 5 8 8 8 8s8-3 8-8V6z" /> },
    { t: "부담 없이", d: "가입도 다운로드도 없이, 필요한 정보를 사이트에서 바로 봅니다.", p: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  useEffect(() => {
    const i = imgRef.current;
    if (i && i.complete && i.naturalWidth > 0) setPhotoLoaded(true);
  }, []);
  return (
    <section id="about">
      <div className="wrap about">
        <div className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {!photoLoaded && <img src={SITE.avatar} alt="제이슨 일러스트" className="portrait-img" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={SITE.photo} alt="제이슨" className={`photo-img${photoLoaded ? " on" : ""}`} onLoad={() => setPhotoLoaded(true)} />
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
            이 사이트는 종목을 찍어주거나 수익을 보장하는 곳이 아니라, 흔들리지 않고 오래 투자하는 법과 한국 투자자에게 꼭 필요한
            세금·계좌 지식을 함께 공부하는 공간입니다.
          </p>
          <Channels />
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
    <section style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
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
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "정말 전부 무료인가요?", a: "네. 자료실(ETF 비교·세금 가이드·복리 계산기)을 포함한 모든 콘텐츠를 가입이나 다운로드 없이 사이트에서 바로 보실 수 있습니다." },
  { q: "투자 전문가인가요?", a: "아닙니다. 저는 금융투자업 인가를 받은 전문가가 아니라, 같은 길을 걷는 평범한 투자자입니다. 제 경험과 공부를 나눌 뿐, 종목 추천이나 리딩은 하지 않습니다." },
  { q: "종목을 추천해 주나요?", a: "하지 않습니다. 제 포트폴리오를 공개하는 것도 ‘이렇게 굴리고 있다’는 사실 공유일 뿐, 따라 사라는 추천이 아닙니다. 이 사이트는 ‘무엇을 사라’가 아니라 ‘어떻게 흔들리지 않고 오래 투자하느냐’에 집중합니다." },
  { q: "이건 투자 자문인가요?", a: "아닙니다. 모든 콘텐츠는 일반적인 금융·투자 교육 및 정보 제공 목적이며, 특정 종목 추천이나 투자자문이 아닙니다. 투자 판단과 책임은 본인에게 있습니다." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq">
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
function Community() {
  return (
    <section className="community-band">
      <div className="wrap">
        <div className="community-inner">
          <div className="eyebrow">커뮤니티 · 무료</div>
          <h2>혼자 하면 흔들려요. <span className="hl-together">같이 하면 오래 갑니다</span></h2>
          <p>
            제이슨의 머니쇼 디스코드는 종목 찍어주는 리딩방이 아니에요. 미국주식·ETF·절세·복리를 편하게 묻고,
            서로의 경험과 실수를 나누며 오래 투자하는 사람들의 모임입니다. 지금은 무료로 열려 있어요.
          </p>
          <div className="community-cta">
            <a className="btn-discord" href={DISCORD.invite} target="_blank" rel="noreferrer noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.25.5a14.6 14.6 0 0 1 4.3 1.4 16.6 16.6 0 0 0-14.9 0A14.6 14.6 0 0 1 8.85 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.9 8.6.14 12.7.5 16.7a19.9 19.9 0 0 0 6 3l.73-1a13 13 0 0 1-1.9-.9c.16-.12.32-.24.47-.36a14.2 14.2 0 0 0 12.4 0c.15.13.31.25.47.36-.6.36-1.24.66-1.9.9l.73 1a19.8 19.8 0 0 0 6-3c.43-4.6-.74-8.7-3.9-12.3ZM8.55 14.3c-1.16 0-2.12-1.07-2.12-2.38 0-1.31.94-2.38 2.12-2.38 1.19 0 2.14 1.08 2.12 2.38 0 1.31-.94 2.38-2.12 2.38Zm6.9 0c-1.16 0-2.12-1.07-2.12-2.38 0-1.31.94-2.38 2.12-2.38 1.19 0 2.14 1.08 2.12 2.38 0 1.31-.93 2.38-2.12 2.38Z" />
              </svg>
              디스코드 무료로 참여하기
            </a>
            <Link className="btn btn-ghost" href="/community">커뮤니티 살펴보기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta-final">
      <div className="wrap">
        <h2>오늘, 흔들리지 않는 투자를 함께 시작해요</h2>
        <p>복리의 힘과 ETF·세금의 기본기를 사이트에서 차근차근 익혀보세요. 부담은 전혀 없습니다.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/start">투자, 어떻게 시작할까</Link>
          <Link className="btn btn-ghost" href="/tools">복리 계산기 열기</Link>
        </div>
        <Channels center />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <a id="top" />
      <Nav active="/" />
      <Hero />
      <HonestBar />
      <ResourceHub />
      <Community />
      <BuffettQuote />
      <PortfolioSection />
      <Benefits />
      <About />
      <Promises />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
