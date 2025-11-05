import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, MaterialsPage, RepositoriesPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materiais" element={<MaterialsPage />} />
        <Route path="/repositorios" element={<RepositoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
