document.addEventListener('DOMContentLoaded', () => {
    const isMessages = window.location.pathname.includes('messages.html');
    if (!isMessages) return;

    const tbody = document.getElementById('messages-body');

    function loadMessages() {
        if (!tbody) return;
        const messages = JSON.parse(localStorage.getItem('provolt_messages') || '[]');
        tbody.innerHTML = '';
        
        if (messages.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No messages found.</td></tr>';
            return;
        }

        [...messages].reverse().forEach(m => {
            const tr = document.createElement('tr');
            const badge = m.status === 'Unread' ? '<span class="badge badge-pending">Unread</span>' : '<span class="badge badge-completed">Read</span>';
            tr.innerHTML = `
                <td>${m.id}</td>
                <td>${m.name}</td>
                <td>${m.email}</td>
                <td>${badge}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="window.viewMessage('${m.id}')">Read</button>
                    <button class="btn btn-sm btn-danger" onclick="window.deleteMessage('${m.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.viewMessage = (id) => {
        let msgs = JSON.parse(localStorage.getItem('provolt_messages') || '[]');
        const idx = msgs.findIndex(x => x.id === id);
        if(idx > -1) {
            msgs[idx].status = 'Read';
            localStorage.setItem('provolt_messages', JSON.stringify(msgs));
            
            const m = msgs[idx];
            document.getElementById('modal-detail-content').innerHTML = `
                <p><strong>From:</strong> ${m.name} (${m.email})</p>
                <p><strong>Date:</strong> ${new Date(m.created).toLocaleString()}</p>
                <hr style="margin:1rem 0;">
                <p>${m.message}</p>
            `;
            window.ModalUtils.open('viewModal');
            loadMessages();
        }
    };

    window.deleteMessage = (id) => {
        if(confirm('Delete message?')) {
            let msgs = JSON.parse(localStorage.getItem('provolt_messages') || '[]');
            msgs = msgs.filter(x => x.id !== id);
            localStorage.setItem('provolt_messages', JSON.stringify(msgs));
            loadMessages();
        }
    };

    loadMessages();
});
