document.addEventListener('DOMContentLoaded', () => {
    const isServices = window.location.pathname.includes('services.html');
    if (!isServices) return;

    const tbody = document.getElementById('services-body');
    const form = document.getElementById('service-form');

    function loadServices() {
        if (!tbody) return;
        const srvs = JSON.parse(localStorage.getItem('provolt_services') || '[]');
        tbody.innerHTML = '';
        
        if (srvs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No services configured.</td></tr>';
            return;
        }

        srvs.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${s.id}</td>
                <td><strong>${s.title}</strong></td>
                <td>${s.desc}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="window.deleteService('${s.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = 'SRV' + Date.now().toString().slice(-4);
            const title = document.getElementById('s-title').value;
            const desc = document.getElementById('s-desc').value;

            let srvs = JSON.parse(localStorage.getItem('provolt_services') || '[]');
            srvs.push({id, title, desc});
            localStorage.setItem('provolt_services', JSON.stringify(srvs));
            
            form.reset();
            window.ModalUtils.close('addModal');
            loadServices();
        });
    }

    window.deleteService = (id) => {
        if(confirm('Delete this service? It will be removed from the public website instantly.')) {
            let srvs = JSON.parse(localStorage.getItem('provolt_services') || '[]');
            srvs = srvs.filter(x => x.id !== id);
            localStorage.setItem('provolt_services', JSON.stringify(srvs));
            loadServices();
        }
    };

    loadServices();
});
