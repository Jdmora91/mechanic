import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentsContext = createContext();

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments debe ser usado dentro de AppointmentsProvider');
  }
  return context;
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Cargar citas desde localStorage al iniciar
  useEffect(() => {
    const savedAppointments = localStorage.getItem('mechtruck-appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Guardar en localStorage cuando cambien las citas
  useEffect(() => {
    localStorage.setItem('mechtruck-appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Agregar nueva cita
  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      date: new Date(appointmentData.date).toISOString().split('T')[0]
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment.id;
  };

  // Eliminar cita
  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  // Obtener citas de hoy
  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(app => app.date === today);
  };

  // Obtener todas las citas
  const getAllAppointments = () => {
    return appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const value = {
    appointments: getAllAppointments(),
    todayAppointments: getTodayAppointments(),
    addAppointment,
    deleteAppointment,
    getTodayAppointments,
    getAllAppointments
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};