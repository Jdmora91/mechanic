import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTruck.css';

const AddTruck = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vin: '',
    empresa: '',
    kilometraje: '',
    color: '',
    marca: '',
    modelo: '',
    chofer: '',
    comentarios: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Datos del camión:', formData);
    
    // Mostrar alerta de éxito
    alert('Camión agregado exitosamente.');
    
    // Redirigir al dashboard después de 1 segundo
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="addtruck-container">
      <div className="addtruck-card">
        <div className="addtruck-header">
          <h1>Agregar Nuevo Camión</h1>
          <p>Complete la información del vehículo</p>
        </div>

        <form onSubmit={handleSubmit} className="addtruck-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vin">Número de VIN *</label>
              <input
                type="text"
                id="vin"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                placeholder="Ej: 1HGCM82633A123456"
                required
                maxLength="17"
              />
            </div>

            <div className="form-group">
              <label htmlFor="empresa">Nombre de la Empresa *</label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Ej: Transportes MX"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="kilometraje">Kilometraje</label>
              <input
                type="number"
                id="kilometraje"
                name="kilometraje"
                value={formData.kilometraje}
                onChange={handleChange}
                placeholder="Ej: 150000"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Ej: Rojo"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marca">Marca *</label>
              <select
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una marca</option>
                <option value="Freightliner">Freightliner</option>
                <option value="International">International</option>
                <option value="Kenworth">Kenworth</option>
                <option value="Peterbilt">Peterbilt</option>
                <option value="Volvo">Volvo</option>
                <option value="Mack">Mack</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Otra">Otra</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo *</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ej: Cascadia 2023"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="chofer">Nombre del Chofer</label>
            <input
              type="text"
              id="chofer"
              name="chofer"
              value={formData.chofer}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comentarios">Comentarios</label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Notas adicionales sobre el vehículo..."
              rows="3"
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="btn-back" onClick={handleBack}>
              ↩️ Regresar
            </button>
            
            <button type="button" className="btn-calendar" onClick={() => navigate('/calendario')}>
              📅 Calendario
            </button>
            
            <button type="submit" className="btn-save">
              💾 Guardar Camión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTruck;