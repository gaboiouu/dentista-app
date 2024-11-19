import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dentist } from '../types';

interface DentistFormProps {
  onSubmit: (dentist: Dentist) => void;
  initialData?: Dentist;
}

const DentistaForm: React.FC<DentistFormProps> = ({ onSubmit, initialData }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [apellido, setApellido] = useState(initialData?.apellido || '');
  const [especialidad, setEspecialidad] = useState(initialData?.especialidad || '');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setApellido(initialData.apellido);
      setEspecialidad(initialData.especialidad);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dentistData = { nombre, apellido, especialidad };
    try {
      if (initialData) {
        // Actualizar dentista existente
        await axios.put(`/clinicadental/dentistas/${initialData.id}`, dentistData);
        onSubmit({ ...initialData, nombre, apellido, especialidad });
      } else {
        // Agregar nuevo dentista
        const response = await axios.post('/clinicadental/dentistas', dentistData);
        onSubmit({ ...dentistData, id: response.data.id });
      }
      setNombre('');
      setApellido('');
      setEspecialidad('');
    } catch (error) {
      console.error('Error al registrar el dentista:', error);
    }
  };

  return (
    <div>
      <h2>{initialData ? 'Actualizar Dentista' : 'Registrar Dentista'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div>
          <label>Especialidad:</label>
          <input type="text" name="especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
        </div>
        <button type="submit">{initialData ? 'Actualizar' : 'Registrar'}</button>
      </form>
    </div>
  );
};

export default DentistaForm;