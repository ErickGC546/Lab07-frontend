export const validation = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        return 'El correo electrónico es obligatorio';
      }
      if (!emailRegex.test(value)) {
        return 'Ingrese un correo electrónico válido';
      }
      return '';
    },
  
    password: (value) => {
      if (!value) {
        return 'La contraseña es obligatoria';
      }
      if (value.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
      return '';
    },
  
    username: (value) => {
      if (!value) {
        return 'El nombre de usuario es obligatorio';
      }
      if (value.length < 3) {
        return 'El nombre de usuario debe tener al menos 3 caracteres';
      }
      return '';
    },
  
    confirmPassword: (value, password) => {
      if (!value) {
        return 'Debe confirmar la contraseña';
      }
      if (value !== password) {
        return 'Las contraseñas no coinciden';
      }
      return '';
    },
  
    validateForm: (form, fields) => {
      const errors = {};
      let isValid = true;
  
      for (const field of fields) {
        if (field === 'confirmPassword') {
          const error = validation.confirmPassword(form.confirmPassword, form.password);
          if (error) {
            errors.confirmPassword = error;
            isValid = false;
          }
        } else if (field in validation && typeof validation[field] === 'function') {
          const error = validation[field](form[field]);
          if (error) {
            errors[field] = error;
            isValid = false;
          }
        }
      }
  
      return { isValid, errors };
    }
  };