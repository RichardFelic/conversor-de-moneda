import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import EmailConfirm from './pages/auth/EmailConfirm';
import Institutions from './pages/admin/Institutions';
import Users from './pages/admin/Users';
import InstitutionExchangeRates from './pages/admin/InstitutionExchangeRates';
import ExchangeRates from './pages/ExchangeRates';
import ExchangeRateDetails from './pages/ExchangeRateDetails';
import AdminExchangeRates from './pages/admin/ExchangeRates';
import ExchangeRateHistory from './pages/ExchangeRateHistory';
import ProtectedRoute from './components/protectedRoute';
import { Roles } from './constants/roles';
import ConversionHistory from './pages/ConversionHistory';


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/confirm-email/:userId" element={<EmailConfirm />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/exchange-rates/:id" element={<ExchangeRateDetails />} />
        <Route 
          path="/exchange-rates/history" 
          element={
              <ExchangeRateHistory /> 
          } 
          
        />
        
        <Route 
          path="/conversions/history" 
          element={
            
              <ConversionHistory />
            
          } 
        />
        
        <Route 
          path="/admin/exchange-rates" 
          element={
            <ProtectedRoute roles={[Roles.ADMIN]}>
              <AdminExchangeRates />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/institutions" 
          element={
            <ProtectedRoute roles={[Roles.ADMIN]}>
              <Institutions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute roles={[Roles.ADMIN]}>
              <Users />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exchange-rates/institutions" 
          element={
            <ProtectedRoute roles={[Roles.ADMIN]}>
              <InstitutionExchangeRates />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}