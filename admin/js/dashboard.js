document.addEventListener('DOMContentLoaded', () => {
    // Determine current page context
    const isDashboard = window.location.pathname.includes('dashboard.html');
    if (!isDashboard) return;

    function populateStats() {
        const bookings = JSON.parse(localStorage.getItem('provolt_bookings') || '[]');
        const messages = JSON.parse(localStorage.getItem('provolt_messages') || '[]');
        const services = JSON.parse(localStorage.getItem('provolt_services') || '[]');

        const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
        const completedJobs = bookings.filter(b => b.status === 'Completed').length;

        document.getElementById('stat-total-bookings').textContent = bookings.length;
        document.getElementById('stat-pending').textContent = pendingBookings;
        document.getElementById('stat-completed').textContent = completedJobs;
        document.getElementById('stat-messages').textContent = messages.length;
        document.getElementById('stat-services').textContent = services.length;

        // Populate recent activity
        const recentActivityBody = document.getElementById('recent-activity-body');
        if (recentActivityBody) {
            recentActivityBody.innerHTML = '';
            // Get 5 most recent bookings
            const recent = [...bookings].reverse().slice(0, 5);
            
            if (recent.length === 0) {
                recentActivityBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No recent activity</td></tr>';
                return;
            }

            recent.forEach(b => {
                const dateObj = new Date(b.created);
                const badgeClass = b.status === 'Pending' ? 'badge-pending' : (b.status === 'Completed' ? 'badge-completed' : 'badge-progress');
                
                recentActivityBody.innerHTML += `
                    <tr>
                        <td>${b.id}</td>
                        <td>${b.customer || b.name}</td>
                        <td>${b.service}</td>
                        <td><span class="badge ${badgeClass}">${b.status}</span></td>
                        <td>${dateObj.toLocaleDateString()}</td>
                    </tr>
                `;
            });
        }
    }

    populateStats();

    // Listen for changes from other tabs (New Customer Bookings/Messages)
    window.addEventListener('storage', (e) => {
        if (e.key === 'provolt_bookings' || e.key === 'provolt_messages' || e.key === 'provolt_services') {
            populateStats();
        }
    });
});

