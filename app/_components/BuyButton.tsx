"use client";

import { useState } from "react";

// 구매 버튼. 클릭하면 /api/checkout 에서 Stripe 결제 세션을 만들고 그 주소로 이동합니다.
// enabled=false (아직 Stripe 키 미설정) 이면 '준비 중'으로 표시돼 에러 없이 동작합니다.
export default function BuyButton({
  enabled,
  priceLabel,
  className = "btn btn-primary btn-block",
}: {
  enabled: boolean;
  priceLabel: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!enabled) {
    return (
      <div>
        <button className={className} disabled aria-disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
          결제 준비 중
        </button>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 8, textAlign: "center" }}>
          결제 시스템을 준비하고 있어요. 곧 열립니다.
        </p>
      </div>
    );
  }

  async function buy() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setErr(data.error || "결제를 시작하지 못했어요. 잠시 후 다시 시도해 주세요.");
    } catch {
      setErr("네트워크 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
    setLoading(false);
  }

  return (
    <div>
      <button className={className} onClick={buy} disabled={loading}>
        {loading ? "결제창으로 이동 중…" : `${priceLabel} · 바로 구매하기`}
      </button>
      {err && (
        <p style={{ fontSize: 12.5, marginTop: 8, textAlign: "center", color: "#c0392b" }}>{err}</p>
      )}
    </div>
  );
}
