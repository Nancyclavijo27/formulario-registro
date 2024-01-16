// validations.js

// Función para validar el nombre
const validateName = (name) => {
    // Verifica que el nombre no esté vacío
    return name.trim() !== '' ? null : 'El nombre es obligatorio';
  };
  
  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    // Expresión regular para verificar un formato de correo electrónico básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Verifica si el correo electrónico sigue el formato esperado
    return emailRegex.test(email) ? null : 'El correo electrónico no es válido';
  };
  
  // Función para validar la contraseña
  const validatePassword = (password) => {
    // Expresión regular para requerir al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // Verifica si la contraseña sigue el formato esperado
    return passwordRegex.test(password)
      ? null
      : 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número';
  };
  
  // Función principal que realiza validaciones en todos los campos del formulario
  const validateForm = (userData) => {
    const errors = {};
  
    // Ejecuta cada función de validación y almacena los resultados en el objeto de errores
    errors.name = validateName(userData.name);
    errors.email = validateEmail(userData.email);
    errors.password = validatePassword(userData.password);
  
    // Devuelve el objeto de errores resultante
    return errors;
  };
  
  // Exporta la función de validación del formulario
  export default validateForm;
  