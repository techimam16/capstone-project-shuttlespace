import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import RiwayatPage from "./pages/RiwayatPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLapanganPage from "./pages/admin/AdminLapanganPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<ProtectedRoute role="penyewa"><BookingPage /></ProtectedRoute>} />
        <Route path="/riwayat" element={<ProtectedRoute role="penyewa"><RiwayatPage /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/lapangan" element={<ProtectedRoute role="admin"><AdminLapanganPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;