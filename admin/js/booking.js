document.addEventListener('DOMContentLoaded', () => {
    const isBookings = window.location.pathname.includes('bookings.html');
    if (!isBookings) return;

    const tbody = document.getElementById('bookings-body');
    const searchInput = document.getElementById('search-bookings');
    const filterSelect = document.getElementById('filter-status');

    let bookings = [];

    function loadBookings() {
        bookings = JSON.parse(localStorage.getItem('provolt_bookings') || '[]');
        renderTable();
    }

    function renderTable() {
        if (!tbody) return;
        tbody.innerHTML = '';
        
        let filtered = bookings.reverse();
        
        if (searchInput.value) {
            const term = searchInput.value.toLowerCase();
            filtered = filtered.filter(b => (b.name || '').toLowerCase().includes(term) || b.id.toLowerCase().includes(term));
        }

        if (filterSelect.value !== '') {
            filtered = filtered.filter(b => b.status === filterSelect.value);
        }

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No bookings found.</td></tr>';
            return;
        }

        filtered.forEach(b => {
            let badgeClass = 'badge-progress';
            switch(b.status) {
                case 'Pending': badgeClass = 'badge-pending'; break;
                case 'Booked': badgeClass = 'badge-approved'; break;
                case 'Surveyed': badgeClass = 'badge-info'; break;
                case 'Repairing Process': badgeClass = 'badge-progress'; break;
                case 'Completed': badgeClass = 'badge-completed'; break;
                case 'Cancelled': badgeClass = 'badge-danger'; break;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${b.id}</td>
                <td>${b.name}</td>
                <td>${b.service}</td>
                <td>${b.date}</td>
                <td><span class="badge ${badgeClass}">${b.status}</span></td>
                <td>
                    <select onchange="window.updateStatus('${b.id}', this.value)" class="form-control" style="width: auto; display: inline-block;">
                        <option value="Pending" ${b.status==='Pending'?'selected':''}>Pending</option>
                        <option value="Booked" ${b.status==='Booked'?'selected':''}>Booked</option>
                        <option value="Surveyed" ${b.status==='Surveyed'?'selected':''}>Surveyed</option>
                        <option value="Repairing Process" ${b.status==='Repairing Process'?'selected':''}>Repairing</option>
                        <option value="Completed" ${b.status==='Completed'?'selected':''}>Completed</option>
                        <option value="Cancelled" ${b.status==='Cancelled'?'selected':''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="window.viewBooking('${b.id}')">View</button>
                    <button class="btn btn-sm btn-danger" onclick="window.deleteBooking('${b.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.updateStatus = (id, newStatus) => {
        let bs = JSON.parse(localStorage.getItem('provolt_bookings') || '[]');
        const idx = bs.findIndex(x => x.id === id);
        if(idx > -1) {
            bs[idx].status = newStatus;
            localStorage.setItem('provolt_bookings', JSON.stringify(bs));
            loadBookings();
        }
    };

    window.deleteBooking = (id) => {
        if(confirm('Are you sure you want to delete this booking?')) {
            let bs = JSON.parse(localStorage.getItem('provolt_bookings') || '[]');
            bs = bs.filter(x => x.id !== id);
            localStorage.setItem('provolt_bookings', JSON.stringify(bs));
            loadBookings();
        }
    };

    window.viewBooking = (id) => {
        const b = bookings.find(x => x.id === id);
        if(!b) return;
        document.getElementById('modal-detail-content').innerHTML = `
            <p><strong>ID:</strong> ${b.id}</p>
            <p><strong>Name:</strong> ${b.name}</p>
            <p><strong>Phone:</strong> ${b.phone}</p>
            <p><strong>Email:</strong> ${b.email || 'N/A'}</p>
            <p><strong>Service:</strong> ${b.service}</p>
            <p><strong>Pref. Date:</strong> ${b.date}</p>
            <p><strong>Status:</strong> ${b.status}</p>
            <p><strong>Created:</strong> ${new Date(b.created).toLocaleString()}</p>
            <hr style="margin: 1rem 0;">
            <div class="form-group">
                <label style="font-weight: 600;">Allocated Survey/Repair Time</label>
                <input type="text" id="allocate-time-${b.id}" class="form-control" value="${b.allocatedTime || ''}" placeholder="e.g. Oct 25, 2:00 PM - 4:00 PM">
                <button class="btn btn-sm btn-primary" style="margin-top: 0.5rem;" onclick="window.saveAllocation('${b.id}')">Save Allocation Time</button>
            </div>
        `;
        window.ModalUtils.open('viewModal');
    };

    window.saveAllocation = (id) => {
        const timeVal = document.getElementById('allocate-time-' + id).value;
        let bs = JSON.parse(localStorage.getItem('provolt_bookings') || '[]');
        const idx = bs.findIndex(x => x.id === id);
        if(idx > -1) {
            bs[idx].allocatedTime = timeVal;
            localStorage.setItem('provolt_bookings', JSON.stringify(bs));
            alert('Allocated survey/repair time successfully saved.');
            loadBookings();
        }
    };

    searchInput.addEventListener('input', renderTable);
    filterSelect.addEventListener('change', renderTable);

    loadBookings();
});
