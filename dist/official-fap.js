/**
 * OFFICIAL FAP CLIENT ENGINE
 * Handles dynamic student data binding, theme toggle, interactive menus,
 * authentication guard, and routing between FAP portal subpages.
 */

(function () {
    'use strict';

    // ==========================================
    // 0. AUTHENTICATION GUARD
    // ==========================================
    const isLoginPage = window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('login');
    const isAuth = localStorage.getItem('fap_is_authenticated') === 'true';
    const studentDataRaw = localStorage.getItem('fap_student_data');

    if (!isLoginPage && (!isAuth || !studentDataRaw)) {
        console.warn('[AUTH GUARD] Chưa đăng nhập! Chuyển hướng đến login.html');
        window.location.replace('login.html');
        return;
    }

    // ==========================================
    // 1. DYNAMIC STUDENT DATA BINDING
    // ==========================================
    function getInitials(name) {
        if (!name || name === 'Sinh viên' || name === 'Sinh viên FPT') return 'SV';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function getCurrentStudentData() {
        const raw = localStorage.getItem('fap_student_data');
        let student = {
            fullname: 'Sinh viên FPT',
            studentCode: 'MSSV',
            className: 'Lớp học',
            batch: 'Khóa',
            programCode: 'Chương trình',
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

        // 1. Topbar
        const headerAvatar = document.querySelector('#header-avatar');
        if (headerAvatar) headerAvatar.textContent = getInitials(student.fullname);

        const headerFullname = document.querySelector('#header-fullname');
        if (headerFullname) headerFullname.textContent = student.fullname;

        const headerCode = document.querySelector('#header-student-code');
        if (headerCode) headerCode.textContent = student.studentCode;

        // Profile dropdown items
        document.querySelectorAll('.profile-dropdown h6.text-overflow').forEach(el => el.textContent = student.fullname);
        document.querySelectorAll('.profile-dropdown small.text-muted').forEach(el => el.textContent = student.studentCode);

        // 2. Student Hero Card (Index)
        const heroName = document.querySelector('#hero-student-name');
        if (heroName) heroName.textContent = student.fullname;

        const heroCode = document.querySelector('#hero-student-code');
        if (heroCode) heroCode.textContent = student.studentCode;

        // 3. Fact Metrics (Index)
        const factCode = document.querySelector('#fact-code');
        if (factCode) factCode.textContent = student.programCode || student.className;

        const factEmail = document.querySelector('#fact-email');
        if (factEmail) factEmail.textContent = student.email;

        const factBatch = document.querySelector('#fact-batch');
        if (factBatch) factBatch.textContent = student.batch;

        const factBalance = document.querySelector('#fact-balance');
        if (factBalance) {
            const rawBal = student.balance !== undefined ? String(student.balance).trim() : '0';
            factBalance.textContent = rawBal + ' ';
            if (rawBal.startsWith('-')) {
                factBalance.style.color = '#ef4444';
            } else {
                factBalance.style.color = '#0d9488';
            }
        }

        // 4. Dynamic Class & Teacher Replacements across Subpages
        const currentClass = student.className || 'Lớp học';
        const currentProgram = student.programCode || 'Chương trình đào tạo';

        // Transcript crumb & title
        document.querySelectorAll('.fap-page-title__crumb-current').forEach(el => {
            if (el.textContent.includes('transcript')) {
                el.textContent = `Grade report for transcript ${currentClass} - ${currentProgram}`;
            }
        });

        const teacherMap = {
            'DaoNTA14': 'ChiPTT',
            'DiepTM11': 'HoangNQ',
            'NhanTDT': 'VuongLQ',
            'SonNT5': 'ThayCaCaC',
            'longnx6': 'TienNH21'
        };

        // Walk DOM text nodes in result cards / timetables to replace class and teacher names
        const containers = document.querySelectorAll('.card-body, .card-header, .table-responsive, .academic-report-course-select, main, #main-content');
        containers.forEach(box => {
            const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue) {
                    if (node.nodeValue.includes('IA21A01') && currentClass !== 'IA21A01') {
                        node.nodeValue = node.nodeValue.replace(/IA21A01/g, currentClass);
                    }
                    if (node.nodeValue.includes('BIT_IA_21A') && currentProgram !== 'BIT_IA_21A') {
                        node.nodeValue = node.nodeValue.replace(/BIT_IA_21A/g, currentProgram);
                    }
                    if (node.nodeValue.includes('SE21A04')) {
                        node.nodeValue = node.nodeValue.replace(/SE21A04/g, currentClass);
                    }
                    if (node.nodeValue.includes('BIT_SE_21A')) {
                        node.nodeValue = node.nodeValue.replace(/BIT_SE_21A/g, currentProgram);
                    }
                    if (node.nodeValue.includes('SWE202c_1')) {
                        node.nodeValue = node.nodeValue.replace(/SWE202c_1/g, currentClass);
                    }
                    for (const [oldT, newT] of Object.entries(teacherMap)) {
                        if (node.nodeValue.includes(oldT)) {
                            node.nodeValue = node.nodeValue.replace(new RegExp(oldT, 'g'), newT);
                        }
                    }
                }
            }
        });

        // 5. Dynamic bindings for Account & Finance pages
        const profileFullname = document.querySelector('#profile-fullname');
        if (profileFullname) profileFullname.textContent = student.fullname;

        const profileCode = document.querySelector('#profile-studentcode');
        if (profileCode) profileCode.textContent = student.studentCode;

        const profileBasicName = document.querySelector('#profile-basic-fullname');
        if (profileBasicName) profileBasicName.textContent = student.fullname;

        const profileBasicCode = document.querySelector('#profile-basic-studentcode');
        if (profileBasicCode) profileBasicCode.textContent = student.studentCode;

        const profileAvatarLarge = document.querySelector('#profile-avatar-large');
        if (profileAvatarLarge) profileAvatarLarge.textContent = getInitials(student.fullname);

        const profileEmail = document.querySelector('#profile-email');
        if (profileEmail) profileEmail.textContent = student.email;

        const profileClass = document.querySelector('#profile-class');
        if (profileClass) profileClass.textContent = currentClass;

        const profileBalance = document.querySelector('#profile-balance');
        if (profileBalance) {
            profileBalance.textContent = (student.balance || '0') + ' VND';
            if (String(student.balance).startsWith('-')) {
                profileBalance.className = 'ms-2 fw-bold text-danger';
            } else {
                profileBalance.className = 'ms-2 fw-bold text-success';
            }
        }

        const financeWallet = document.querySelector('#finance-wallet-balance');
        if (financeWallet) {
            financeWallet.textContent = (student.balance || '0') + ' VND';
            if (String(student.balance).startsWith('-')) {
                financeWallet.style.color = '#ef4444';
            } else {
                financeWallet.style.color = '#0d9488';
            }
        }

        // Account basic info fields
        document.querySelectorAll('[data-bind="fullname"]').forEach(el => el.textContent = student.fullname);
        document.querySelectorAll('[data-bind="studentCode"]').forEach(el => el.textContent = student.studentCode);
        document.querySelectorAll('[data-bind="email"]').forEach(el => el.textContent = student.email);
        document.querySelectorAll('[data-bind="className"]').forEach(el => el.textContent = currentClass);
        document.querySelectorAll('[data-bind="batch"]').forEach(el => el.textContent = student.batch);

        // Submit application student code & name fields
        document.querySelectorAll('input[readonly]').forEach(inp => {
            if (inp.value === 'Sinh viên FPT' || inp.getAttribute('data-field') === 'fullname') {
                inp.value = student.fullname;
            } else if (inp.value === 'MSSV' || inp.getAttribute('data-field') === 'studentCode') {
                inp.value = student.studentCode;
            }
        });

        // OJT & FYE Info lines
        const ojtStudentInfo = document.querySelector('#ojt-student-info');
        if (ojtStudentInfo) {
            ojtStudentInfo.innerHTML = `Sinh viên: <strong>${student.fullname}</strong> | MSSV: <strong>${student.studentCode}</strong> | Lớp: <strong>${currentClass}</strong> | Chuyên ngành: <strong>${student.programCode || 'Công nghệ thông tin'}</strong>`;
        }

        const fyeStudentInfo = document.querySelector('#fye-student-info');
        if (fyeStudentInfo) {
            fyeStudentInfo.innerHTML = `Sinh viên: <strong>${student.fullname}</strong> | Lớp: <strong>${currentClass}</strong>`;
        }

        console.log('[OFFICIAL FAP] Đã đồng bộ thông tin sinh viên:', student.fullname, `(${student.studentCode})`);
    }

    // ==========================================
    // 2. LOGOUT FUNCTIONALITY
    // ==========================================
    function logoutFap(e) {
        if (e && e.preventDefault) e.preventDefault();
        console.log('[OFFICIAL FAP] Đăng xuất...');
        localStorage.removeItem('fap_is_authenticated');
        localStorage.removeItem('fap_student_data');
        window.location.replace('login.html');
    }
    window.logoutFap = logoutFap;

    // Attach logout to all logout triggers
    document.addEventListener('click', (e) => {
        const logoutTrigger = e.target.closest('[data-action="logout"], a[href="login.html"], button[formaction="login.html"]');
        if (logoutTrigger) {
            e.preventDefault();
            logoutFap();
        }
    });

    // ==========================================
    // 3. DARK MODE TOGGLE (data-bs-theme)
    // ==========================================
    const themeBtn = document.querySelector('#light-dark-mode');
    const savedTheme = localStorage.getItem('fap_bs_theme') || 'light';
    applyTheme(savedTheme);

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'ri-sun-line fs-22';
            } else {
                icon.className = 'ri-moon-fill fs-22';
            }
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        document.documentElement.setAttribute('data-menu-color', theme);
        document.documentElement.setAttribute('data-topbar-color', theme);
        localStorage.setItem('fap_bs_theme', theme);
        updateThemeIcon(theme);
    }

    themeBtn?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });

    // ==========================================
    // 4. DROPDOWNS & NAVIGATION INTERACTION
    // ==========================================
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('[data-bs-toggle="dropdown"]');
        if (toggle) {
            e.preventDefault();
            e.stopPropagation();
            const parent = toggle.closest('.dropdown');
            const menu = parent?.querySelector('.dropdown-menu');
            const isShown = menu?.classList.contains('show');

            document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));

            if (!isShown && menu) {
                menu.classList.add('show');
            }
            return;
        }

        if (!e.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
        }
    });

    // Sidebar Menu Toggle Button
    const toggleMenuBtn = document.querySelector('.button-toggle-menu');
    toggleMenuBtn?.addEventListener('click', () => {
        const html = document.documentElement;
        const currentSize = html.getAttribute('data-sidenav-size');
        if (currentSize === 'condensed') {
            html.setAttribute('data-sidenav-size', 'default');
        } else {
            html.setAttribute('data-sidenav-size', 'condensed');
        }
        document.body.classList.toggle('sidebar-enable');
    });

    // Accordion group toggling in sidebar
    document.querySelectorAll('.side-nav-link[data-bs-toggle="collapse"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    const isOpen = target.classList.contains('show');
                    target.classList.toggle('show', !isOpen);
                    link.classList.toggle('collapsed', isOpen);
                }
            }
        });
    });

    // Fullscreen Toggle
    document.querySelector('[data-toggle="fullscreen"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        }
    });

    // Pinned News Modal Close
    document.querySelectorAll('[data-home-pinned-close="1"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.querySelector('#homePinnedNewsModal');
            if (modal) modal.hidden = true;
        });
    });

    document.querySelectorAll('[data-home-pinned-hide="1"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.querySelector('#homePinnedNewsModal');
            if (modal) modal.hidden = true;
            sessionStorage.setItem('hide_fap_pinned_modal', '1');
        });
    });

    // Subpage routing for Quick Menu and Sidebar Links
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href) return;

        if (anchor.getAttribute('data-bs-toggle')) return;
        if (anchor.getAttribute('data-action') === 'logout') return;

        if (href === '/' || href === 'index.html' || href.includes('Home')) {
            e.preventDefault();
            window.location.href = 'index.html';
        } else if (href.includes('WeeklyTimetable') || href.includes('schedule')) {
            e.preventDefault();
            window.location.href = 'schedule.html';
        } else if (href.includes('Report/Grade') || href.includes('mark')) {
            e.preventDefault();
            window.location.href = 'mark.html';
        } else if (href.includes('Report/Attendance') || href.includes('attendance')) {
            e.preventDefault();
            window.location.href = 'attendance.html';
        } else if (href.includes('Report/Transcript') || href.includes('transcript')) {
            e.preventDefault();
            window.location.href = 'transcript.html';
        } else if (href.includes('ExamSchedule') || href.includes('exam')) {
            e.preventDefault();
            window.location.href = 'exam.html';
        } else if (href.includes('OjtConditions') || href.includes('ojt')) {
            e.preventDefault();
            window.location.href = 'ojt.html';
        } else if (href.includes('ThesisConditions') || href.includes('thesis')) {
            e.preventDefault();
            window.location.href = 'thesis.html';
        } else if (href.includes('StudentRoomBooking') || href.includes('room')) {
            e.preventDefault();
            window.location.href = 'rooms.html';
        } else if (href.includes('Curriculum') || href.includes('curriculum')) {
            e.preventDefault();
            window.location.href = 'curriculum.html';
        } else if (href.includes('/Subject') || href.includes('subject')) {
            e.preventDefault();
            window.location.href = 'subjects.html';
        } else if (href.includes('Application/Catalog') || href.includes('submit-application')) {
            e.preventDefault();
            window.location.href = 'submit-application.html';
        } else if (href.includes('CrossClassChange') || href.includes('cross')) {
            e.preventDefault();
            window.location.href = 'cross-class.html';
        } else if (href.includes('FyeCheckInLog') || href.includes('fye')) {
            e.preventDefault();
            window.location.href = 'fye.html';
        } else if (href.includes('Account') || href.includes('Profile')) {
            e.preventDefault();
            window.location.href = 'account.html';
        } else if (href.includes('Application') || href.includes('application')) {
            e.preventDefault();
            window.location.href = 'application.html';
        } else if (href.includes('Payment') || href.includes('Transaction') || href.includes('ShoppingCart') || href.includes('finance')) {
            e.preventDefault();
            window.location.href = 'finance.html';
        } else if (href.includes('News') || href.includes('Document') || href.includes('news')) {
            e.preventDefault();
            window.location.href = 'news.html';
        }
    });

    // Initialize DOM with dynamic student data
    applyStudentDataToDOM();

})();
