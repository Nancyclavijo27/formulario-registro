// validations.js

const validateName = (name) => {
    return name.trim() !== '' ? null : 'El nombre es obligatorio';
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'El correo electrónico no es válido';
  };
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password)
      ? null
      : 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número';
  };
  
  const validateForm = (userData) => {
    const errors = {};
  
    errors.name = validateName(userData.name);
    errors.email = validateEmail(userData.email);
    errors.password = validatePassword(userData.password);
  
    return errors;
  };
  
  export default validateForm;
  