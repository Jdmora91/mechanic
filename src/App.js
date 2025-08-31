import React from 'react';
import AppRouter from './AppRouter';
import Navbar from './components/Layout/NavBar';
import { AppointmentsProvider } from './contexts/AppointmentsContext';
import './App.css';

function App() {
  return (
  <AppointmentsProvider>
  <AppRouter />
  </AppointmentsProvider>
  );
}

export default App;