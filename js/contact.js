document.addEventListener('DOMContentLoaded', () => {
  const cForm = document.getElementById('contact-form');
  const v = window.ValidationUtil;
  
  if(cForm) {
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!v) {
        console.error('ValidationUtil not found');
        return;
      }

      v.clearAllErrors('contact-form');
      let valid = true;
      
      const nameInput = document.getElementById('c-name');
      const emailInput = document.getElementById('c-email');
      const messageInput = document.getElementById('c-message');

      if (!nameInput.value.trim()) {
        v.showError('c-name', 'Name is required'); 
        valid = false;
      }
      
      const email = emailInput.value.trim();
      if (!email || !v.isValidEmail(email)) {
        v.showError('c-email', 'Valid email required'); 
        valid = false;
      }
      
      if (!messageInput.value.trim()) {
        v.showError('c-message', 'Message is required'); 
        valid = false;
      }

      if(valid) {
        const messagePayload = {
          id: "MSG" + Date.now().toString().slice(-6),
          name: nameInput.value.trim(),
          email: email,
          message: messageInput.value.trim(),
          status: "Unread",
          created: new Date().toISOString()
        };
        
        const existingMessages = JSON.parse(localStorage.getItem('provolt_messages') || '[]');
        existingMessages.push(messagePayload);
        localStorage.setItem('provolt_messages', JSON.stringify(existingMessages));

        alert('Transmission sent successfully. Our dispatch will respond within 24 hours.');
        cForm.reset();
      }
    });
  }
});
