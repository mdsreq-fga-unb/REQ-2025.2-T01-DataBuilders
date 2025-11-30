import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RepositoriesProvider } from './context/RepositoriesContext';
import { MaterialsProvider } from './context/MaterialsContext';
import { NoticesProvider } from './context/NoticesContext';
import { 
  HomePage, 
  MaterialsPage, 
  RepositoriesPage, 
  NoticesPage, 
  ProfilePage, 
  DashboardPage,
  LoginPage,
  CreateContentPage,
  RepositoriesManagementPage,
  MaterialsManagementPage,
  CreateNoticePage
} from './pages';

function App() {
  return (
    <RepositoriesProvider>
      <MaterialsProvider>
        <NoticesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/materiais" element={<MaterialsPage />} />
              <Route path="/materiais/novo" element={<CreateContentPage />} />
              <Route path="/materiais/gerenciar" element={<MaterialsManagementPage />} />
              <Route path="/repositorios" element={<RepositoriesPage />} />
              <Route path="/repositorios/gerenciar" element={<RepositoriesManagementPage />} />
              <Route path="/avisos" element={<NoticesPage />} />
              <Route path="/avisos/novo" element={<CreateNoticePage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </NoticesProvider>
      </MaterialsProvider>
    </RepositoriesProvider>
  );
}

export default App;
