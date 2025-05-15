import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Infografis from "./pages/inforgrafis";
import Berita from "./pages/berita";
import ELapor from "./pages/eLapor";
import Login from "./pages/login";
import Dashboard from "./components/admin/dataPenduduk";
import GaleriBeritaForm from "./components/admin/galeriForm";
import ProfileForm from "./components/admin/profileForm";
import Galeri from "./pages/galeri";
import GantiPass from "./components/admin/gantiPass";
import DetailBerita from "./components/profile/myBerita";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/infografis" element={<Infografis />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/eLapor" element={<ELapor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/data" element={<Dashboard />} />
        <Route path="/galeriForm" element={<GaleriBeritaForm />} />
        <Route path="/profileForm" element={<ProfileForm />} />
        <Route path="/gantiPW" element={<GantiPass />} />
      </Routes>
    </Router>
  );
}

export default App;