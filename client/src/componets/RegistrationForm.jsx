import React, { useState } from 'react';
import axios from 'axios';
import validateForm from './validations';
import './registrationFormStyles.css';

// Define la URL del backend según el entorno
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const RegistrationForm = () => {
  const initialUserData = {
    name: '',
    email: '',
    password: ''
  };

  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [emailResponseMessage, setEmailResponseMessage] = useState(null);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Antes de la validación y envío de solicitud');

    // Validar el formulario antes de enviar la solicitud
    const validationErrors = validateForm(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores de validación, no enviar la solicitud
      return;
    }

    try {
      // Enviar la solicitud a la API
      const response = await axios.post(`${apiUrl}/users/register`, userData);


      // Manejar la respuesta de la API
      if (response.data && response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setEmailResponseMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
    console.log('Después del envío de solicitud');
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit">Registrar</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {emailResponseMessage && <p className="error-message">{emailResponseMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
