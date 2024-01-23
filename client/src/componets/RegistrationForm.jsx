import React, { useState } from 'react';
import axios from 'axios';
import validateForm from './validations';
import './registrationFormStyles.css';

const apiUrl = 'https://apiform-5lq3.onrender.com/api';

const RegistrationForm = () => {
  const initialUserData = {
    name: '',
    email: '',
    password: ''
  };

  const [userData, setUserData] = useState(initialUserData);

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({});

  // Estado para manejar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState(null);
  const [emailResponseMessage, setEmailResponseMessage] = useState(null);


  // Maneja el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Después de 5 segundos, reiniciar los mensajes y errores
    setTimeout(() => {
      setSuccessMessage(null);
      setEmailResponseMessage(null);
    }, 15000);


    // Limpia los errores cuando el usuario escribe
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null
    }));
  };

  // Maneja el evento de registro
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    const formErrors = validateForm(userData);
    if (Object.values(formErrors).some((error) => error !== null)) {
      // Si hay errores, actualiza el estado de los errores y no envía la solicitud
      setErrors(formErrors);
      setSuccessMessage(null); // Reinicia el mensaje de éxito si había uno previo
      setEmailResponseMessage(null);
      return;
    }

    try {
      // Envia la solicitud POST a la API para registrar al usuario
      const response = await axios.post( apiUrl , userData);
      console.log(response.data);

      // Muestra un mensaje de éxito al usuario
      setSuccessMessage(response.data.message);
      setEmailResponseMessage(response.data.emailMessage);
      setErrors({}); // Reinicia los errores
      setUserData(initialUserData); // Limpiar datos del formulario después del registro


    } catch (error) {
      console.error(error.response.data);

      // Muestra un mensaje de error con información relevante
      setSuccessMessage(null); // Reinicia el mensaje de éxito
      setEmailResponseMessage(null);
      setErrors({ general: 'Error al registrar usuario' }); // Un mensaje de error general
    }
  };

  // Renderiza el formulario
  return (
    <div >
      <form onSubmit={handleRegistration} className="registration-form">
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>
        </div>
        <div>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
        </div>
        <div>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
        </div>
        <button type="submit">Registrarse</button>

        {successMessage && <p className="success">{successMessage}</p>}
        {emailResponseMessage && <p className="success">{emailResponseMessage}</p>}
        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
