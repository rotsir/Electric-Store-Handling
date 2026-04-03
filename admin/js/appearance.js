document.addEventListener('DOMContentLoaded', () => {
    
    // Default Fallbacks
    const defaultAppearance = {
        theme: 'default',
        staff1: 'https://images.unsplash.com/photo-1542013936693-8846ba86008c?auto=format&fit=crop&w=400&q=80',
        staff2: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=400&q=80',
        staff3: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80',
        colorPrimary: '#f4b400',
        colorDominant: '#1a1a1a',
        colorSurface: '#f9f9f9'
    };

    function loadAppearance() {
        const stored = localStorage.getItem('provolt_appearance');
        const appearance = stored ? JSON.parse(stored) : defaultAppearance;

        document.getElementById('staff-1-url').value = appearance.staff1 || '';
        document.getElementById('staff-2-url').value = appearance.staff2 || '';
        document.getElementById('staff-3-url').value = appearance.staff3 || '';

        // Colors
        document.getElementById('color-primary').value = appearance.colorPrimary || defaultAppearance.colorPrimary;
        document.getElementById('color-dominant').value = appearance.colorDominant || defaultAppearance.colorDominant;
        document.getElementById('color-surface').value = appearance.colorSurface || defaultAppearance.colorSurface;
        
        previewAppearance();
    }

    // --- Live Preview Engine ---
    function previewAppearance() {
        const primary = document.getElementById('color-primary').value;
        const dominant = document.getElementById('color-dominant').value;
        const surface = document.getElementById('color-surface').value;

        // Apply to Admin Sidebar & Headers for visual feedback
        document.documentElement.style.setProperty('--admin-primary', primary);
        // If dominant is too light/dark, apply to sidebar bg
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.backgroundColor = dominant;
    }

    // Attach listeners for "Live" effect
    ['color-primary', 'color-dominant', 'color-surface'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', previewAppearance);
    });

    loadAppearance();

    const customThemeForm = document.getElementById('custom-theme-form');
    customThemeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveAppearance();
        alert('Custom Colors applied successfully!');
    });

    const resetColorsBtn = document.getElementById('reset-colors');
    resetColorsBtn.addEventListener('click', () => {
        document.getElementById('color-primary').value = defaultAppearance.colorPrimary;
        document.getElementById('color-dominant').value = defaultAppearance.colorDominant;
        document.getElementById('color-surface').value = defaultAppearance.colorSurface;
        previewAppearance();
        saveAppearance();
        alert('Colors reset to brand defaults.');
    });

    const staffForm = document.getElementById('staff-form');
    staffForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveAppearance();
        alert('Team Pictures successfully synchronized!');
    });

    function saveAppearance() {
        const payload = {
            staff1: document.getElementById('staff-1-url').value.trim() || defaultAppearance.staff1,
            staff2: document.getElementById('staff-2-url').value.trim() || defaultAppearance.staff2,
            staff3: document.getElementById('staff-3-url').value.trim() || defaultAppearance.staff3,
            colorPrimary: document.getElementById('color-primary').value,
            colorDominant: document.getElementById('color-dominant').value,
            colorSurface: document.getElementById('color-surface').value
        };

        localStorage.setItem('provolt_appearance', JSON.stringify(payload));
        // Also fire storage event for this tab if needed (though browser does it automatically for other tabs)
    }

});



