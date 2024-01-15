import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log(response.data);
      // Muestra un mensaje de éxito al usuario
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      // Muestra un mensaje de error con información relevante
    }
  };

  return (
    <div>
      <form onSubmit={handleRegistration}>
        {/* Campos del formulario y validaciones aquí */}
        <label>
          Nombre:
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Correo Electrónico:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
