// Generic Form Validation Utility

const ValidationUtil = {
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },
  
  isValidPhone: (phone) => {
    const re = /^[0-9\-\+\s]{7,15}$/;
    return re.test(phone);
  },

  showError: (elementId, message) => {
    const input = document.getElementById(elementId);
    if (!input) return;
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('error');
      const errorLabel = formGroup.querySelector('.error-message');
      if (errorLabel) errorLabel.textContent = message;
    }
  },

  clearError: (elementId) => {
    const input = document.getElementById(elementId);
    if (!input) return;
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.remove('error');
    }
  },
  
  clearAllErrors: (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;
    const groups = form.querySelectorAll('.form-group.error');
    groups.forEach(g => g.classList.remove('error'));
  }
};

window.ValidationUtil = ValidationUtil;
