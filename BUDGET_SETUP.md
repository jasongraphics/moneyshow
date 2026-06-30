# 가계부 상품 런칭 체크리스트

`/budget` 랜딩 + Stripe 결제 + 구글시트 자동 전달이 코드로 준비돼 있습니다.
아래 4가지만 채우면 "결제 준비 중" 버튼이 "구매하기"로 자동으로 바뀝니다.
키는 코드가 아니라 **Vercel 환경변수**로 넣으세요 (절대 깃에 커밋 금지).

---

## 1) 구글 시트 준비 (전달용 원본)

1. `제이슨의 머니쇼 가계부 2026.xlsx` (프로젝트 폴더에 있음)를 구글 드라이브에 업로드.
2. 더블클릭 → **구글 스프레드시트로 열기**. 차트·드롭다운·₩서식이 자동 변환됩니다.
   한 번 쭉 훑어보고, 어색한 항목은 **'설정' 시트**에서 이름만 고치면 12개월에 자동 반영돼요.
3. 이 시트는 **원본(마스터)** 입니다. 구매자에겐 '사본'이 가므로 원본은 그대로 보관하세요.
4. 우측 상단 **공유 → '링크가 있는 모든 사용자' → 권한: 뷰어(Viewer)**.
5. 시트 URL의 끝부분 `/edit...` 을 **`/copy`** 로 바꾼 주소를 복사:
   `https://docs.google.com/spreadsheets/d/<시트ID>/copy`
   → 이게 **`BUDGET_SHEET_COPY_URL`** 입니다. (누르면 구매자 드라이브에 사본이 생겨요.)

## 2) Stripe 상품·가격 만들기

1. dashboard.stripe.com → **Product catalog → 상품 추가**
   - 이름: `제이슨의 머니쇼 가계부 2026`
   - 가격: **12,000 KRW**, **One-time(일회성)**
   - ⚠️ 내 Stripe 계정이 **KRW 결제**를 지원하는지 확인하세요. 안 되면 USD로 설정해도 됩니다(가격 라벨은 `app/lib/product.ts`에서 수정).
2. 만들어진 **Price ID**(`price_...`) 복사 → `STRIPE_PRICE_ID`
3. Developers → API keys → **Secret key**(`sk_live_...`, 테스트는 `sk_test_...`) 복사 → `STRIPE_SECRET_KEY`

## 3) Vercel 환경변수 넣기

프로젝트 → Settings → **Environment Variables** (Production):

| 이름 | 값 |
| --- | --- |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_PRICE_ID` | `price_...` |
| `BUDGET_SHEET_COPY_URL` | `https://docs.google.com/spreadsheets/d/<ID>/copy` |
| `STRIPE_WEBHOOK_SECRET` (선택) | `whsec_...` |

저장 후 **Redeploy** 하면 버튼이 활성화됩니다.

## 4) (선택) 웹훅 — 나중에 이메일 자동발송 등

Stripe → Developers → Webhooks → Add endpoint
- URL: `https://<도메인>/api/stripe/webhook`
- Event: `checkout.session.completed`
- 생성된 Signing secret → `STRIPE_WEBHOOK_SECRET`

지금은 결제 후 **/budget/success** 페이지(서버에서 결제검증)에서 사본 링크를 전달하므로 웹훅 없이도 작동합니다.

---

## 테스트 순서
1. 먼저 **테스트 키**(`sk_test_`, 테스트 Price)로 환경변수 설정 → 구매 버튼 → 테스트카드 `4242 4242 4242 4242` 결제.
2. `/budget/success` 에서 **사본 만들기** 링크가 나오는지 확인.
3. 정상이면 **라이브 키**로 교체.

## 한국 온라인 판매 — 법무 체크 (직접 확인 필요)
- **통신판매업 신고** 및 사업자정보(상호·대표·연락처·신고번호) 표기 의무가 있을 수 있어요. 개인이라도 일정 거래 규모면 필요. 확인 권장.
- **현금영수증/세금계산서**: Stripe는 한국 현금영수증을 발급하지 않습니다. 필요하면 별도 처리.
- **환불**: 디지털 콘텐츠라 '사본 전달 후 단순변심 환불 제한'을 페이지 FAQ·면책에 고지해 두었습니다.

> 참고: 원본 가계부는 처음부터 **새로 만든 오리지널**입니다. 업로드하셨던 `@alexonabudget` 템플릿(개인용·재판매 금지)은 사용하지 않았고, 깃에 커밋되지 않도록 `.gitignore` 처리했습니다.
