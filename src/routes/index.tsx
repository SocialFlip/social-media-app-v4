import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ThankYouPage } from '@/pages/auth/ThankYouPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ContentGeneration } from '@/pages/dashboard/ContentGeneration';
import { ContentRevival } from '@/pages/dashboard/ContentRevival';
import { ContentLibrary } from '@/pages/dashboard/ContentLibrary';
import { Templates } from '@/pages/dashboard/Templates';
import { Hooks } from '@/pages/dashboard/Hooks';
import { HookResources } from '@/pages/dashboard/HookResources';
import { useAuthStore } from '@/stores/authStore';

export const AppRoutes = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={<ContentGeneration />} />
        <Route path="generation" element={<ContentGeneration />} />
        <Route path="revival" element={<ContentRevival />} />
        <Route path="library" element={<ContentLibrary />} />
        <Route path="templates" element={<Templates />} />
        <Route path="hooks">
          <Route index element={<Hooks />} />
          <Route path="resources" element={<HookResources />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
};