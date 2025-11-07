import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, MaterialsPage, RepositoriesPage, NoticesPage, ProfilePage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materiais" element={<MaterialsPage />} />
        <Route path="/repositorios" element={<RepositoriesPage />} />
        <Route path="/avisos" element={<NoticesPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
