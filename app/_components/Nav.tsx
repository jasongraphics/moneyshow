"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE, NAV, CHANNELS } from "../lib/site";
import SiteFonts from "./SiteFonts";

function YouTubeGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#e23b2e"
        d="M23 12s0-3.7-.46-5.46a2.78 2.78 0 0 0-1.94-1.94C18.84 4.13 12 4.13 12 4.13s-6.84 0-8.6.47A2.78 2.78 0 0 0 1.46 6.54C1 8.3 1 12 1 12s0 3.7.46 5.46a2.78 2.78 0 0 0 1.94 1.94c1.76.47 8.6.47 8.6.47s6.84 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.94C23 15.7 23 12 23 12Z"
      />
      <path fill="#fff" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#c1399a" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="#c1399a" stroke="none" />
    </svg>
  );
}

const ChannelIcon = ({ type }: { type: "youtube" | "instagram" }) =>
  type === "youtube" ? <YouTubeGlyph size={20} /> : <InstagramGlyph size={18} />;

function Avatar({ className = "" }: { className?: string }) {
  return (
    <span className={`avatar-circle ${className}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={SITE.avatar} alt="" />
    </span>
  );
}

/** Shared sticky top nav for every page (landing + 자료실). */
export default function Nav({ active }: { active?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <>
    <SiteFonts />
    <header className="nav" id="topnav">
      <div className="wrap nav-in">
        <Link href="/" className="brand brand-row" onClick={close}>
          <Avatar className="avatar-sm" />
          <span className="brand-text">제이슨의 머니쇼<small>JASON&apos;S MONEY SHOW</small></span>
        </Link>
        <nav className="nav-links">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className={active === l.href ? "is-active" : ""} onClick={close}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <span className="nav-social">
            {CHANNELS.map((c) => (
              <a key={c.type} href={c.href} target="_blank" rel="noreferrer noopener" aria-label={`${c.label} ${c.handle}`} title={`${c.label} ${c.handle}`}>
                <ChannelIcon type={c.type} />
              </a>
            ))}
          </span>
          <Link className="btn btn-primary" href="/start">시작하기</Link>
          <button
            className="hamb"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 보기"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "닫기" : "메뉴보기"}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="mm-link" onClick={close}>
              {l.label}
            </Link>
          ))}
          <div className="mm-cta">
            <Link className="btn btn-primary btn-block" href="/start" onClick={close}>
              시작하기
            </Link>
            <div className="channels" style={{ marginTop: 4 }}>
              {CHANNELS.map((c) => (
                <a key={c.type} className="ch" href={c.href} target="_blank" rel="noreferrer noopener" onClick={close}>
                  <ChannelIcon type={c.type} />
                  <span className="ch-l">{c.label}</span>
                  <span className="ch-h">{c.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
