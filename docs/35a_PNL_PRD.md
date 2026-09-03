# Đề xuất Các Giai đoạn Phát triển PnL & Đặc tả Yêu cầu Sản phẩm (PRD)
**Dự án:** Harmonix Vault Portfolio Tracker  
**Người soạn thảo:** PM/COO  
**Đối tượng báo cáo:** Sếp (CEO) & Đội ngũ Kỹ thuật  

---

## 1. Bối cảnh & Thách thức
Tính toán **Net PnL (Lợi nhuận ròng thực tế)** trong DeFi là một bài toán phức tạp do hành vi của người dùng không chỉ dừng lại ở việc gửi (Deposit) và rút (Withdraw) tiền thông thường.
*   **Thách thức:** Khi người dùng chuyển token ra khỏi ví (Transfer Out) để cung cấp thanh khoản (add LP), mua các token lợi suất (PT/YT của Pendle), hoặc đem đi thế chấp (Lending trên Aave), các hệ thống quét ví thông thường sẽ ghi nhận số dư bằng `0` và hiểu sai là người dùng đã bán lỗ toàn bộ tài sản.
*   **Giải pháp:** Để đảm bảo dự án triển khai đúng hạn và tối ưu hóa nguồn lực DEV (hiện đang tinh gọn), em đề xuất phân chia phát triển tính năng PnL thành **3 Giai đoạn** đi kèm PRD chi tiết dưới đây.

---

## 2. Giai đoạn 1: Yield Earned (MVP) — Hoàn thành trong Tuần 2-3

### 📌 Mục tiêu
Cung cấp cho người dùng một chỉ số phản ánh lợi nhuận kiếm được từ Vault (Yield Earned) đối với các trường hợp nắm giữ cơ bản (Happy Cases), hạn chế tối đa rủi ro sai lệch số liệu và giảm tải cho DEV.

### 📋 Đặc tả PRD Giai đoạn 1
1.  **Chỉ số hiển thị trên UI:** 
    *   Thay đổi tên hiển thị từ "Net PnL" thành **"Yield Earned" (Lợi nhuận tích lũy)** hoặc **"Estimated Profit" (Lợi nhuận dự kiến)**.
2.  **Công thức tính toán:**
    $$\text{Yield Earned} = (\text{Số dư Vault Token hiện tại trong ví} \times \text{Tỷ giá quy đổi hiện tại}) - \text{Tổng số tiền gốc thực tế đã gửi (Net Deposit)}$$
    *   *Trong đó:* $\text{Net Deposit} = \text{Tổng Deposit} - \text{Tổng Withdraw}$.
3.  **Giới hạn hệ thống (Scope Limit):**
    *   Chỉ tính toán chính xác cho các ví nắm giữ token trực tiếp tại ví cá nhân.
    *   Nếu số dư ví bằng `0` (do transfer đi nơi khác), Yield Earned sẽ hiển thị bằng `0` hoặc ẩn đi.
4.  **Thiết kế UI/UX (Disclaimer):**
    *   Đặt một biểu tượng tooltip `(i)` ngay cạnh dòng Yield Earned.
    *   *Nội dung Tooltip:* *"Chỉ số Yield Earned chỉ được tính toán chính xác khi bạn nắm giữ token trực tiếp trong ví cá nhân. Các hoạt động nâng cao như add LP, PT/YT hoặc Lending bên thứ ba sẽ không được phản ánh ở đây."*

### ✅ Tiêu chí nghiệm thu (Acceptance Criteria)
*   [ ] User gửi tiền vào Vault, Yield Earned hiển thị số dương tăng dần theo thời gian thực dựa trên APY/Tỷ giá chuyển đổi.
*   [ ] User rút tiền một phần, công thức cập nhật lại Net Deposit và tính toán chính xác.
*   [ ] Tooltip hiển thị rõ ràng trên cả giao diện Mobile và Web.

---

## 3. Giai đoạn 2: Hỗ trợ Giao dịch Chuyển nhận (Transfer In/Out) — Hoàn thành trong Tuần 4

### 📌 Mục tiêu
Xử lý trường hợp người dùng chuyển token sang ví khác hoặc nhận token từ bên ngoài mà không làm gãy công thức tính PnL.

### 📋 Đặc tả PRD Giai đoạn 2
1.  **Logic xử lý giao dịch:**
    *   **Transfer Out (Chuyển đi):** Hệ thống ghi nhận hành động này tương đương với một lệnh **Rút tiền (Withdrawal)**. Giá trị rút được tính bằng: `Số lượng token chuyển đi * Giá thị trường (Oracle price) tại thời điểm chuyển`. Giao dịch này sẽ ghi nhận lợi nhuận thực tế (Realized PnL).
    *   **Transfer In (Nhận về):** Hệ thống ghi nhận hành động này tương đương với một lệnh **Gửi tiền (Deposit)**. Giá vốn (Cost Basis) mới của ví nhận sẽ được tính bằng: `Số lượng token nhận * Giá thị trường tại thời điểm nhận`.
2.  **Yêu cầu kỹ thuật:**
    *   DEV cấu hình Backend gọi API lịch sử giá (ví dụ: Coingecko, Birdeye hoặc Oracle nội bộ) để lấy chính xác giá của token tại mốc thời gian (Timestamp) của giao dịch Transfer.

### ✅ Tiêu chí nghiệm thu (Acceptance Criteria)
*   [ ] Khi ví A transfer 100 token sang ví B, ví A ghi nhận giảm Net Deposit và chốt lời/lỗ phần đó.
*   [ ] Ví B nhận 100 token, PnL của ví B không bị hiển thị lãi ảo khổng lồ mà tính giá vốn dựa trên giá trị thị trường lúc nhận.
*   [ ] Sai số về giá tại thời điểm transfer không lệch quá 0.5% so với giá giao dịch thực tế trên sàn.

---

## 4. Giai đoạn 3: Tích hợp API Bên Thứ Ba cho Case Phức tạp (LP, PT/YT) — Tuần 4 (Soạn tài liệu) & Triển khai sau

### 📌 Mục tiêu
Hỗ trợ đầy đủ số liệu PnL cho các "DeFi Power Users" khi họ mang token Harmonix đi tương tác trên các nền tảng khác như Pendle, Aave, Uniswap.

### 📋 Đặc tả PRD Giai đoạn 3
1.  **Giải pháp tích hợp:**
    *   Thay vì tự viết code quét smart contract của tất cả các bên thứ ba (rất tốn tài nguyên và dễ lỗi), Harmonix sẽ tích hợp **DeBank Cloud API** hoặc **Zapper API**.
2.  **Luồng dữ liệu (Data Flow):**
    *   Khi người dùng mở dashboard, Frontend gửi địa chỉ ví (Address) lên Backend.
    *   Backend gọi DeBank API để lấy danh sách toàn bộ các vị thế (Positions) của ví đó trên các giao thức DeFi.
    *   Hệ thống lọc ra các vị thế có chứa token của Harmonix (ví dụ: LP cặp Token_Harmonix/ETH trên Uniswap, hoặc YT-Token_Harmonix trên Pendle).
    *   Cộng gộp giá trị của các vị thế này vào phần số dư tài sản để tính toán Net PnL tổng thể.
3.  **Dự phòng (Fallback):**
    *   Nếu DeBank API gặp sự cố hoặc timeout, hệ thống sẽ tự động chuyển về hiển thị số liệu cơ bản của Giai đoạn 2.

### ✅ Tiêu chí nghiệm thu (Acceptance Criteria)
*   [ ] User mang token của Harmonix đi cung cấp thanh khoản trên Uniswap, Dashboard vẫn quét được vị thế LP đó và cộng vào giá trị tài sản để tính PnL.
*   [ ] Dashboard tải dữ liệu từ API không bị trễ quá 3 giây.
*   [ ] Có cơ chế xử lý lỗi khi API bên thứ ba bị downtime mà không làm sập giao diện người dùng.
