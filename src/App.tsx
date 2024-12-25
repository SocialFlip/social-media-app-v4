import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthProvider } from './providers/AuthProvider';
import { ContentProvider } from './contexts/ContentContext';
import { PlatformProvider } from './contexts/PlatformContext';
import { TemplateProvider } from './contexts/TemplateContext';
import { HookProvider } from './contexts/HookContext';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <PlatformProvider>
            <TemplateProvider>
              <HookProvider>
                <AppRoutes />
              </HookProvider>
            </TemplateProvider>
          </PlatformProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};