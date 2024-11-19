import React, { useState, useEffect } from 'react';
import './App.css';
import DentistaForm from './components/DentistaForm';
import DentistaList from './components/DentistaList';
import { Dentist } from './types';
import axios from 'axios';

function App() {
  const [currentDentist, setCurrentDentist] = useState<Dentist | null>(null);
  const [dentistas, setDentistas] = useState<Dentist[]>([]);

  useEffect(() => {
    // Fetch initial list of dentists from the backend
    const fetchDentistas = async () => {
      try {
        const response = await axios.get('/clinicadental/dentistas');
        setDentistas(response.data);
      } catch (error) {
        console.error('Error fetching dentistas:', error);
      }
    };

    fetchDentistas();
  }, []);

  const handleAddDentist = (dentist: Dentist) => {
    setDentistas([...dentistas, dentist]);
  };

  const handleUpdateDentist = (dentist: Dentist) => {
    setDentistas(dentistas.map(d => (d.id === dentist.id ? dentist : d)));
    setCurrentDentist(null);
  };

  const handleEditDentist = (dentist: Dentist) => {
    setCurrentDentist(dentist);
  };

  const handleDeleteDentist = async (id: number) => {
    try {
      await axios.delete(`/clinicadental/dentistas/${id}`);
      setDentistas(dentistas.filter(d => d.id !== id));
    } catch (error) {
      console.error('Error deleting dentist:', error);
    }
  };

  const handleCancelEdit = () => {
    setCurrentDentist(null);
  };

  return (
    <div className="container">
      <h1>Registro de Dentistas</h1>
      <div className="card">
        <DentistaForm
          onSubmit={currentDentist ? handleUpdateDentist : handleAddDentist}
          initialData={currentDentist || undefined}
        />
      </div>
      <div className="card">
        <DentistaList
          dentistas={dentistas}
          onEdit={handleEditDentist}
          onDelete={handleDeleteDentist}
        />
      </div>
    </div>
  );
}

export default App;