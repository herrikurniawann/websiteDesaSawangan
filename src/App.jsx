import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Infografis from "./pages/inforgrafis";
import Berita from "./pages/berita";
import ELapor from "./pages/eLapor";
import Login from "./pages/login";
import Dashboard from "./pages/admin/dataPenduduk";
import GaleriBeritaForm from "./pages/admin/galeriForm";
import ProfileForm from "./pages/admin/profileForm";
import HukumTuaForm from "./pages/admin/hukumTuaForm";
import Galeri from "./pages/galeri";
import GantiPass from "./pages/admin/gantiPass";
import DetailBerita from "./components/profile/myBerita";
import { ProtectedAdminRoute, PublicRoute, LoginRoute } from "./components/protected/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik - hanya bisa diakses jika tidak login */}
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/infografis' element={<Infografis />} />
          <Route path='/galeri' element={<Galeri />} />
          <Route path='/berita' element={<Berita />} />
          <Route path='/berita/:id' element={<DetailBerita />} />
          <Route path='/eLapor' element={<ELapor />} />
        </Route>
        
        {/* Rute Login - Jika sudah login akan diarahkan ke dashboard */}
        <Route element={<LoginRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>
        
        {/* Rute Admin - hanya dapat diakses jika sudah login */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path='/data' element={<Dashboard />} />
          <Route path='/galeriForm' element={<GaleriBeritaForm />} />
          <Route path='/profileForm' element={<ProfileForm />} />
          <Route path='/hukumTuaForm' element={<HukumTuaForm />} />
          <Route path='/gantiPW' element={<GantiPass />} />
        </Route>
        
        {/* Fallback - Jika URL tidak cocok dengan rute manapun */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;