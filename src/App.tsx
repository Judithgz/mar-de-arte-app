import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cotizar/:serviceId" element={<QuotePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute><AdminPage /></ProtectedRoute>
        } />
      </Routes>
      <footer className="text-center text-secondary py-4 mt-auto border-top">
        <small>© {new Date().getFullYear()} Mar de Arte — Todos los derechos reservados</small>
      </footer>
    </AuthProvider>
  );
}


