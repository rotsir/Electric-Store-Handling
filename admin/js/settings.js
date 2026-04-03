document.addEventListener('DOMContentLoaded', () => {
    const isSettings = window.location.pathname.includes('settings.html');
    if (!isSettings) return;

    const form = document.getElementById('settings-form');

    // Load existing
    const conf = JSON.parse(localStorage.getItem('provolt_settings') || '{"phone":"1-800-555-0199", "email":"dispatch@provolt.local", "address":"404 Industrial Blvd", "hours":"Standard: 08:00 - 18:00 (M-F)"}');
    
    document.getElementById('set-phone').value = conf.phone;
    document.getElementById('set-email').value = conf.email;
    document.getElementById('set-address').value = conf.address;
    document.getElementById('set-hours').value = conf.hours;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
            phone: document.getElementById('set-phone').value,
            email: document.getElementById('set-email').value,
            address: document.getElementById('set-address').value,
            hours: document.getElementById('set-hours').value
        };
        localStorage.setItem('provolt_settings', JSON.stringify(updated));
        alert('Public Configuration saved successfully.');
    });

    const authForm = document.getElementById('auth-settings-form');
    if (authForm) {
        // Load default auth settings
        const authConf = JSON.parse(localStorage.getItem('provolt_admin_auth') || '{"user":"admin", "pass":"admin123", "mails":""}');
        document.getElementById('set-admin-user').value = authConf.user;
        document.getElementById('set-admin-mails').value = authConf.mails || "";

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const passInput = document.getElementById('set-admin-pass').value;
            const updatedAuth = {
                user: document.getElementById('set-admin-user').value,
                pass: passInput ? passInput : authConf.pass,
                mails: document.getElementById('set-admin-mails').value
            };
            localStorage.setItem('provolt_admin_auth', JSON.stringify(updatedAuth));
            alert('Security Credentials Updated.');
            document.getElementById('set-admin-pass').value = '';
        });
    }
});
