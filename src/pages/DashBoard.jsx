import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../contexts/AppointmentsContext';
import './DashBoard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { todayAppointments, deleteAppointment } = useAppointments();
  const mechanicName = "Juan Pérez";

  const handleCheckIn = (appointmentId) => {
    navigate(`/checkin/${appointmentId}`);
  };

  const handleEdit = (appointmentId) => {
    console.log('Editar cita:', appointmentId);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      deleteAppointment(appointmentId);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Bienvenido, {mechanicName}</h1>
          <p>{new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>

        {/* Botones de acción */}
        <div className="dashboard-actions">
          <button className="btn-dark" onClick={() => navigate('/addtruck')}>
            ➕ Agregar Camión
          </button>
          <button className="btn-dark" onClick={() => navigate('/calendario')}>
            📅 Calendario
          </button>
          <button className="btn-dark" onClick={() => navigate('/buscador')}>
            🔍 Buscador
          </button>
        </div>

        {/* Sección de citas - SIEMPRE visible */}
        <div className="appointments-section">
          <h2>Citas del Día</h2>
          
          {todayAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>📅 No hay citas programadas para hoy</p>
              <button 
                className="btn-dark" 
                onClick={() => navigate('/calendario')}
              >
                Agregar Cita en Calendario
              </button>
            </div>
          ) : (
            <div className="appointments-table">
              <div className="table-header">
                <span>VIN</span>
                <span>EMPRESA</span>
                <span>MARCA</span>
                <span>HORA</span>
                <span>ACCIONES</span>
              </div>

              {todayAppointments.map(appointment => (
                <div key={appointment.id} className="table-row">
                  <span className="vin-cell">{appointment.vin || 'N/A'}</span>
                  <span>{appointment.empresa || 'N/A'}</span>
                  <span>{appointment.marca || 'N/A'}</span>
                  <span className="time-cell">{appointment.hora || 'N/A'}</span>
                  
                  <div className="actions-cell">
                    <button 
                      className="btn-edit" 
                      onClick={() => {
                        handleEdit(appointment.id);
                        navigate('/calendario');
                      }}
                      title="Editar cita"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(appointment.id)}
                      title="Eliminar cita"
                    >
                      🗑️
                    </button>
                    <button 
                      className="btn-checkin" 
                      onClick={() => handleCheckIn(appointment.id)}
                    >
                      CHECK-IN
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;