import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 카카오톡·X·스레드·iMessage 등에서 공유될 때 보이는 커버 이미지(1200×630).
// 한국어 폰트(Gowun Batang)를 빌드 시점에 불러와 텍스트가 깨지지 않게 합니다.

export const runtime = "nodejs";
export const alt = "제이슨의 머니쇼 · 흔들리지 않는 투자 · 미국주식·ETF·절세 무료 자료실";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT =
  "미국주식 ETF 절세 복리 흔들리지 않는 투자 제이슨의 머니쇼 한국 투자자를 위한 무료 자료실 비교 세금 가이드 계산기 절세계좌 · moneyshow-hazel.vercel.app";

async function loadGowun(weight: 400 | 700): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@${weight}&text=${encodeURIComponent(TEXT)}`;
  const css = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 5.1)" } })).text();
  const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!m) throw new Error("Gowun Batang font fetch failed");
  const res = await fetch(m[1]);
  if (!res.ok) throw new Error("Gowun Batang font download failed");
  return res.arrayBuffer();
}

const CHIPS = ["ETF 비교", "세금 가이드", "복리 계산기", "절세계좌"];

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([loadGowun(700), loadGowun(400)]);

  let avatar: string | null = null;
  try {
    const buf = await readFile(join(process.cwd(), "app", "icon.png"));
    avatar = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    avatar = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "Gowun Batang",
        }}
      >
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 27, fontWeight: 700, color: "#0e7a52" }}>
          <div style={{ width: 46, height: 4, background: "#0e7a52", display: "flex" }} />
          미국주식 · ETF · 절세 · 복리
        </div>

        {/* headline + sub */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: "#16181a", lineHeight: 1.1, letterSpacing: -2 }}>
            흔들리지 않는 투자
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#3c4044", marginTop: 22, lineHeight: 1.4 }}>
            제이슨의 머니쇼 · 한국 투자자를 위한 무료 자료실
          </div>
          {/* content chips */}
          <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
            {CHIPS.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  fontSize: 25,
                  fontWeight: 700,
                  color: "#0e7a52",
                  border: "2px solid #cfe3d8",
                  background: "#f1f8f4",
                  borderRadius: 999,
                  padding: "10px 22px",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* footer: avatar + wordmark + url */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} width={72} height={72} style={{ borderRadius: 999, border: "1px solid #e7e8e7" }} alt="" />
            ) : null}
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#16181a" }}>제이슨의 머니쇼</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#868b90", fontWeight: 700 }}>moneyshow-hazel.vercel.app</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Gowun Batang", data: bold, weight: 700, style: "normal" },
        { name: "Gowun Batang", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}
