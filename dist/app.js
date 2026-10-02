/**
 * FPT ACADEMIC PORTAL (FAP)
 * Script file matching fap.fpt.edu.vn interface
 */

(function () {
    'use strict';

    // SVG Icons
    const icons = {
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
        chart: '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
        book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
        news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path>',
        file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
        edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
        swap: '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>',
        bulb: '<line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>',
        wallet: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
        menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
        heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
        pin: '<line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>',
        folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
        listBar: '<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>'
    };

    function svgIcon(name) {
        return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.file}</svg>`;
    }

    // Sidebar Navigation Groups
    const navStructure = [
        ['HỌC TẬP', [
            ['Lịch học', 'calendar', true],
            ['Báo cáo học tập', 'chart', true],
            ['Môn học & chương trình', 'book', true],
            ['Tin tức & tài liệu', 'news', true]
        ]],
        ['ĐƠN TỪ', [
            ['Xem đơn', 'file', false],
            ['Gửi đơn', 'edit', false],
            ['Đơn đổi lớp chéo', 'swap', false],
            ['Đơn khởi nghiệp', 'bulb', true]
        ]],
        ['TÀI CHÍNH', [
            ['Thanh toán', 'wallet', true]
        ]],
        ['WISHLIST', [
            ['Danh sách chờ lớp', 'menu', false],
            ['Đăng ký wishlist', 'edit', false]
        ]],
        ['HOẠT ĐỘNG SINH VIÊN', [
            ['FYE', 'heart', true]
        ]],
        ['TÀI KHOẢN', []]
    ];

    const navContainer = document.querySelector('#navigation');
    if (navContainer) {
        navContainer.innerHTML = navStructure.map(([heading, items]) => `
            <div class="nav-section">
                <div class="section-title">${heading}</div>
                ${items.map(([title, iconKey, hasArrow]) => `
                    <button class="nav-item-btn" data-module="${title}">
                        <span class="nav-icon-wrap">${svgIcon(iconKey)}</span>
                        <span>${title}</span>
                        ${hasArrow ? '<span class="nav-arrow">&gt;</span>' : ''}
                    </button>
                `).join('')}
            </div>
        `).join('');
    }

    // Quick Menu List
    const quickItems = [
        'Thời khóa biểu',
        'Lịch thi',
        'Thông tin phòng',
        'Báo cáo điểm danh',
        'Báo cáo điểm',
        'Bảng điểm'
    ];

    const quickLinksEl = document.querySelector('#quick-links');
    if (quickLinksEl) {
        quickLinksEl.innerHTML = quickItems.map(item => `
            <button class="quick-item-btn" data-module="${item}">
                <span class="quick-icon-box">${svgIcon('listBar')}</span>
                <span>${item}</span>
            </button>
        `).join('');
    }

    // News Data (Exact replication of screenshot)
    const newsData = [
        {
            id: 0,
            title: '[DVSV] THÔNG BÁO NHẮC NHỞ V/V NỘP HỒ SƠ MIỄN, GIẢM, HỖ TRỢ HỌC PHÍ VÀ HỖ TRỢ CHI PHÍ HỌC TẬP THEO NGHỊ ĐỊNH 238/NĐ-CP HỌC KỲ FALL 2026, NĂM HỌC 2026-2027',
            category: 'general',
            categoryName: 'Thông tin chung',
            date: '1/10/2026 11:12',
            pinned: false,
            body: 'Thông báo về việc nộp hồ sơ miễn, giảm, hỗ trợ học phí học kỳ Fall 2026 theo quy định của Nhà trường và Bộ Giáo dục & Đào tạo. Sinh viên theo dõi chi tiết hướng dẫn tại cổng FAP.'
        },
        {
            id: 1,
            title: '[CTSV] THƯ MỜI THAM DỰ CUỘC THI F TALENT CODE 2026',
            category: 'general',
            categoryName: 'Thông tin chung',
            date: '29/9/2026 14:51',
            pinned: false,
            body: 'Thư mời toàn thể sinh viên khối ngành Công nghệ Thông tin tham dự sân chơi lập trình F Talent Code 2026 với nhiều giải thưởng hấp dẫn.'
        },
        {
            id: 2,
            title: 'THÔNG BÁO : Về việc chuyển đổi và xử lý đơn từ trên hệ thống',
            category: 'general',
            categoryName: 'Thông tin chung',
            date: '29/9/2026 11:46',
            pinned: true,
            body: 'Nhà trường thông báo về quy trình tiếp nhận, chuyển đổi và xử lý các loại đơn từ học vụ tự động trên hệ thống FAP.'
        },
        {
            id: 3,
            title: '[ĐÀO TẠO] Hướng dẫn đăng ký học phần học kỳ tiếp theo',
            category: 'education',
            categoryName: 'Thông tin Đào tạo',
            date: '27/9/2026 08:30',
            pinned: false,
            body: 'Hướng dẫn sinh viên các bước kiểm tra thời khóa biểu và thực hiện đăng ký nguyện vọng học phần (Wishlist) cho học kỳ tới.'
        }
    ];

    let activeFilter = 'all';
    let isShowingAllNews = false;

    function renderNewsList() {
        const newsListEl = document.querySelector('#news-list');
        if (!newsListEl) return;

        let items = newsData.filter(n => activeFilter === 'all' || n.category === activeFilter);
        
        // Pinned order
        const visible = activeFilter === 'all' && !isShowingAllNews ? items.slice(0, 3) : items;

        newsListEl.innerHTML = visible.map(n => `
            <article class="news-item ${n.pinned ? 'is-pinned' : ''}">
                <div class="news-icon-badge ${n.pinned ? 'pinned-icon' : ''}">
                    ${svgIcon(n.pinned ? 'pin' : 'file')}
                </div>
                <div class="news-item-content">
                    <button class="news-item-btn" data-news-id="${n.id}">
                        ${n.title}
                    </button>
                    <div class="news-meta-row">
                        ${n.pinned ? `<span class="pin-tag">${svgIcon('pin')} Ghim</span>` : ''}
                        <span>${svgIcon('folder')} ${n.categoryName}</span>
                        <span>${svgIcon('calendar')} ${n.date}</span>
                    </div>
                </div>
            </article>
        `).join('');

        document.querySelectorAll('.filter-pill').forEach(btn => {
            const isAct = btn.dataset.filter === activeFilter;
            btn.classList.toggle('active', isAct);
            btn.setAttribute('aria-pressed', String(isAct));
        });

        const allBtn = document.querySelector('#all-news span:first-child');
        if (allBtn) {
            allBtn.textContent = isShowingAllNews ? 'Thu gọn' : 'Xem tất cả';
        }
    }

    // Modal Dialog Controls
    function openDialog(title, html) {
        let dlg = document.querySelector('#detail-dialog');
        if (!dlg) {
            dlg = document.createElement('dialog');
            dlg.id = 'detail-dialog';
            dlg.className = 'fap-dialog';
            dlg.innerHTML = `
                <div class="dialog-box">
                    <div class="dialog-header">
                        <span class="dialog-badge">THÔNG BÁO</span>
                        <button class="dialog-close-btn" id="close-dialog" aria-label="Đóng">&times;</button>
                    </div>
                    <h2 id="dialog-title" class="dialog-heading">${title}</h2>
                    <div id="dialog-content" class="dialog-body-text">${html}</div>
                    <div class="dialog-footer">
                        <button class="dialog-btn" id="dialog-confirm-btn">Đóng</button>
                    </div>
                </div>
            `;
            document.body.appendChild(dlg);
            dlg.querySelector('#close-dialog')?.addEventListener('click', () => dlg.close());
            dlg.querySelector('#dialog-confirm-btn')?.addEventListener('click', () => dlg.close());
            dlg.addEventListener('click', (e) => {
                if (e.target === dlg) dlg.close();
            });
        } else {
            const titleEl = dlg.querySelector('#dialog-title');
            const contentEl = dlg.querySelector('#dialog-content');
            if (titleEl) titleEl.textContent = title;
            if (contentEl) contentEl.innerHTML = html;
        }
        dlg.showModal();
    }

    document.querySelector('#close-dialog')?.addEventListener('click', () => {
        document.querySelector('#detail-dialog')?.close();
    });
    document.querySelector('#dialog-confirm-btn')?.addEventListener('click', () => {
        document.querySelector('#detail-dialog')?.close();
    });
    document.querySelector('#detail-dialog')?.addEventListener('click', e => {
        const dlg = document.querySelector('#detail-dialog');
        if (e.target === dlg) dlg.close();
    });

    // Dropdown Handlers
    function closeDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    }

    document.querySelectorAll('.dropdown-wrapper').forEach(wrapper => {
        const trigger = wrapper.querySelector('button, .user-profile-badge');
        const menu = wrapper.querySelector('.dropdown-menu');

        trigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu?.classList.contains('show');
            closeDropdowns();
            if (!isOpen && menu) {
                menu.classList.add('show');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-wrapper')) {
            closeDropdowns();
        }
    });

    // Campus selection
    document.querySelectorAll('#campus-menu .dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const campus = item.dataset.campus;
            document.querySelector('#current-campus-text').textContent = campus;
            document.querySelectorAll('#campus-menu .dropdown-item').forEach(b => b.classList.remove('active'));
            item.classList.add('active');
            closeDropdowns();
        });
    });

    // Language selection
    document.querySelectorAll('#lang-menu .dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const langName = item.textContent.trim();
            document.querySelector('#current-lang-text').textContent = langName;
            document.querySelectorAll('#lang-menu .dropdown-item').forEach(b => b.classList.remove('active'));
            item.classList.add('active');
            closeDropdowns();
        });
    });

    // Dark Mode Toggle
    const themeBtn = document.querySelector('#theme-toggle');
    themeBtn?.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('fap_exact_theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('fap_exact_theme', 'dark');
        }
    });

    if (localStorage.getItem('fap_exact_theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Fullscreen Toggle
    document.querySelector('#fullscreen-btn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        }
    });

    // Sidebar Mobile Toggle
    const sidebar = document.querySelector('#sidebar');
    const overlay = document.querySelector('#sidebar-overlay');
    document.querySelector('#sidebar-toggle')?.addEventListener('click', () => {
        sidebar?.classList.toggle('open');
        overlay?.classList.toggle('active');
    });
    overlay?.addEventListener('click', () => {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('active');
    });

    // News Filter Click
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.dataset.filter;
            renderNewsList();
        });
    });

    document.querySelector('#all-news')?.addEventListener('click', () => {
        isShowingAllNews = !isShowingAllNews;
        renderNewsList();
    });

    // Global Click Delegation
    document.addEventListener('click', (e) => {
        const newsBtn = e.target.closest('[data-news-id]');
        if (newsBtn) {
            const id = Number(newsBtn.dataset.newsId);
            const item = newsData.find(n => n.id === id);
            if (item) {
                openDialog(item.title, `<p>${item.body}</p><p style="margin-top:14px;color:#718096;font-size:12px;">Ngày đăng: ${item.date} · Chuyên mục: ${item.categoryName}</p>`);
            }
            return;
        }

        const modBtn = e.target.closest('[data-module]');
        if (modBtn) {
            const name = modBtn.dataset.module;
            const student = getCurrentStudentData();

            // Direct routing to completed subpages
            if (name === 'Thời khóa biểu' || name === 'Lịch học') {
                window.location.href = 'schedule.html';
                return;
            }
            if (name === 'Báo cáo điểm' || name === 'Báo cáo học tập' || name === 'Bảng điểm') {
                window.location.href = 'mark.html';
                return;
            }
            if (name === 'Báo cáo điểm danh') {
                window.location.href = 'attendance.html';
                return;
            }
            if (name === 'Trang chủ' || name === 'Trang chủ FAP') {
                window.location.href = 'index.html';
                return;
            }

            openDialog(name, `<p>Bạn đang truy cập chức năng <strong>${name}</strong> trên hệ thống FAP.</p><p style="margin-top:12px;font-size:13px;color:#718096;">Hồ sơ: <strong>${student.fullname}</strong> (${student.studentCode}) · Lớp: <strong>${student.className}</strong> · Khóa: <strong>${student.batch}</strong> · Chương trình: <strong>${student.programCode}</strong> · Email: <strong>${student.email}</strong>.</p>`);
            if (window.innerWidth <= 992) {
                sidebar?.classList.remove('open');
                overlay?.classList.remove('active');
            }
            return;
        }
    });

    // ==========================================
    // DYNAMIC STUDENT DATA FROM FEID / DATABASE
    // ==========================================
    function getInitials(name) {
        if (!name) return 'TH';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function formatHeroName(name) {
        if (!name) return 'Trương Vĩnh<br>Hoàng';
        const parts = name.trim().split(/\s+/);
        if (parts.length <= 1) return name;
        const last = parts.pop();
        return `${parts.join(' ')}<br>${last}`;
    }

    function getCurrentStudentData() {
        const raw = localStorage.getItem('fap_student_data');
        let student = {
            fullname: 'Sinh viên FPT',
            studentCode: 'MSSV',
            className: 'BIT_SE_21A',
            batch: '20',
            programCode: 'BIT_SE_21A',
            email: 'student@fpt.edu.vn',
            balance: '0'
        };

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                student = Object.assign(student, parsed);
            } catch (err) {
                console.error('[STUDENT DATA PARSE ERROR]', err);
            }
        }
        return student;
    }

    function applyStudentDataToDOM() {
        const student = getCurrentStudentData();

        // 1. Top Header
        const avatarEl = document.querySelector('#header-avatar');
        if (avatarEl) avatarEl.textContent = getInitials(student.fullname);

        const fullnameEl = document.querySelector('#header-fullname');
        if (fullnameEl) fullnameEl.textContent = student.fullname;

        const studentCodeEl = document.querySelector('#header-student-code');
        if (studentCodeEl) studentCodeEl.textContent = student.studentCode;

        const dropdownCodeEl = document.querySelector('#dropdown-student-code');
        if (dropdownCodeEl) dropdownCodeEl.textContent = student.studentCode;

        // 2. Student Hero Card
        const heroNameEl = document.querySelector('#hero-student-name');
        if (heroNameEl) heroNameEl.innerHTML = formatHeroName(student.fullname);

        const heroCodeEl = document.querySelector('#hero-student-code');
        if (heroCodeEl) heroCodeEl.textContent = student.studentCode;

        const heroClassEl = document.querySelector('#hero-student-class');
        if (heroClassEl) heroClassEl.textContent = student.className;

        // 3. Facts Metric Boxes
        const programCodeEl = document.querySelector('#fact-program-code');
        if (programCodeEl) programCodeEl.textContent = student.programCode;

        const classNameEl = document.querySelector('#fact-class-name');
        if (classNameEl) classNameEl.textContent = `Lớp: ${student.className}`;

        const emailEl = document.querySelector('#fact-email');
        if (emailEl) emailEl.textContent = student.email;

        const batchEl = document.querySelector('#fact-batch');
        if (batchEl) batchEl.textContent = student.batch;

        // 4. Số dư ví (Troll)
        const balanceEl = document.querySelector('#fact-balance');
        if (balanceEl) {
            const rawBal = student.balance !== undefined ? String(student.balance).trim() : '0';
            balanceEl.textContent = rawBal;
            if (rawBal.startsWith('-')) {
                balanceEl.style.color = '#ef4444';
            } else {
                balanceEl.style.color = '#0d9488';
            }
        }

        // 5. Subpage Student Info Synchronization
        const schedName = document.querySelector('#schedule-user-fullname');
        if (schedName) schedName.textContent = student.fullname;
        const schedCode = document.querySelector('#schedule-user-code');
        if (schedCode) schedCode.textContent = student.studentCode;

        const markSubinfo = document.querySelector('#mark-subinfo');
        if (markSubinfo) {
            markSubinfo.textContent = `Chương trình: ${student.programCode} · Lớp: ${student.className} · Khóa: ${student.batch}`;
        }

        const attendSubinfo = document.querySelector('#attend-subinfo');
        if (attendSubinfo) {
            attendSubinfo.textContent = `Sinh viên: ${student.fullname} (${student.studentCode}) · Lớp: ${student.className} · Khóa: ${student.batch}`;
        }

        console.log('[FAP SYSTEM] Đã đồng bộ thông tin sinh viên vào giao diện:', student);
    }

    function highlightActiveNavigation() {
        const path = window.location.pathname.toLowerCase();
        let activeModule = 'Trang chủ';
        if (path.includes('schedule')) {
            activeModule = 'Lịch học';
        } else if (path.includes('mark')) {
            activeModule = 'Báo cáo điểm';
        } else if (path.includes('attendance')) {
            activeModule = 'Báo cáo điểm danh';
        }

        document.querySelectorAll('.nav-item-btn').forEach(btn => {
            const mod = btn.dataset.module;
            if (mod === activeModule || (activeModule === 'Lịch học' && mod === 'Thời khóa biểu') || (activeModule === 'Báo cáo điểm' && mod === 'Báo cáo học tập')) {
                btn.classList.add('active');
            }
        });

        document.querySelectorAll('.quick-item-btn').forEach(btn => {
            const mod = btn.dataset.module;
            if ((activeModule === 'Lịch học' && (mod === 'Thời khóa biểu' || mod === 'Lịch học')) ||
                (activeModule === 'Báo cáo điểm' && (mod === 'Báo cáo điểm' || mod === 'Bảng điểm')) ||
                (activeModule === 'Báo cáo điểm danh' && mod === 'Báo cáo điểm danh')) {
                btn.style.borderColor = 'var(--fap-blue)';
                btn.style.fontWeight = '700';
            }
        });
    }

    // Subpage Handlers: Timetable Week Switcher
    const weekSelect = document.querySelector('#select-week');
    const btnPrevWeek = document.querySelector('#btn-prev-week');
    const btnNextWeek = document.querySelector('#btn-next-week');

    if (weekSelect) {
        btnPrevWeek?.addEventListener('click', () => {
            if (weekSelect.selectedIndex > 0) {
                weekSelect.selectedIndex--;
            }
        });
        btnNextWeek?.addEventListener('click', () => {
            if (weekSelect.selectedIndex < weekSelect.options.length - 1) {
                weekSelect.selectedIndex++;
            }
        });
    }

    // Initialize News, Student Data & Active Nav
    renderNewsList();
    applyStudentDataToDOM();
    highlightActiveNavigation();

})();
