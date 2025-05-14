import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Infografis from "./pages/inforgrafis";
import Berita from "./pages/berita";
import ELapor from "./pages/eLapor";
import Login from "./pages/login";
import Dashboard from "./components/admin/dataPenduduk";
import ProfileAdmin from "./components/admin/beritaForm";
import Settings from "./components/admin/galeriForm";
import GaleriForm from "./components/admin/galeriForm";
import Galeri from "./pages/galeri";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/infografis" element={<Infografis />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/eLapor" element={<ELapor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/data" element={<Dashboard />} />
        <Route path="/beritaForm" element={<ProfileAdmin />} />
        <Route path="/galeriForm" element={<GaleriForm />} />
        <Route path="/profileForm" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;