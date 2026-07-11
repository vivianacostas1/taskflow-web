import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import { ProtectedRoute } from './components/ProtectedRoute'; 
import LoginPage    from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import DashboardPage from './pages/DashboardPage'; 
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
 
export default function App() { 
  return ( 
    <BrowserRouter> 
      <AuthProvider> 
        <Routes> 
          {/* Rutas Públicas */}
          <Route path="/login"    element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
 
          {/* Rutas protegidas — anidadas bajo ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard actúa como la ruta base con el menú lateral */}
            <Route path="/dashboard" element={<DashboardPage />}>
              {/* Estas sub-rutas se inyectarán en el <Outlet /> del Dashboard */}
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetailPage />} />
            </Route>
          </Route> 
 
          {/* Redirecciones automáticas útiles */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
 
          {/* Cualquier ruta desconocida → redirige a login */} 
          <Route path="*" element={<Navigate to="/login" replace />} /> 
        </Routes> 
      </AuthProvider> 
    </BrowserRouter> 
  ); 
}