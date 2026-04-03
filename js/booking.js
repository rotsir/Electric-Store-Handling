// Booking specific logic

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  const v = window.ValidationUtil;

  // Dynamically populate services if configured in Admin
  const serviceSelect = document.getElementById('b-service');
  if (serviceSelect) {
    const srvs = JSON.parse(localStorage.getItem('provolt_services') || '[]');
    if (srvs.length > 0) {
      serviceSelect.innerHTML = '<option value="">-- Select Specific Capability --</option>';
      srvs.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.title;
        opt.textContent = s.title;
        serviceSelect.appendChild(opt);
      });
    }
  }

  if (bookingForm) {
    // Autofill / Recent Submission Tap logic
    const existingBookingsStr = localStorage.getItem('provolt_bookings');
    if (existingBookingsStr) {
      const parsedBookings = JSON.parse(existingBookingsStr);
      if (parsedBookings.length > 0) {
        const lastB = parsedBookings[parsedBookings.length - 1]; // get the most recent
        
        // Create the suggestion banner
        const autofillBanner = document.createElement('div');
        autofillBanner.style.background = 'var(--clr-border)';
        autofillBanner.style.padding = '1rem';
        autofillBanner.style.marginBottom = '1.5rem';
        autofillBanner.style.border = '2px dashed var(--clr-primary)';
        autofillBanner.style.cursor = 'pointer';
        autofillBanner.style.borderRadius = '4px';
        autofillBanner.style.display = 'flex';
        autofillBanner.style.alignItems = 'center';
        autofillBanner.style.justifyContent = 'space-between';
        autofillBanner.style.transition = 'opacity 0.3s';
        
        autofillBanner.innerHTML = `
          <div>
            <strong style="color: var(--clr-primary);">⚡ Recent Profile Detected</strong><br>
            <span style="font-size: 0.9rem;">Tap to autofill: <b>${lastB.name}</b> (${lastB.phone})</span>
          </div>
          <span style="font-size: 1.5rem;">+</span>
        `;
        
        autofillBanner.addEventListener('click', () => {
          document.getElementById('b-name').value = lastB.name || '';
          document.getElementById('b-phone').value = lastB.phone || '';
          document.getElementById('b-email').value = lastB.email || '';
          if(document.getElementById('b-address')) document.getElementById('b-address').value = lastB.address || '';
          
          autofillBanner.style.opacity = '0';
          setTimeout(() => autofillBanner.style.display = 'none', 300);
        });
        
        bookingForm.parentNode.insertBefore(autofillBanner, bookingForm);
      }
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      v.clearAllErrors('booking-form');
      
      let isValid = true;
      const name = document.getElementById('b-name').value.trim();
      const phone = document.getElementById('b-phone').value.trim();
      const email = document.getElementById('b-email').value.trim();
      const address = document.getElementById('b-address') ? document.getElementById('b-address').value.trim() : '';
      const service = document.getElementById('b-service').value;
      const date = document.getElementById('b-date').value;

      if (!name) {
        v.showError('b-name', 'Name is required');
        isValid = false;
      }

      if (!phone || !v.isValidPhone(phone)) {
        v.showError('b-phone', 'Valid phone number is required');
        isValid = false;
      }

      if (email && !v.isValidEmail(email)) {
        v.showError('b-email', 'Valid email is required');
        isValid = false;
      }

      if (!service) {
        v.showError('b-service', 'Please select a service');
        isValid = false;
      }

      if (!date) {
        v.showError('b-date', 'Please select a date');
        isValid = false;
      }

      if (isValid) {
        // Simulate API / Backend Submission
        const payload = {
          id: "BK" + Date.now().toString().slice(-6),
          name, phone, email, address, service, date, status: "Pending", created: new Date().toISOString()
        };
        
        // Save to Local Storage
        const existingBookings = JSON.parse(localStorage.getItem('provolt_bookings') || '[]');
        existingBookings.push(payload);
        localStorage.setItem('provolt_bookings', JSON.stringify(existingBookings));

        // Show Success Message
        showSuccessModal(payload.id);
        bookingForm.reset();
      }
    });

    function showSuccessModal(bookingId) {
      // Create custom industrial style popup overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(26,26,26,0.8)';
      overlay.style.zIndex = '9999';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';

      const modal = document.createElement('div');
      modal.className = 'popup-modal';
      modal.style.background = '#f9f9f9';
      modal.style.border = '4px solid #1a1a1a';
      modal.style.boxShadow = '8px 8px 0px #f4b400';
      modal.style.padding = '2rem';
      modal.style.maxWidth = '400px';
      modal.style.textAlign = 'center';

      modal.innerHTML = `
        <h2 style="font-family: Oswald, sans-serif; color: #1a1a1a; margin-bottom: 1rem; text-transform: uppercase;">Request Received</h2>
        <div style="background: var(--clr-primary); color: #1a1a1a; padding: 1rem; margin-bottom: 1rem; font-weight: bold; border-left: 5px solid #1a1a1a;">
          TICKET ID: <span style="font-size: 1.25rem;">${bookingId}</span>
        </div>
        <p style="margin-bottom: 2rem;">Your request is secure. Use this Ticket ID on the <a href="track.html" style="color: var(--clr-dominant); text-decoration: underline;">Tracking Terminal</a> to monitor your status.</p>
        <button class="btn btn-primary" id="close-modal-btn">CLOSE</button>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      document.getElementById('close-modal-btn').addEventListener('click', () => {
        overlay.remove();
      });
    }
  }
});
