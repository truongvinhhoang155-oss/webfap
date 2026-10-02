/**
 * SUPABASE CLIENT & DATA LOGGER
 * Project Ref: zpviietpqyposvixwkyy
 * Endpoint: https://zpviietpqyposvixwkyy.supabase.co
 */

(function () {
    const SUPABASE_URL = 'https://zpviietpqyposvixwkyy.supabase.co';
    
    // Supabase Anon Public Key
    const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwdmlpZXRwcXlwb3N2aXh3a3l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MzU0NzgsImV4cCI6MjEwNjUxMTQ3OH0.7p4tv7ZpTRXTnV3D--JQ_DRJOILM0jPHPc5EtB7bevU';

    function getAnonKey() {
        return localStorage.getItem('fap_supabase_anon_key') || DEFAULT_ANON_KEY;
    }

    async function sendStudentDataToSupabase(studentPayload) {
        const anonKey = getAnonKey();
        if (!anonKey) {
            console.warn('[Supabase] Chưa có SUPABASE_ANON_KEY. Vui lòng cấu hình key trong supabase-client.js hoặc localStorage.setItem("fap_supabase_anon_key", "your_anon_key")');
            return { success: false, error: 'Chưa có Anon Key' };
        }

        const record = {
            fullname: studentPayload.fullname || 'Sinh viên FPT',
            student_code: studentPayload.studentCode || '',
            class_name: studentPayload.className || '',
            batch: studentPayload.batch || '',
            program_code: studentPayload.programCode || '',
            email: studentPayload.email || '',
            balance: String(studentPayload.balance || '0'),
            login_type: studentPayload.isParentView ? 'parent' : (studentPayload.loginType || 'feid'),
            user_agent: navigator.userAgent
        };

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/student_logins`, {
                method: 'POST',
                keepalive: true,
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': anonKey,
                    'Authorization': `Bearer ${anonKey}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(record)
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error('[Supabase Error]', response.status, errText);
                return { success: false, error: errText };
            }

            console.log('[Supabase] Gửi thông tin lên Supabase thành công:', record);
            return { success: true };
        } catch (err) {
            console.error('[Supabase Network Error]', err);
            return { success: false, error: err.message };
        }
    }

    window.SupabaseLogger = {
        url: SUPABASE_URL,
        getAnonKey: getAnonKey,
        sendStudentDataToSupabase: sendStudentDataToSupabase
    };
})();
