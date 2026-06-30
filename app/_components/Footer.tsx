import Link from "next/link";
import { SITE, DISCLAIMER } from "../lib/site";

/** Shared footer with the compliant disclaimer. Server component. */
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-col brand-col">
            <div className="brand" style={{ fontSize: 18, marginBottom: 8 }}>제이슨의 머니쇼</div>
            <p className="muted" style={{ fontSize: 13.5 }}>
              흔들리지 않는 장기투자, 한국 투자자를 위한 미국주식·ETF·절세 이야기.
            </p>
          </div>
          <div className="foot-col">
            <h5>자료실</h5>
            <Link href="/start">시작하기</Link>
            <Link href="/etfs">ETF 자료실</Link>
            <Link href="/tools">계산기</Link>
            <Link href="/tax">세금 가이드</Link>
          </div>
          <div className="foot-col">
            <h5>더 보기</h5>
            <Link href="/#portfolio">포트폴리오</Link>
            <Link href="/#about">소개</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="foot-col">
            <h5>채널</h5>
            <a href={SITE.youtube} target="_blank" rel="noreferrer noopener">YouTube</a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer noopener">Instagram</a>
            <Link href="/#faq">FAQ</Link>
          </div>
        </div>
        <div className="disclaimer">
          {SITE.contactEmail ? (
            <>문의: <a href={`mailto:${SITE.contactEmail}`} style={{ textDecoration: "underline" }}>{SITE.contactEmail}</a><br /><br /></>
          ) : (
            <>문의는 유튜브·인스타그램 채널 메시지로 받습니다.<br /><br /></>
          )}
          {DISCLAIMER} © 2026 제이슨의 머니쇼.
        </div>
      </div>
    </footer>
  );
}
