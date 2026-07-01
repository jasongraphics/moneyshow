import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../_components/Nav";
import Footer from "../_components/Footer";
import { DISCORD } from "../lib/site";

export const metadata: Metadata = {
  title: "커뮤니티 · 흔들리지 않는 투자, 같이 공부해요",
  description:
    "제이슨의 머니쇼 디스코드. 종목 찍어주는 리딩방이 아니라, 투자·재테크 생각을 자유롭게 나누고 경제적 자유를 향한 각자의 여정을 함께 나누는 무료 커뮤니티입니다.",
  alternates: { canonical: "/community" },
};

function DiscordGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.25.5a14.6 14.6 0 0 1 4.3 1.4 16.6 16.6 0 0 0-14.9 0A14.6 14.6 0 0 1 8.85 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.9 8.6.14 12.7.5 16.7a19.9 19.9 0 0 0 6 3l.73-1a13 13 0 0 1-1.9-.9c.16-.12.32-.24.47-.36a14.2 14.2 0 0 0 12.4 0c.15.13.31.25.47.36-.6.36-1.24.66-1.9.9l.73 1a19.8 19.8 0 0 0 6-3c.43-4.6-.74-8.7-3.9-12.3ZM8.55 14.3c-1.16 0-2.12-1.07-2.12-2.38 0-1.31.94-2.38 2.12-2.38 1.19 0 2.14 1.08 2.12 2.38 0 1.31-.94 2.38-2.12 2.38Zm6.9 0c-1.16 0-2.12-1.07-2.12-2.38 0-1.31.94-2.38 2.12-2.38 1.19 0 2.14 1.08 2.12 2.38 0 1.31-.93 2.38-2.12 2.38Z" />
    </svg>
  );
}

// 위젯이 켜져 있으면 실시간 접속자 수를 가져옵니다. 꺼져 있으면 조용히 null.
async function getOnlineCount(): Promise<number | null> {
  try {
    const res = await fetch(`https://discord.com/api/guilds/${DISCORD.serverId}/widget.json`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { presence_count?: number };
    return typeof data.presence_count === "number" ? data.presence_count : null;
  } catch {
    return null;
  }
}

const TALK = [
  "첫 계좌·첫 ETF, 뭐부터 시작할지 서로의 경험 나누기",
  "ISA·연금저축·IRP 절세계좌 활용법 공유하기",
  "시장이 출렁일 때, 각자의 원칙과 마음가짐 나누기",
  "가계부·저축 인증하며 함께 습관 만들기",
  "경제적 자유를 향한 각자의 목표와 진행 상황 나누기",
];

const NOT = [
  "종목 찍어주는 리딩방이 아니에요",
  "‘무조건 오른다’·수익 보장은 없어요",
  "유료 1:1 상담을 하는 곳이 아니에요",
];

const RULES = [
  "이 서버는 투자·재테크를 함께 공부하고 경험을 나누는 교육 목적의 커뮤니티입니다.",
  "운영자는 자본시장법상 인가·등록된 투자자문업자가 아니며, 특정 종목 추천·실시간 리딩·수익 보장·1:1 개별 투자상담을 제공하지 않습니다.",
  "멤버가 올리는 글은 개인 의견·경험 공유일 뿐, 매수·매도 권유가 아닙니다.",
  "모든 투자 판단과 책임은 본인에게 있으며, 투자에는 원금 손실 위험이 있습니다.",
  "금지: 종목 리딩, ‘무조건 오른다’식 단정, 수익 보장, 유료 리딩방·사설방 홍보, 코인 펌핑·스캠, DM 유료상담 유도, 도배·광고.",
];

function JoinButton({ block = false }: { block?: boolean }) {
  return (
    <a
      className={`btn-discord${block ? " btn-block" : ""}`}
      href={DISCORD.invite}
      target="_blank"
      rel="noreferrer noopener"
    >
      <DiscordGlyph size={20} />
      디스코드 무료로 참여하기
    </a>
  );
}

export default async function CommunityPage() {
  const online = await getOnlineCount();

  return (
    <>
      <Nav active="/community" />

      <header className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">홈</Link><span className="sep">›</span><span>커뮤니티</span>
          </div>
          <h1>혼자 하면 흔들려요. <span className="hl-together">같이 하면 오래 갑니다</span></h1>
          <p className="lede">
            혼자 투자하면 작은 뉴스에도 마음이 흔들려요. 같은 목표를 가진 사람들과 생각을 나누면 훨씬 든든합니다.
            <strong> 종목을 찍어주는 곳이 아니라, 투자·재테크 생각을 자유롭게 나누고 경제적 자유를 향한 각자의 여정을
            함께 나누는 무료 디스코드</strong>예요.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <JoinButton />
            {online && online > 0 ? (
              <span className="community-live"><i className="dot" /> 지금 {online}명 접속 중</span>
            ) : null}
          </div>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 12 }}>지금은 무료로 열려 있어요. 부담 없이 들어와서 구경만 해도 괜찮아요.</p>
        </div>
      </header>

      {/* 이런 이야기를 나눠요 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">이런 이야기를 나눠요</div>
            <h2>왕초보도 부담 없이, 함께 나눠요</h2>
          </div>
          <ul className="community-list" style={{ maxWidth: 720 }}>
            {TALK.map((t) => (
              <li key={t}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e7a52" strokeWidth="2.4" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 이런 곳은 아니에요 (컴플라이언스) */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)", borderBottom: "1px solid var(--hair)" }}>
        <div className="wrap">
          <div className="callout green" style={{ maxWidth: 720, marginTop: 0 }}>
            <div className="ct">이런 곳은 아니에요</div>
            <ul style={{ margin: "6px 0 0", paddingLeft: 0, listStyle: "none", display: "grid", gap: 9 }}>
              {NOT.map((t) => (
                <li key={t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span aria-hidden style={{ color: "#c0392b", fontWeight: 800, lineHeight: 1.4 }}>✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p style={{ margin: "12px 0 0", fontSize: 13.5, color: "var(--ink2)" }}>
              여기는 정답을 파는 곳이 아니라, 같이 공부하는 곳이에요.
            </p>
          </div>
        </div>
      </section>

      {/* 운영 원칙 */}
      <section className="rsec">
        <div className="wrap">
          <div className="rhead">
            <div className="eyebrow">운영 원칙</div>
            <h2>모두가 안심하고 쓰도록</h2>
            <p>모두를 지키기 위한 약속이에요. 참여하면 아래에 동의하는 것으로 봅니다.</p>
          </div>
          <ol className="community-rules" style={{ maxWidth: 760 }}>
            {RULES.map((r, i) => (
              <li key={i}><span className="rn">{i + 1}</span><span>{r}</span></li>
            ))}
          </ol>
          <p className="tfoot-note" style={{ maxWidth: 760, marginTop: 16 }}>
            본 커뮤니티의 모든 콘텐츠는 일반적인 금융·투자 교육 및 정보 제공 목적이며, 특정 종목의 매수·매도 권유나
            개별 투자자문이 아닙니다. 투자에는 원금 손실 가능성이 있고 수익을 보장하지 않으며, 최종 판단과 책임은
            투자자 본인에게 있습니다.
          </p>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="rsec tight" style={{ background: "var(--paper2)", borderTop: "1px solid var(--hair)" }}>
        <div className="wrap" style={{ maxWidth: 520, textAlign: "center" }}>
          <h2 style={{ marginBottom: 8 }}>같이 공부할 준비 됐나요?</h2>
          <p className="muted" style={{ fontSize: 14, marginBottom: 20 }}>무료예요. 들어와서 인사만 남겨도 좋아요.</p>
          <JoinButton block />
        </div>
      </section>

      <Footer />
    </>
  );
}
