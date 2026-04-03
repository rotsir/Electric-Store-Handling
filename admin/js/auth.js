// Authentication Logic & Route Protection
document.addEventListener('DOMContentLoaded', () => {
    
    const isLoginPage = window.location.pathname.includes('login.html');
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

    // Route Protection
    if (!isLoginPage && !isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    if (isLoginPage && isLoggedIn) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Login Form Handler
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('username').value;
            const pass = document.getElementById('password').value;
            const errorElement = document.getElementById('login-error');

            const authConf = JSON.parse(localStorage.getItem('provolt_admin_auth') || '{"user":"admin", "pass":"admin123"}');

            if (user === authConf.user && pass === authConf.pass) {
                sessionStorage.setItem('admin_logged_in', 'true');
                window.location.href = 'dashboard.html';
            } else {
                errorElement.style.display = 'block';
                errorElement.textContent = 'Invalid credentials';
            }
        });
    }

    // Logout Handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('admin_logged_in');
            window.location.href = 'login.html';
        });
    }

});

// Global UI utilities (Modals)
window.ModalUtils = {
    open: (id) => {
        const modal = document.getElementById(id);
        if(modal) modal.classList.add('active');
    },
    close: (id) => {
        const modal = document.getElementById(id);
        if(modal) modal.classList.remove('active');
    }
}
