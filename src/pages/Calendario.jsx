import React, { useState } from 'react';
import { useAppointments } from '../contexts/AppointmentsContext';
import './Calendario.css';

const Calendario = () => {
  const { appointments, addAppointment, deleteAppointment } = useAppointments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    vin: '',
    empresa: '',
    marca: '',
    modelo: '',
    date: selectedDate,
    hora: '',
    chofer: '',
    comentarios: ''
  });

  // Generar días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Días del mes anterior (para completar la primera semana)
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Días del próximo mes (para completar la última semana)
    const totalCells = 42; // 6 semanas * 7 días
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleDateSelect = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = selected.toISOString().split('T')[0];
      setSelectedDate(dateString);
      setFormData(prev => ({ ...prev, date: dateString }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.hora) {
      alert('Fecha y hora son obligatorios');
      return;
    }

    addAppointment(formData);
    setFormData({
      vin: '',
      empresa: '',
      marca: '',
      modelo: '',
      date: selectedDate,
      hora: '',
      chofer: '',
      comentarios: ''
    });
    setShowForm(false);
    alert('✅ Cita agregada correctamente!');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta cita?')) {
      deleteAppointment(id);
    }
  };

  const getAppointmentsForSelectedDate = () => {
    return appointments.filter(app => app.date === selectedDate);
  };

  const selectedDateAppointments = getAppointmentsForSelectedDate();

  return (
   <div className="calendario-container">
    <div className="calendario-content">
      
      <div className="calendario-header">
        <h1>📅 Calendario de Citas</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          ➕ Nueva Cita
        </button>
      </div>

      {/* Navegación del mes */}
      <div className="month-navigation">
        <button onClick={() => navigateMonth(-1)}>◀</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => navigateMonth(1)}>▶</button>
      </div>

      {/* Calendario */}
      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="calendar-header-day">
            {day}
          </div>
        ))}
        
        {days.map(({ day, isCurrentMonth }, index) => {
          const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
          const isSelected = isCurrentMonth && dateStr === selectedDate;
          const hasAppointments = appointments.some(app => app.date === dateStr);
          
          return (
            <div
              key={index}
              className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''} ${hasAppointments ? 'has-appointments' : ''}`}
              onClick={() => handleDateSelect(day, isCurrentMonth)}
            >
              {day}
              {hasAppointments && <span className="appointment-dot">•</span>}
            </div>
          );
        })}
      </div>

      {/* Citas del día seleccionado */}
      <div className="citas-del-dia">
        <h3>Citas para el {new Date(selectedDate).toLocaleDateString('es-ES')}</h3>
        
        {selectedDateAppointments.length === 0 ? (
          <p className="no-citas">No hay citas para este día</p>
        ) : (
          <div className="citas-list">
            {selectedDateAppointments.map(appointment => (
              <div key={appointment.id} className="cita-item">
                <div className="cita-info">
                  <span className="cita-hora">{appointment.hora}</span>
                  <span className="cita-empresa">{appointment.empresa || 'Sin empresa'}</span>
                  <span className="cita-vin">{appointment.vin || 'Sin VIN'}</span>
                </div>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(appointment.id)}
                  title="Eliminar cita"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formulario para agregar citas */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>Agregar Nueva Cita para {new Date(selectedDate).toLocaleDateString('es-ES')}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>VIN:</label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    placeholder="Número de VIN"
                  />
                </div>
                <div className="form-group">
                  <label>Empresa:</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Marca:</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                    placeholder="Marca del vehículo"
                  />
                </div>
                <div className="form-group">
                  <label>Modelo:</label>
                  <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                    placeholder="Modelo del vehículo"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hora *:</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Chofer:</label>
                  <input
                    type="text"
                    name="chofer"
                    value={formData.chofer}
                    onChange={handleInputChange}
                    placeholder="Nombre del chofer"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Comentarios:</label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  placeholder="Notas adicionales..."
                  rows="3"
                />
              </div>

              <div className="form-buttons">
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Calendario;