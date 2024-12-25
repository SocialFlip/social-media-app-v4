import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ContentGeneration } from '@/pages/dashboard/ContentGeneration';
import { ContentRevival } from '@/pages/dashboard/ContentRevival';
import { ContentLibrary } from '@/pages/dashboard/ContentLibrary';
import { Templates } from '@/pages/dashboard/Templates';
import { Hooks } from '@/pages/dashboard/Hooks';
import { HookResources } from '@/pages/dashboard/HookResources';
import { useAuthStore } from '@/stores/authStore';

export const DashboardRoutes = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<ContentGeneration />} />
        <Route path="generation" element={<ContentGeneration />} />
        <Route path="revival" element={<ContentRevival />} />
        <Route path="library" element={<ContentLibrary />} />
        <Route path="templates" element={<Templates />} />
        <Route path="hooks">
          <Route index element={<Hooks />} />
          <Route path="resources" element={<HookResources />} />
        </Route>
      </Routes>
    </DashboardLayout>
  );
};