// Frontend component (ejemplo simplificado)
import React from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const handleRegistration = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', data);
      console.log(response.data);
      // Muestra un mensaje de éxito al usuario
    } catch (error) {
      console.error(error.response.data);
      // Muestra un mensaje de error con información relevante
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      {/* Campos del formulario y validaciones aquí */}
    </form>
  );
};

export default RegistrationForm;
