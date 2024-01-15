import React, { useState } from 'react';
import axios from 'axios';
import validateForm from './validations';

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Actualiza los errores cuando el usuario escribe
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    const formErrors = validateForm(userData);
    if (Object.values(formErrors).some((error) => error !== null)) {
      // Si hay errores, actualiza el estado de los errores y no envíes la solicitud
      setErrors(formErrors);
      setSuccessMessage(null); // Reinicia el mensaje de éxito si había uno previo
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log(response.data);

      // Muestra un mensaje de éxito al usuario
      setSuccessMessage(response.data.message);
      setErrors({}); // Reinicia los errores

    } catch (error) {
      console.error(error.response.data);

      // Muestra un mensaje de error con información relevante
      setSuccessMessage(null); // Reinicia el mensaje de éxito
      setErrors({ general: 'Error al registrar usuario' }); // Un mensaje de error general
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
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
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </label>
      </div>
      <button type="submit">Registrarse</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </form>
  );
};

export default RegistrationForm;
