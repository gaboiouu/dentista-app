import React, { useEffect } from 'react';
import axios from 'axios';
import { Dentist } from '../types';

interface DentistaListProps {
  dentistas: Dentist[];
  onEdit: (dentist: Dentist) => void;
  onDelete: (id: number) => void;
}

const DentistaList: React.FC<DentistaListProps> = ({ dentistas, onEdit, onDelete }) => {
  useEffect(() => {
    // Aquí podrías agregar lógica adicional si es necesario
  }, [dentistas]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/clinicadental/dentistas/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error al eliminar el dentista:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Dentistas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dentistas.map((dentista) => (
            <tr key={dentista.id}>
              <td>{dentista.nombre}</td>
              <td>{dentista.apellido}</td>
              <td>{dentista.especialidad}</td>
              <td>
                <button onClick={() => onEdit(dentista)}>Editar</button>
                <button onClick={() => handleDelete(dentista.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DentistaList;