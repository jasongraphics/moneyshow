"use client";

import { useState } from "react";

const faqs = [
  {
    q: "엑셀이 꼭 있어야 하나요?",
    a: "아니요. 구글 시트(무료)로 바로 쓸 수 있어요. 구매하시면 ‘사본 만들기’ 링크를 드리고, 누르면 내 구글 드라이브에 내 사본이 생깁니다. 엑셀에서도 열려요.",
  },
  {
    q: "모바일에서도 쓸 수 있나요?",
    a: "네. 구글 시트 앱에서 열고 입력할 수 있어요. 다만 표가 넓어서, 처음 설정과 표 보기는 PC가 더 편합니다.",
  },
  {
    q: "항목이 제 상황과 안 맞으면요?",
    a: "내 사본이라 카테고리·항목 이름·행 개수까지 모두 자유롭게 바꿀 수 있어요. ‘설정’ 시트에서 한 번만 고치면 12개월에 자동 반영됩니다.",
  },
  {
    q: "한 번 사면 계속 쓰나요?",
    a: "네. 한 번 결제로 받은 사본은 평생 내 것입니다. 2026년 기준으로 만들었지만, 연도와 항목만 바꾸면 이후에도 계속 쓸 수 있어요.",
  },
  {
    q: "환불이 되나요?",
    a: "디지털 상품 특성상, 링크를 받아 사본을 만든 뒤에는 단순 변심에 의한 환불은 어렵습니다. 다만 파일이 열리지 않거나 중대한 문제가 있으면 꼭 도와드릴게요.",
  },
];

export default function BudgetFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <div key={i} className={`qa${openIdx === i ? " open" : ""}`}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            {f.q}
            <span className="pm">+</span>
          </button>
          <div className="ans">{f.a}</div>
        </div>
      ))}
    </div>
  );
}
