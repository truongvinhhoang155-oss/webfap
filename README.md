# FPT Academic Portal (FAP) - Web Clone & Customization System

Hệ thống giao diện mô phỏng Cổng Thông Tin Đào Tạo Đại học FPT (FAP - FPT Academic Portal) với đầy đủ 19 trang chức năng, bảo mật xác thực phiên làm việc và hỗ trợ tùy biến thông tin sinh viên động.

---

## 🌟 Tính năng nổi bật

1. **Chuẩn hóa giao diện FAP 100%**:
   - Sử dụng trọn bộ CSS/JS chính thức của hệ thống Jidox FAP.
   - Hỗ trợ chế độ Dark Mode / Light Mode mượt mà.
   - Responsive toàn diện trên Desktop, Tablet và Mobile.

2. **Hệ thống 19 trang chức năng đầy đủ**:
   - `login.html`: Trang đăng nhập xác thực FeID & Google Workspace.
   - `index.html`: Bảng điều khiển trang chủ sinh viên (Dashboard).
   - `schedule.html`: Lịch học theo tuần (Weekly Timetable).
   - `mark.html`: Báo cáo điểm chi tiết các môn học (Grade Report).
   - `attendance.html`: Báo cáo điểm danh (Attendance Report).
   - `transcript.html`: Bảng điểm tích lũy học tập (Academic Transcript).
   - `exam.html`: Lịch thi học kỳ (Exam Schedule).
   - `curriculum.html`: Khung chương trình đào tạo 9 kỳ (Curriculum).
   - `account.html`: Hồ sơ cá nhân sinh viên (Personal Profile).
   - `finance.html`: Lịch sử giao dịch & số dư ví (Finance & Fee).
   - `news.html`: Bảng tin tức đào tạo & khảo thí (Campus News).
   - `ojt.html`: Điều kiện thực tập doanh nghiệp (OJT Conditions).
   - `thesis.html`: Điều kiện khóa luận tốt nghiệp (Thesis Conditions).
   - `rooms.html`: Tra cứu phòng học & không gian co-working (Room Search).
   - `subjects.html`: Danh mục môn học & syllabus (Subject Catalog).
   - `submit-application.html`: Gửi đơn từ dịch vụ sinh viên trực tuyến (Submit Application).
   - `application.html`: Theo dõi trạng thái đơn từ (Application Status).
   - `cross-class.html`: Chợ đổi lịch học chéo lớp (Cross-Class Exchange).
   - `fye.html`: Nhật ký hoạt động sinh viên năm nhất (First Year Experience).

3. **Bảo mật & Authentication Guard**:
   - Chặn toàn bộ truy cập trái phép vào các trang con khi chưa xác thực.
   - Tự động chuyển hướng về trang `login.html`.
   - Cơ chế Đăng xuất (Logout) xóa sạch dữ liệu phiên làm việc.

4. **Tùy biến dữ liệu sinh viên động**:
   - Người dùng có thể tùy ý nhập: Họ tên, Mã sinh viên (MSSV), Lớp sinh hoạt, Khóa, Mã chương trình, Email, và Số dư ví (VNĐ).
   - Toàn bộ 19 trang con tự động đồng bộ hóa theo thông tin đã nhập.

---

## 🚀 Hướng dẫn triển khai (Deployment)

### Cách 1: Triển khai với GitHub Pages
1. Vào mục **Settings** của repository trên GitHub.
2. Chọn mục **Pages** ở thanh bên trái.
3. Trong phần **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
4. Bấm **Save**. Trang web sẽ tự động chạy tại: `https://truongvinhhoang155-oss.github.io/webfap/`

### Cách 2: Triển khai với Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # Chọn public directory là "dist"
firebase deploy
```

### Cách 3: Triển khai với Vercel / Netlify
- Kéo thả thư mục `dist` hoặc liên kết repository này với Vercel/Netlify.
- Cấu hình Output Directory: `dist` (hoặc để mặc định).

---

## 💻 Chạy cục bộ (Local Development)
Chạy server HTTP đơn giản với Python:
```bash
python -m http.server 8080 -d dist
```
Truy cập tại: `http://localhost:8080/login.html`
