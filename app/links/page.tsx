import type { Metadata } from "next";
import { SITE, DISCLAIMER } from "../lib/site";

export const metadata: Metadata = {
  title: { absolute: "제이슨의 머니쇼 · 링크" },
  description: "흔들리지 않는 투자. 미국주식·ETF·절세 무료 자료실과 채널 모음.",
};

// X(트위터)식 인증 배지
const Verified = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" aria-label="인증됨" style={{ flex: "0 0 auto" }}>
    <path
      fill="#1d9bf0"
      d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z"
    />
    <path fill="#fff" d="m9.5 15.78-3.28-3.28 1.06-1.06 2.22 2.22 4.72-4.72 1.06 1.06z" />
  </svg>
);

const YTMono = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" aria-hidden>
    <path fill="#111" d="M23 12s0-3.7-.46-5.46a2.78 2.78 0 0 0-1.94-1.94C18.84 4.13 12 4.13 12 4.13s-6.84 0-8.6.47A2.78 2.78 0 0 0 1.46 6.54C1 8.3 1 12 1 12s0 3.7.46 5.46a2.78 2.78 0 0 0 1.94 1.94c1.76.47 8.6.47 8.6.47s6.84 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.94C23 15.7 23 12 23 12Z" />
    <path fill="#fff" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const IGMono = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5.2" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="#111" stroke="none" />
  </svg>
);

export default function LinksPage() {
  return (
    <main className="lt-wrap">
      <div className="lt-inner">
        <span className="avatar-circle lt-ava" style={{ width: 104, height: 104 }} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.avatar} alt="제이슨의 머니쇼" />
        </span>

        <div className="lt-name">제이슨의 머니쇼 <Verified /></div>
        <p className="lt-tag">
          흔들리지 않는 투자, 함께 공부해요.<br />
          미국주식 · ETF · 절세 · 복리
        </p>

        <nav className="lt-links">
          <a className="lt-btn primary" href="/">흔들리지 않는 투자 · 무료 자료실</a>
          <a className="lt-btn ghost" href={SITE.youtube} target="_blank" rel="noreferrer noopener">
            유튜브 · 제이슨의 머니쇼
          </a>
        </nav>

        <div className="lt-socials">
          <a href={SITE.youtube} target="_blank" rel="noreferrer noopener" aria-label="YouTube"><YTMono /></a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram"><IGMono /></a>
        </div>

        <div className="lt-foot">
          <strong className="lt-foot-h">투자 유의사항 · 면책 고지</strong>
          {DISCLAIMER}
          <span className="lt-foot-c">© 2026 제이슨의 머니쇼 · 문의는 유튜브·인스타그램 채널로</span>
        </div>
      </div>
    </main>
  );
}
