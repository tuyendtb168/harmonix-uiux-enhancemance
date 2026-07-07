# Đề xuất Tái cấu trúc Vận hành AI-Native & Xây dựng Harmonix Brain

---

## Phần I: Đề xuất các Agentic Automation Workflows & Skill Chains cho PM/COO
*(Toàn bộ workflow bên dưới giả định đã có "Harmonix Brain" — xem kịch bản xây dựng ở Phần II — làm nguồn tri thức nền để AI tra cứu trước khi hành động.)*

### 1. Workflow 1: "Idea-to-Task" (Ý tưởng thô -> PRD -> Github Issues)
*Giúp tự động hóa 80% công sức viết spec sản phẩm và phân rã task kỹ thuật cho DEV.*

#### 🔄 Quy trình chi tiết:
1.  **Input:** PM nhập một ý tưởng thô bằng văn bản chat hoặc file ghi âm giọng nói vào Discord/Slack.
2.  **Soạn PRD:** AI đọc ý tưởng, truy vấn kiến thức cũ từ "Harmonix Brain" để viết bản nháp PRD hoàn chỉnh trên Notion (luồng đi của user, logic sản phẩm).
3.  **Quét rủi ro:** AI phân tích bản nháp PRD để phát hiện các rủi ro bảo mật đặc thù DeFi (hạn mức rút tiền, rủi ro oracle, trượt giá) và tự động điền thêm phần "Security & Edge cases Check-list".
4.  **Duyệt:** PM kiểm tra bản nháp trên Notion, chỉnh sửa và nhấn nút `[Approve]`.
5.  **Tạo Task:** Sau khi duyệt, AI gọi Github API tự động tách PRD thành các task nhỏ (Frontend, Backend, Smart Contract) kèm nhãn độ khó (`Size: S/M/L`) và gán đúng người phụ trách.

#### 🔗 Các Skill Chains liên quan:
*   `prd_generation_skill`: Chuyển ngôn ngữ nói/chat tự nhiên thành PRD cấu trúc Markdown/Notion.
*   `defi_risk_auditor_skill`: Phát hiện các điểm nhạy cảm về bảo mật hợp đồng thông minh để tạo checklist an toàn cho DEV.
*   `github_issue_builder_skill`: Tự động chia nhỏ task và gọi Github API để tạo Issue.

#### 📋 Yêu cầu đối với các thành viên để vận hành:
*   **PM/COO:** Cần duyệt các bản nháp AI tạo ra để huấn luyện AI hiểu đúng phong cách làm việc của công ty.
*   **CEO/DEV:** Thống nhất quy chuẩn chấm điểm độ khó `Size: S/M/L` để AI gán nhãn chính xác.

---

### 2. Workflow 2: "Daily Sync & Standup Reporter" (Tự động hóa báo cáo tiến độ)
*Tự động quét hoạt động thực tế của DEV trên Github để cập nhật tiến độ mà không cần DEV phải cập nhật thẻ Kanban thủ công.*

#### 🔄 Quy trình chi tiết:
1.  **Input:** Hoạt động đẩy code (commits), mở/đóng Pull Request (PR) và bình luận của DEV trên Github.
2.  **Quét & Phân tích:** AI chạy ngầm quét Github API và Notion Board hàng ngày.
3.  **Phát hiện nghẽn:** AI đối chiếu thời gian thực tế DEV đang làm task với độ khó (`Size: S/M/L`). Nếu một task "In Progress" quá 3 ngày không có commit mới, AI đánh dấu DEV đang bị nghẽn (blocked).
4.  **Output:** AI tự động soạn và gửi báo cáo Daily Sync vào kênh Discord nội bộ lúc 9h sáng (nêu rõ: việc đã hoàn thành, việc đang làm, cảnh báo nghẽn).
5.  **Agent giải quyết tình trạng quên cập nhật status (Auto Status-Sync):** Thay vì chỉ cảnh báo, agent tự động **suy luận và cập nhật thẳng** trạng thái thẻ Kanban dựa trên tín hiệu Github thật, không cần DEV tự tay kéo thẻ:
    *   Nhánh mới được tạo (tên khớp ID task) → tự chuyển thẻ từ `Backlog` sang `In Progress`.
    *   PR mở ở trạng thái Draft → chuyển thẻ sang `In Review (Draft)`.
    *   PR chuyển từ Draft sang Ready for Review → chuyển thẻ sang `Waiting Review`.
    *   PR được approve và merge → tự động chuyển thẻ sang `Done`, đồng thời tự đóng Issue liên kết kèm comment `Auto-closed vì PR #X đã merge`.
    *   **Nguyên tắc một chiều:** Đồng bộ chỉ chạy theo hướng Github → Kanban, không đồng bộ ngược lại, để tránh xung đột ghi đè khi PM chỉnh tay trạng thái trên Notion/Kanban.

#### 🔗 Các Skill Chains liên quan:
*   `git_activity_fetcher_skill`: Thu thập lịch sử commit, PR và comment của DEV trong 24h qua.
*   `notion_card_tracker_skill`: Kiểm tra trạng thái thẻ trên Notion Board.
*   `standup_generator_skill`: Tổng hợp dữ liệu thành báo cáo ngắn gọn và tag đúng người bị nghẽn.
*   `auto_status_sync_skill`: Tự động suy luận và cập nhật trạng thái thẻ Kanban dựa trên vòng đời branch → PR → merge, giải quyết gốc rễ việc DEV quên đổi status thủ công.

#### 📋 Yêu cầu đối với các thành viên để vận hành (Bắt buộc):
*   **Quy tắc Git Branch:** DEV bắt buộc đặt tên nhánh code có số ID của task (ví dụ: `feature/#102-arbitrum-gas`).
*   **Quy tắc PR Description:** DEV bắt buộc ghi từ khóa liên kết PR với Issue (ví dụ: `Closes #102`).
*   **Quy tắc Commit:** Khuyến khích viết commit message ngắn gọn, rõ nghĩa.

---

### 3. Workflow 3: "QA Spec Matcher" (Nghiệm thu tính năng tự động)
*Giúp PM/COO tự động hóa khâu click chuột test giao diện và logic trên web testnet.*

#### 🔄 Quy trình chi tiết:
1.  **Input:** Tài liệu PRD đã duyệt và URL chạy thử (Preview link) do DEV cung cấp trong PR.
2.  **Tạo kịch bản:** AI đọc PRD, tự động biên soạn bộ kịch bản kiểm thử (Test scenarios) dưới dạng các bước click chuột.
3.  **Thực thi:** Một Browser Agent (Playwright ảo) tự động mở trình duyệt, kết nối ví test Web3, thực hiện từng bước trong kịch bản và tự động chụp ảnh màn hình (screenshot).
4.  **Báo cáo:** AI so sánh ảnh chụp thực tế với thiết kế Figma/PRD và gửi báo cáo so sánh lỗi giao diện/logic (Visual Diff) cho PM/COO.

#### 🔗 Các Skill Chains liên quan:
*   `test_scenario_compiler_skill`: Dịch tiêu chí nghiệm thu của PRD thành kịch bản click chuột.
*   `browser_action_executor_skill`: Điều khiển trình duyệt ảo thực thi test và chụp ảnh.
*   `visual_diff_auditor_skill`: So sánh ảnh chụp thực tế với thiết kế chuẩn để phát hiện lỗi.

#### 📋 Yêu cầu đối với các thành viên để vận hành:
*   **DEV:** Phải cung cấp một đường link staging/preview ổn định và dán vào Github PR.
*   **PM/COO:** Cập nhật PRD rõ ràng các tiêu chí nghiệm thu (Acceptance Criteria) để AI có cơ sở tạo kịch bản test.

---

### 4. Workflow 4: "Github Velocity & Performance Insight" (Chuỗi đánh giá hiệu suất DEV trên Github)
*Tự động tổng hợp tín hiệu khách quan từ hoạt động Github để hỗ trợ PM/COO đánh giá năng suất — không thay thế đánh giá con người, chỉ cung cấp dữ liệu tham chiếu. Khác với Workflow 2 (phát hiện nghẽn theo ngày, phục vụ vận hành hằng ngày), Workflow này tổng hợp dữ liệu theo tuần/tháng để phục vụ đánh giá tăng trưởng, không phải thao tác real-time.*

#### 🔄 Quy trình chi tiết:
1.  **Input:** Toàn bộ lịch sử commit, PR (thời gian mở/review/merge), review comment và độ khó task (`Size: S/M/L/XL`) trong một chu kỳ (tuần/tháng).
2.  **Tính toán chỉ số:** AI tính các chỉ số khách quan cho từng DEV:
    *   **Cycle Time:** Thời gian từ lúc task chuyển `In Progress` đến lúc PR merge.
    *   **Review Turnaround:** Thời gian trung bình từ khi PR mở tới khi được review lần đầu.
    *   **Rework Rate:** Tỷ lệ commit phát sinh sau khi reviewer yêu cầu sửa (requested changes).
    *   **Estimate Accuracy:** So sánh Size ước tính ban đầu với thời gian thực tế hoàn thành.
    *   **Blocked-time Ratio:** % thời gian task nằm ở trạng thái `Waiting Review`/`Blocked` so với tổng thời gian task tồn tại.
3.  **Chuẩn hóa theo độ khó:** AI không so sánh trực tiếp số lượng commit hay dòng code giữa các DEV (dễ bị đánh lừa bởi việc "cày" nhiều commit nhỏ) — mọi chỉ số đều được chuẩn hóa theo Size của task để so sánh công bằng.
4.  **Output:** Mỗi tuần/tháng, AI xuất "Github Velocity Report" cho PM/COO — biểu đồ **xu hướng theo thời gian** (không phải điểm số tuyệt đối một lần), highlight các điểm bất thường (ví dụ: Rework Rate tăng đột biến thường do task thiếu spec rõ, không hẳn do DEV yếu).

#### ⚠️ Nguyên tắc sử dụng (bắt buộc để tránh phản tác dụng):
*   Đây là **dữ liệu tham chiếu (diagnostic), không phải điểm số KPI trực tiếp** — PM/COO phải đối chiếu ngữ cảnh (task khó, thiếu spec, chờ review từ người khác...) trước khi kết luận.
*   Không dùng số liệu này làm căn cứ duy nhất để thưởng/phạt, tránh việc DEV tối ưu ngược chỉ số (ví dụ: chia nhỏ PR giả tạo để tăng "velocity" ảo).
*   Toàn bộ chỉ số minh bạch: DEV có quyền xem báo cáo của chính mình bất cứ lúc nào.

#### 🔗 Các Skill Chains liên quan:
*   `github_velocity_analyzer_skill`: Tính Cycle Time, Rework Rate, Blocked-time Ratio từ dữ liệu PR/commit.
*   `estimate_accuracy_tracker_skill`: Đối chiếu Size ước tính với thời gian hoàn thành thực tế.
*   `review_turnaround_tracker_skill`: Đo thời gian phản hồi review giữa các thành viên.

#### 📋 Yêu cầu đối với các thành viên để vận hành:
*   **DEV:** Tuân thủ quy tắc branch/PR/task-size đã thiết lập ở Workflow 2 — đây chính là nguồn dữ liệu đầu vào duy nhất.
*   **PM/COO:** Cam kết dùng báo cáo này để **hỗ trợ trò chuyện 1-1 hàng tháng**, không dùng như một bài chấm điểm tự động.

---

## Phần II: Kịch bản xây dựng Harmonix Brain (Context Layer)

### 1. Bối cảnh & Mục tiêu
Để tất cả các Agent trên hoạt động chính xác không bị "ảo giác" (hallucination), Harmonix cần xây dựng **Harmonix Brain** – một kho tri thức chung hợp nhất dữ liệu từ Notion và Github. Nó hoạt động như một Vector Database lưu trữ tri thức sống của toàn công ty.

### 2. Kiến trúc Kỹ thuật đề xuất (Chạy trên Server Mac Mini của công ty)
*   **Dữ liệu đầu vào:** Notion API (Tài liệu sản phẩm) + Github API/Webhooks (Mã nguồn, PR, Issues, Comments).
*   **Xử lý dữ liệu:** LlamaIndex hoặc LangChain (Python/TypeScript) để chia nhỏ dữ liệu (chunking) và nhúng (embedding).
*   **Vector Database:** Pgvector (Tích hợp vào cơ sở dữ liệu PostgreSQL sẵn có) hoặc Pinecone để lưu trữ vector dữ liệu.
*   **LLM Engine:** Claude 3.5 Sonnet API (cho khả năng suy luận logic xuất sắc nhất hiện nay).

### 3. Quy trình Triển khai chi tiết (Kịch bản thực hiện)

#### 🔹 Bước 1: Dọn dẹp dữ liệu nguồn (Data Curation)
*   **Quy định Tag trên Notion:** PM/COO rà soát toàn bộ Notion, thiết lập thuộc tính `Status` cho các trang:
    *   `[Canonical/Verified]`: Tài liệu chuẩn, code đang chạy thực tế.
    *   `[Active Draft]`: Tài liệu nháp của các tính năng đang code cuốn chiếu (AI sẽ index nhưng đánh dấu cảnh báo dữ liệu này có thể thay đổi).
    *   `[Draft] / [Archived]`: Bỏ qua không nạp vào AI để tránh gây nhiễu thông tin cũ.

#### 🔹 Bước 2: Phân loại và cấu trúc nguồn dữ liệu từ Github
*   **Các nguồn dữ liệu từ Github cần nạp vào Harmonix Brain, xếp theo độ tin cậy:**

| Nguồn dữ liệu | Độ tin cậy | Cách xử lý |
|---|---|---|
| Code + docstring/comment trên nhánh `main` | Cao nhất (ground truth) | Chỉ index `README`, thư mục `docs/` và comment giải thích logic — không nạp toàn bộ raw code để tránh nhiễu. |
| PR description + comment (đã merged) | Cao | Coi là "decision log" kỹ thuật — giữ nguyên PR number, tác giả, ngày merge làm metadata. |
| Issue đã đóng (Closed) kèm comment cuối | Trung bình – cao | Comment cuối trước khi đóng thường là kết luận thật; ưu tiên hơn nội dung mô tả issue ban đầu. |
| Issue đang mở (Open) | Thấp | Chỉ là đề xuất/thảo luận chưa chốt — AI gắn nhãn `[Đang thảo luận]` khi trích dẫn để tránh nhầm là quyết định cuối. |
| Commit message | Rất thấp | Chỉ dùng để trace lịch sử thay đổi (timeline), không dùng làm nguồn giải thích logic vì quá ngắn, thiếu ngữ cảnh. |
| Wiki / CHANGELOG (nếu có) | Trung bình | Xử lý tương tự tài liệu Notion — bắt buộc gắn `last_updated`. |

*   **Metadata bắt buộc khi nạp dữ liệu Github** (đồng bộ với nguyên tắc Metadata-rich Chunking ở Bước 3): `repo`, `file_path` hoặc `pr_number`/`issue_number`, `branch`, `author`, `merged_at`/`closed_at`, `labels`, `status` (`open`/`closed`/`merged`).

#### 🔹 Giải quyết xung đột thông tin: Notion vs Github — "Cái nào là Sự thật?"
*   Khi AI phát hiện Notion và Github mô tả khác nhau về cùng một tính năng, áp dụng quy trình sau (mở rộng từ nguyên tắc Hierarchy of Truth ở Bước 3):
    1.  AI so sánh `last_updated` của trang Notion với `merged_at` của PR gần nhất liên quan đến cùng tính năng (đối chiếu qua tag `#spec`/`#note` hoặc link task chung).
    2.  Nếu PR merge **sau** thời điểm Notion cập nhật lần cuối → Github thắng; AI trả lời theo Github và tự động gửi cảnh báo `⚠️ Notion có thể đã lỗi thời` cho PM/COO qua Discord.
    3.  Nếu Notion cập nhật **sau** PR gần nhất (ví dụ PM vừa đổi lại spec) → Notion thắng, nhưng AI vẫn nhắc DEV rằng code hiện tại chưa khớp spec mới.
    4.  Nếu không xác định được thứ tự thời gian rõ ràng (thiếu metadata) → AI **không tự chọn phe**, mà trả lời kèm cả hai nguồn, gắn nhãn `[Xung đột chưa rõ ràng]` để con người tự quyết định.

#### 💡 Tips cho đội DEV để dữ liệu Github "sạch" cho AI
*   Viết PR description có ngữ cảnh (giải thích *why*, không chỉ *what*) — AI dùng chính đoạn này làm decision log; PR chỉ ghi "fix bug" sẽ vô giá trị với AI.
*   Trước khi đóng Issue, để lại 1 comment tóm tắt quyết định cuối cùng (root cause + hướng giải quyết) — đây là nguồn AI tin cậy nhất sau code.
*   Khi một quyết định trong PR/Issue **ghi đè (override)** tài liệu Notion cũ, gắn thêm tag `#supersedes-notion` trong comment để AI ưu tiên tuyệt đối nguồn này bất kể timestamp.
*   Giữ tên nhánh và PR title bám sát template đã quy định ở Workflow 2 (`feature/#102-...`, `Closes #102`) — đây cũng là khóa để AI liên kết đúng Issue/PR với trang Notion tương ứng.
*   Tránh để PR "mồ côi" (không liên kết Issue nào) — AI sẽ không biết gắn PR đó vào ngữ cảnh tính năng nào.

#### 🔹 Quy trình xử lý: Code chạy trước, Tài liệu chưa viết xong (Documentation Lag)
*Tình huống: DEV phải code và deploy cuốn chiếu để kịp tiến độ, trong khi PM chưa kịp viết/hoàn thiện tài liệu Notion tương ứng. Đây là tình huống bình thường ở startup tốc độ cao — không phải lỗi — nhưng agent cần quy trình rõ ràng để không bị "mù thông tin" hoặc trả lời sai cho người hỏi.*

*   **Phát hiện:** `undocumented_feature_flagger_skill` quét các PR đã merge vào `main` mỗi ngày; nếu PR không gắn kèm `notion_url` nào, agent đánh dấu tính năng này là `[Chưa có tài liệu — Code-First]`.
*   **Xử lý tạm thời (Stub Doc):** Agent tự động soạn một **"Stub Doc"** — bản tóm tắt kỹ thuật tạm thời từ PR description + code diff + comment — và gắn nhãn rõ ràng `[Auto-generated / Chờ PM xác nhận]`.
*   **Trả lời có cảnh báo:** Stub Doc tạm thời trở thành nguồn duy nhất để AI trả lời câu hỏi liên quan, nhưng AI **luôn** kèm cảnh báo: *"Tài liệu này do AI tự tổng hợp từ code, chưa được PM xác nhận chính thức."*
*   **Quy tắc ưu tiên (bổ sung Hierarchy of Truth ở Bước 3):** Stub Doc được xếp cùng bậc với "PR description" — **không** được xem ngang hàng tài liệu Notion `[Canonical/Verified]` cho tới khi PM xác nhận.
*   **Escalation:** Nếu sau **7 ngày** PM vẫn chưa viết/duyệt tài liệu Notion chính thức cho tính năng này, agent tự động nhắc PM qua Discord kèm link Stub Doc (áp dụng cơ chế Notify — Tier 1 ở Phần III).
*   **Chốt tài liệu:** Khi PM viết xong tài liệu Notion chính thức, agent tự động gắn tag `#supersedes-stub` để thay thế Stub Doc bằng tài liệu chuẩn; Stub Doc cũ chuyển sang trạng thái `[Archived]`.
*   **Liên kết Cổng phê duyệt (Phần III):** Tạo Stub Doc là **Tier 0 (Auto)** — không cần duyệt vì chỉ mang tính tham khảo tạm thời. Việc "chốt" một Stub Doc thành tài liệu chính thức luôn cần PM duyệt ở **Tier 2 (Approve-1)**.

#### 🔹 Bước 3: Kỹ thuật xử lý dữ liệu (Context Engineering)
*   **Metadata-rich Chunking:** Khi nạp dữ liệu vào Vector DB, bắt buộc phải đính kèm siêu dữ liệu (Metadata) như: `version`, `status`, `last_updated`, `author`, `notion_url` để AI có thể lọc thông tin trước khi trả lời.
*   **Hierarchy of Truth (Độ ưu tiên của sự thật):** Cài đặt logic ưu tiên thông tin cho AI khi có xung đột dữ liệu:
    1.  *Ưu tiên 1:* Code thực tế đang chạy trên nhánh `main`.
    2.  *Ưu tiên 2:* Ghi chú của DEV trong các PR/Issues đã closed gần nhất.
    3.  *Ưu tiên 3:* Tài liệu trên Notion.
    *(Nếu Notion ghi một đường nhưng PR Notes của DEV ghi một nẻo, AI sẽ cảnh báo cho PM/COO biết thông tin Notion bị cũ).*

#### 🔹 Bước 4: Đồng bộ thời gian thực qua Github Webhook
*   Cấu hình Webhook trên Github của Harmonix. Mỗi khi DEV thực hiện: `Merge PR`, `Close Issue` hoặc viết comment có gắn tag `#spec` hoặc `#note`, Github sẽ gửi tín hiệu về Server Mac Mini để tự động cập nhật ngay thông tin mới đó vào Vector DB của Harmonix Brain.

#### 🔹 Bước 5: Tạo Giao diện tương tác (Discord/Telegram Bot)
*   DEV Backend viết một bot Discord/Telegram kết nối với Harmonix Brain.
*   Nhân sự (PM, BD, DEV) chỉ cần tag `@Harmonix-Brain` và đặt câu hỏi tự nhiên. Bot sẽ trả lời kèm link dẫn chứng gốc từ Notion hoặc Github PR để đối chiếu.
*   *Ví dụ:* `"Lưu ý đặc biệt khi deploy vault Arbitrum là gì?"` -> Bot quét PR comments cũ của DEV và trả lời chính xác cảnh báo về gas fee kèm link PR gốc.
*   **Cơ chế phản hồi ngược (Feedback Loop):** Nếu DEV phát hiện thông tin Agent trả lời bị sai do tài liệu Notion cũ chưa cập nhật:
    1.  DEV cập nhật lại trang Notion.
    2.  Gõ lệnh: `@Harmonix-Brain sync [link_notion]`. Agent sẽ ngay lập tức cập nhật đoạn thông tin đó vào bộ não.

---

## Phần III: Cổng phê duyệt (Human-in-the-loop)

Khi các Agentic Workflow ở Phần I bắt đầu tự động soạn PRD, tạo task, quét tiến độ và nghiệm thu tính năng, câu hỏi kế tiếp là: **hành động nào AI được tự làm, hành động nào bắt buộc phải có người duyệt trước khi thực thi?** Đây là lớp governance áp dụng nguyên tắc *hybrid autonomy*: tự động hóa việc thường quy, chặn lại ở các quyết định tác động cao và đẩy cho người có thẩm quyền duyệt — con người chỉ cần đứng ở hai đầu (bookends): duyệt chiến lược/gu thẩm mỹ ở đầu vào và kiểm duyệt chất lượng ở đầu ra, phần giữa để AI tự vận hành.

*   **Kênh phê duyệt:** Approval card được gửi qua bot Discord/Telegram đã xây ở Phần II (Bước 5), kèm nút `[Approve]`/`[Reject]`; sau khi duyệt, agent tự động ghi log (mục 5) và đồng bộ kết quả ngược lại Notion/Github tương ứng.

### 1. Bốn cấp độ tự chủ (Autonomy Tiers)

| Tier | Tên | Định nghĩa | Ví dụ |
|------|-----|-----------|-------|
| 0 | **Auto** | AI thực hiện và log lại, không cần duyệt trước | Quét git activity, soạn Daily Sync report, cập nhật thẻ Kanban |
| 1 | **Notify** | AI thực hiện ngay nhưng báo real-time cho người phụ trách; có cửa sổ "veto" ngắn trước khi hết khả năng hoàn tác | Đăng cảnh báo nghẽn (blocked task), gửi báo cáo NAV hằng ngày |
| 2 | **Approve-1** | AI đề xuất, cần **1 người duyệt** trước khi thực thi | Duyệt bản nháp PRD (Workflow 1 — Github Issues được tự động tách ngay sau khi duyệt), đổi UX/feature flag |
| 3 | **Approve-multisig** | Cần **≥2 người duyệt độc lập** — dành cho hành động tài chính/pháp lý lớn hoặc không thể đảo ngược | Rebalance vượt ngưỡng, đổi tham số chiến lược, whitelist token, chi trả reward lớn |

### 2. Phân loại hành động thay đổi lớn theo bộ phận

| Bộ phận | Hành động thay đổi lớn (ví dụ) | Tier | Người duyệt mặc định |
|---------|--------------------------------|------|------------------------|
| Trading / Vault Ops | Rebalance vượt ngưỡng %, đổi tham số chiến lược, whitelist token mới, tạm dừng vault | 3 | Trưởng Trading + **COO** |
| Finance | Đổi công thức fee/phân bổ yield, chi trả reward vượt ngưỡng, điều chỉnh NAV bất thường | 3 | Finance lead + **COO** |
| Engineering | Deploy/nâng cấp smart contract, đổi quyền admin/multisig, đổi CI/CD production | 3 | Eng lead + **COO** (khi ảnh hưởng fund) |
| Product | Duyệt PRD do AI soạn (Workflow 1), đổi roadmap chính, đổi UX diện rộng, đổi pricing hiển thị | 2 | **PM** |
| Growth / Marketing | Chiến dịch airdrop/point lớn, thông báo public về thay đổi chính sách, partnership mới | 2 (→3 nếu có cam kết tài chính) | PM/Growth lead (+ **COO** nếu Tier 3) |
| Data | Đổi mô hình tính điểm/reward ảnh hưởng user, xóa/sửa dữ liệu lịch sử trong Harmonix Brain | 2–3 | Data lead + **COO** (Tier 3) |
| Operations / Company | Đổi chính sách nội bộ, quyền truy cập hệ thống, vendor/nhà cung cấp mới | 2 | **COO** |

### 3. Chi tiết cho PM (Product Manager)

*   PM là approver mặc định cho **Tier 2** trong phạm vi sản phẩm: bản nháp PRD do AI soạn (Workflow 1), Github Issues được tự động tách, roadmap, feature flag, thay đổi UX diện rộng, pricing hiển thị.
*   PM **không tự duyệt** bất kỳ hành động nào chạm tới tiền, hợp đồng thông minh, hoặc dữ liệu tài chính — các trường hợp này luôn escalate lên Tier 3 (PM đề xuất, COO duyệt cuối).
*   **Approval card cho PM** cần có: (1) mục tiêu thay đổi, (2) phạm vi ảnh hưởng (số user/vault/feature chạm tới), (3) khả năng rollback, (4) rủi ro UX/support/bảo mật mà `defi_risk_auditor_skill` đã liệt kê trước, (5) so sánh trước/sau (diff PRD hoặc mock UI).
*   **SLA duyệt:** PM phản hồi trong 4 giờ làm việc; quá hạn → agent tự động escalate lên COO.

### 4. Chi tiết cho COO (Chief Operating Officer)

*   COO là approver **bắt buộc** cho mọi Tier 3, không có ngoại lệ — kể cả khi trưởng bộ phận liên quan đã duyệt trước.
*   COO chịu trách nhiệm cuối cho: rủi ro tài chính (fund, fee, treasury), rủi ro pháp lý/compliance, rủi ro danh tiếng (thông báo public về sự cố/thay đổi lớn), và quyền hạn multisig on-chain.
*   **Approval card cho COO** cần thêm so với PM: (1) tác động tài chính định lượng (ước tính USD hoặc % TVL), (2) rủi ro pháp lý/compliance mà `defi_risk_auditor_skill` gắn cờ sẵn, (3) ai đã duyệt ở Tier 2 trước đó và lý do, (4) kịch bản xấu nhất nếu sai (worst case) kèm kế hoạch rollback/circuit breaker.
*   **SLA duyệt:** COO phản hồi trong 2 giờ trong giờ hành chính; có kênh khẩn/on-call riêng cho sự cố bảo mật hoặc rủi ro tài chính tức thời.
*   **Quyền override:** COO có thể override quyết định Tier 2 của PM/trưởng bộ phận (một chiều). Không ai override được quyết định "từ chối" của COO ở Tier 3, trừ khi có sự đồng thuận của founder/board.

### 5. Audit trail & escalation

*   Mọi quyết định (kể cả Tier 0 — auto) đều phải log vào Harmonix Brain: agent nào đề xuất, ai duyệt, thời gian, nội dung approval card gốc, kết quả thực thi.
*   Quá SLA mà chưa có người duyệt → agent tự động escalate lên cấp cao hơn (PM → COO → founder) và **fail-safe = tạm dừng hành động**, không mặc định cho qua.
*   Review định kỳ (hàng tuần/tháng) các quyết định Tier 2/3 để tinh chỉnh ngưỡng: nếu một Tier bị "rubber-stamp" quá nhanh mà không ai đọc kỹ, cần giảm nhiễu trong approval card hoặc nâng ngưỡng Tier.
