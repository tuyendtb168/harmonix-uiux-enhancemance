# Lộ trình học "AI-native": Xây dựng công ty vận hành bằng AI cho đội ngũ Harmonix

> **Mục tiêu:** Giúp một đội nhỏ (3–6 dev) tại Harmonix (sản phẩm DeFi vault/yield) hiểu **AI-native** thực sự nghĩa là gì, cách biến vận hành công ty thành một cỗ máy tự động 99% (con người chỉ duyệt các cổng quan trọng), và cách thiết kế một sản phẩm agentic. Đọc/xem cùng nhau, thảo luận, rồi thống nhất nhận thức chung trước khi lên kế hoạch pivot.
>
> **Cách dùng:** Lộ trình 3 tuần, mỗi tuần 2–4 tài nguyên, tổng ~2–4 giờ/tuần (vừa sức một dev đang đi làm). Mỗi tuần kết thúc bằng vài câu hỏi "áp dụng vào Harmonix" để cả nhóm cùng thảo luận.
>
> **Quy ước độ khó:** `intro` = nhập môn, không cần nền tảng ML. `intermediate` = cần chút kiến thức kỹ thuật/agent.
>
> **Lưu ý về nguồn:** Ưu tiên nguồn canonical, chất lượng cao, mới (2024–2026). Tên tài nguyên giữ nguyên tiếng Anh. Các URL đã được kiểm tra là còn sống và đúng nội dung tại thời điểm biên soạn (07/2026).

---

## TUẦN 1 — NỀN TẢNG: "AI-native" thực sự là gì? (~3 giờ)

Mục tiêu tuần này: cả nhóm hiểu **sự khác biệt giữa công ty DÙNG AI (bolt-on) và công ty AI-native** (AI là "công nhân mặc định", con người giám sát/duyệt), và cảm nhận được sự thay đổi về mô hình kinh doanh (bán *kết quả công việc*, không bán *phần mềm*).

### 1.1 — The seven operating truths of AI-native companies
- **Nguồn / tác giả:** McKinsey (Business Building)
- **URL:** https://www.mckinsey.com/capabilities/business-building/our-insights/the-seven-operating-truths-of-ai-native-companies
- **Vì sao quan trọng:** Định nghĩa rõ ràng và có hệ thống về công ty AI-native — không phải "gắn thêm AI" mà là *tái cấu trúc cách công việc được làm*, cắt đứt mối liên hệ giữa tăng trưởng doanh thu và tăng trưởng headcount. Là điểm khởi đầu chung để cả nhóm có cùng từ vựng.
- **Thời gian:** ~20 phút đọc
- **Độ khó:** intro

### 1.2 — Software Is Changing (Again) / "Software 3.0" — Andrej Karpathy (talk tại YC AI Startup School 2025)
- **Nguồn / tác giả:** Andrej Karpathy (cựu Tesla/OpenAI)
- **URL (video):** https://www.youtube.com/watch?v=LCEmiRjPEtQ
- **URL (bản ghi chú kèm slide):** https://www.latent.space/p/s3
- **Vì sao quan trọng:** Bài nói nền tảng của kỷ nguyên AI. Giới thiệu khái niệm **"autonomy slider"** (thanh trượt mức tự chủ) và ý tưởng "lập trình bằng tiếng Anh". Đây là mental model cốt lõi: con người chọn mức tự chủ cho AI tùy ngữ cảnh — chính là xương sống của mọi thiết kế "human-in-the-loop" mà chúng ta sẽ dùng ở Harmonix.
- **Thời gian:** ~40 phút xem (hoặc ~15 phút đọc bản ghi chú)
- **Độ khó:** intro

### 1.3 — AI startups: Sell work, not software — Sarah Tavel
- **Nguồn / tác giả:** Sarah Tavel (Benchmark)
- **URL:** https://www.sarahtavel.com/p/ai-startups-sell-work-not-software
- **Vì sao quan trọng:** Chuyển tư duy từ "bán công cụ giúp năng suất +10%" sang "tự làm ra kết quả công việc và bán kết quả đó". Đây là câu hỏi chiến lược trực tiếp cho Harmonix: sản phẩm AI-native của chúng ta bán *outcome* gì (ví dụ: yield được tối ưu, báo cáo NAV chính xác) thay vì bán một dashboard?
- **Thời gian:** ~15 phút đọc
- **Độ khó:** intro

### 1.4 — AI-Native Firms Lead In Revenue Per Employee (+ Tiny Teams Revolution)
- **Nguồn / tác giả:** Forbes (Paul Baier) — kèm case study Midjourney
- **URL:** https://www.forbes.com/sites/paulbaier/2026/03/31/ai-native-firms-lead-in-revenue-per-employee/
- **URL bổ sung (case Midjourney ~11 người, $200M doanh thu):** https://byteiota.com/tiny-teams-revolution-11-person-midjourney-hits-200m/
- **Vì sao quan trọng:** Bằng chứng cụ thể rằng đội siêu nhỏ + AI có thể đạt hiệu quả gấp hàng chục lần (Midjourney ~$18M doanh thu/nhân viên; Cursor đạt $100M ARR với <20 người). Đúng bối cảnh của Harmonix: một đội 3–6 dev có thể làm được nhiều hơn tưởng tượng.
- **Thời gian:** ~15 phút đọc cả hai
- **Độ khó:** intro

### Câu hỏi áp dụng vào Harmonix — Tuần 1 (thảo luận nhóm)
1. Liệt kê 5 việc mà Harmonix hiện đang làm "kiểu bolt-on" (dùng AI như công cụ phụ). Nếu tái thiết kế **AI-native từ đầu**, quy trình nào sẽ do AI làm mặc định và con người chỉ *duyệt*?
2. Theo tư duy "sell work, not software" — sản phẩm AI-native của Harmonix sẽ bán **kết quả** gì cho người dùng/đối tác (ví dụ: tối ưu yield tự động, cảnh báo rủi ro NAV, phân bổ point minh bạch)?
3. Nếu áp "autonomy slider" của Karpathy vào vận hành vault: những thao tác nào nên để AI *tự chạy hoàn toàn*, thao tác nào cần *human approve*, thao tác nào tuyệt đối *chỉ con người làm*? Vẽ thử một bảng 3 cột.
4. Nếu Harmonix phải đạt "doanh thu/nhân viên" gấp 10 lần hiện tại, đâu là 3 quy trình tốn người nhất phải tự động hóa trước?

---

## TUẦN 2 — ỨNG DỤNG & CHIỀU SÂU: Agent, agentic workflow, và tự động hóa vận hành (~4 giờ)

Mục tiêu tuần này: hiểu **agent thực sự hoạt động thế nào** (vòng lặp agent, tool use), phân biệt **workflow vs agent**, và học các **pattern human-in-the-loop** để biến vận hành thành cỗ máy 99% tự động.

### 2.1 — Building Effective AI Agents — Anthropic
- **Nguồn / tác giả:** Anthropic (Engineering/Research, 12/2024)
- **URL:** https://www.anthropic.com/research/building-effective-agents
- **Vì sao quan trọng:** Tài liệu canonical, cực kỳ thực dụng. Phân biệt rõ **workflow** (LLM + tool chạy theo đường dẫn code định sẵn) và **agent** (LLM tự điều hướng quy trình và tool của nó). Nguyên tắc vàng: *bắt đầu đơn giản nhất có thể, chỉ thêm "agency" khi tính linh hoạt xứng đáng với chi phí/độ trễ/sai số cộng dồn.* Đây là kim chỉ nam để tránh over-engineer.
- **Thời gian:** ~30 phút đọc
- **Độ khó:** intermediate

### 2.2 — A Practical Guide to Building Agents — OpenAI
- **Nguồn / tác giả:** OpenAI (PDF, 34 trang)
- **URL:** https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf
- **Vì sao quan trọng:** Cẩm nang cho đội product/engineering lần đầu xây agent: **khi nào nên tạo agent**, design pattern (single vs multi-agent), và đặc biệt là **guardrails** (rào chắn an toàn). Bổ sung góc nhìn thứ hai bên cạnh Anthropic — rất quan trọng với DeFi nơi sai một thao tác = mất tiền thật.
- **Thời gian:** ~40 phút đọc (có thể đọc lướt phần guardrails kỹ hơn)
- **Độ khó:** intermediate

### 2.3 — Human-in-the-Loop AI Agents: How to Design Approval Workflows for Safe and Scalable Automation — StackAI
- **Nguồn / tác giả:** StackAI (Insights)
- **URL:** https://www.stackai.com/insights/human-in-the-loop-ai-agents-how-to-design-approval-workflows-for-safe-and-scalable-automation
- **Vì sao quan trọng:** Đi thẳng vào pattern thực chiến: **phân loại hành động theo mức rủi ro**, đặt checkpoint duyệt, quy tắc escalation, và nguyên tắc "hybrid autonomy" — *tự động hóa việc thường quy, chặn tại các quyết định tác động cao và đẩy cho con người có thẩm quyền override*. Chính là mô hình "99% tự động, người duyệt cổng quan trọng" mà founder muốn.
- **Thời gian:** ~20 phút đọc
- **Độ khó:** intermediate

### 2.4 — Writing effective tools for AI agents — Anthropic
- **Nguồn / tác giả:** Anthropic (Engineering)
- **URL:** https://www.anthropic.com/engineering/writing-tools-for-agents
- **Vì sao quan trọng:** Agent chỉ mạnh bằng các **tool** nó gọi. Bài này dạy cách thiết kế tool tốt (namespacing, tránh tool trùng lặp làm agent lạc hướng). Với Harmonix, "tool" chính là các hàm agent gọi để đọc NAV, truy vấn on-chain, gọi API đối tác, đẩy báo cáo — thiết kế tool tốt = agent đáng tin cậy.
- **Thời gian:** ~25 phút đọc
- **Độ khó:** intermediate

### Câu hỏi áp dụng vào Harmonix — Tuần 2 (thảo luận nhóm)
1. Chọn một quy trình vận hành cụ thể (ví dụ **cập nhật NAV** hoặc **phân phối point**). Nó nên là **workflow** (đường dẫn cố định) hay **agent** (tự điều hướng)? Vì sao? Vẽ vòng lặp của nó.
2. Liệt kê các **tool** mà một "ops agent" của Harmonix sẽ cần (đọc on-chain, gọi API partner, query TVL/APY, gửi Slack/Discord, tạo report). Đặt tên theo namespacing như Anthropic gợi ý.
3. Áp bảng **phân loại rủi ro** của StackAI vào các thao tác vault: thao tác nào "auto", thao tác nào "cần 1 người duyệt", thao tác nào "cần multisig/nhiều người"? (Gợi ý: rebalance quỹ, đổi tham số chiến lược, whitelist token, chi trả reward.)
4. Với mỗi cổng "human approve", con người cần **thông tin gì** để duyệt trong 30 giây thay vì phải điều tra 30 phút? Thiết kế nội dung của một "approval card".
5. Rủi ro lớn nhất khi để agent chạm vào tiền/hợp đồng thông minh là gì, và guardrail nào (theo OpenAI) sẽ chặn nó?

---

## TUẦN 3 — TỔNG HỢP: Build fast, distribution, và ghép mọi thứ lại (~3.5 giờ)

Mục tiêu tuần này: nắm **văn hóa build/ship/fail fast** thời AI, hiểu **phân phối (distribution)** cho sản phẩm AI-native, xem thêm **case study** đội nhỏ làm nhiều, rồi cả nhóm phác thảo tầm nhìn AI-native cho Harmonix.

### 3.1 — Vibe coding & YC: đội 10 kỹ sư làm việc của 50–100 người
- **Nguồn / tác giả:** TechCrunch (dựa trên phát biểu của Garry Tan, YC) + Forbes
- **URL (TechCrunch):** https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/
- **URL (Forbes, bối cảnh rộng hơn):** https://www.forbes.com/sites/josipamajic/2025/05/18/y-combinators-ai-revolution-and-the-rise-startups-built-by-vibe-coding/
- **Vì sao quan trọng:** ~25% startup batch gần nhất của YC có codebase ≥95% do AI sinh. AI làm sập thời gian build → **prototype nhanh, ship thử nghiệm nhỏ, học từ người dùng thật**. *Cảnh báo kèm theo:* 45% code do AI sinh có lỗ hổng bảo mật (Veracode) — nên với DeFi, kỹ năng *đọc và review code AI* là bắt buộc, không phải tùy chọn.
- **Thời gian:** ~20 phút đọc
- **Độ khó:** intro

### 3.2 — AI startups: go-to-market & distribution (a16z)
- **Nguồn / tác giả:** Andreessen Horowitz (a16z)
- **URL (hub AI + báo cáo chi tiêu ứng dụng AI):** https://a16z.com/the-ai-application-spending-report-where-startup-dollars-really-go/
- **URL (tổng quan AI for startups):** https://a16z.com/ai-for-startups/
- **Vì sao quan trọng:** Distribution là yếu tố sống còn. a16z chỉ ra sản phẩm AI-native thắng nhờ **tốc độ đổi mới** và việc "trận chiến adoption diễn ra ngay bên trong các công cụ người dùng đang dùng" (không phải qua nền tảng mới). Với Harmonix: người dùng DeFi đã ở đâu (Discord, X, aggregator, ví)? Phân phối built-in nằm ở đó.
- **Thời gian:** ~25 phút đọc
- **Độ khó:** intro → intermediate

### 3.3 — Case study: công ty AI-native đội nhỏ bán *outcome*
- **Nguồn / tác giả:** TechCrunch (14.ai) + Forbes (AI-native agencies)
- **URL (14.ai — thay thế đội support bằng AI):** https://techcrunch.com/2026/03/02/a-married-founder-duos-company-14-ai-is-replacing-customer-support-teams-at-startups/
- **URL (AI-native agencies bán outcome, không bán phần mềm):** https://www.forbes.com/sites/josipamajic/2026/04/21/ai-native-agencies-sell-outcomes-not-software-and-investors-are-paying-attention/
- **Vì sao quan trọng:** Case study mới (2026) về đội cực nhỏ vận hành như một "AI-native agency" — kết hợp phần mềm + dịch vụ, bán kết quả (support được xử lý, hợp đồng được review) theo đơn giá cố định. Mô hình định giá này rất đáng để Harmonix suy nghĩ cho sản phẩm yield.
- **Thời gian:** ~20 phút đọc
- **Độ khó:** intro

### 3.4 — (Tùy chọn, đọc nhanh) Effective context engineering for AI agents — Anthropic
- **Nguồn / tác giả:** Anthropic (Engineering)
- **URL:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- **Vì sao quan trọng:** Khi bắt tay xây agent thật, "context engineering" (đưa đúng thông tin vào cửa sổ ngữ cảnh của agent) quyết định độ tin cậy. Đọc lướt để biết tồn tại, quay lại khi implement.
- **Thời gian:** ~15 phút đọc lướt
- **Độ khó:** intermediate

### Câu hỏi áp dụng vào Harmonix — Tuần 3 (thảo luận nhóm & phác thảo pivot)
1. Chọn **một thử nghiệm nhỏ có thể ship trong 1 tuần** để chứng minh giá trị AI-native (ví dụ: agent tự soạn báo cáo NAV hằng ngày kèm phần con người duyệt). MVP nhỏ nhất là gì?
2. Với DeFi, phần code nào **tuyệt đối không** được "vibe code" mà không review kỹ (smart contract, xử lý fund)? Đặt ra quy tắc review cho code do AI sinh.
3. **Distribution:** Người dùng/đối tác của Harmonix đang tụ tập ở đâu? Sản phẩm AI-native có thể có phân phối *built-in* qua kênh nào (tích hợp vào ví, aggregator, bot Discord/Telegram, chia sẻ báo cáo công khai)?
4. Nhìn lại cả 3 tuần: viết **một câu định nghĩa** "Harmonix phiên bản AI-native" trông như thế nào sau 12 tháng. AI làm mặc định việc gì, con người duyệt việc gì, và chúng ta bán *outcome* gì?

---

## Bảng tổng hợp nguồn (Top sources)

| # | Tài nguyên | Nguồn | Chủ đề | Độ khó |
|---|-----------|-------|--------|--------|
| 1 | The seven operating truths of AI-native companies | McKinsey | Định nghĩa AI-native | intro |
| 2 | Software Is Changing (Again) / Software 3.0 | Andrej Karpathy | Mental model, autonomy slider | intro |
| 3 | AI startups: Sell work, not software | Sarah Tavel | Mô hình kinh doanh AI-native | intro |
| 4 | AI-Native Firms Lead In Revenue Per Employee + Midjourney | Forbes / ByteIota | Đội nhỏ làm nhiều | intro |
| 5 | Building Effective AI Agents | Anthropic | Agent vs workflow | intermediate |
| 6 | A Practical Guide to Building Agents | OpenAI | Design pattern + guardrails | intermediate |
| 7 | Human-in-the-Loop Approval Workflows | StackAI | Pattern duyệt/rủi ro | intermediate |
| 8 | Writing effective tools for AI agents | Anthropic | Thiết kế tool | intermediate |
| 9 | YC vibe coding (đội 10 làm việc của 50–100) | TechCrunch / Forbes | Build/ship fast | intro |
| 10 | AI application spending / AI for startups | a16z | Distribution & GTM | intro→interm. |
| 11 | 14.ai + AI-native agencies bán outcome | TechCrunch / Forbes | Case study 2026 | intro |
| 12 | Effective context engineering for AI agents (tùy chọn) | Anthropic | Độ tin cậy agent | intermediate |

---

### Gợi ý cách chạy chương trình (dành cho founder)
- Mỗi tuần: mỗi người đọc/xem trước, sau đó họp 45–60 phút chỉ để **trả lời các câu hỏi "áp dụng vào Harmonix"**.
- Ghi lại kết luận vào một doc chung; cuối tuần 3, cả nhóm cùng viết bản định nghĩa "Harmonix AI-native" và chọn 1 thử nghiệm nhỏ để ship ngay.
- Ưu tiên hành động hơn lý thuyết: mục tiêu cuối là **một prototype agent thật** chạm vào một quy trình vận hành có thật (NAV/report/point/partner).
