import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-4 relative">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-lg" onClick={closeMobileMenu}>
          ShuttleSpace
        </Link>

        {/* Navigasi Desktop (md ke atas) */}
        <div className="hidden md:flex gap-4 ml-auto items-center">
          <Link to="/">Home</Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link to="/admin/dashboard">Dashboard Admin</Link>
                  <Link to="/admin/lapangan">Kelola Lapangan</Link>
                </>
              )}
              {user.role === "penyewa" && <Link to="/riwayat">Riwayat Booking</Link>}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-blue-700 px-3 py-1.5 rounded hover:bg-blue-800"
                >
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center text-sm font-bold">
                    {(user.namaLengkap || user.username)[0].toUpperCase()}
                  </span>
                  <span className="text-sm">{user.namaLengkap || user.username}</span>
                  <span className="text-xs">▼</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm border-b">
                      <p className="font-semibold">{user.namaLengkap || user.username}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Tombol Hamburger (di bawah md) */}
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <span className="text-2xl leading-none">✕</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Menu Dropdown Mobile/Tablet */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-1 bg-gradient-to-l from-blue-600 to-blue-800 rounded-lg p-3">
          <Link to="/" onClick={closeMobileMenu} className="py-2 px-2 rounded hover:bg-blue-800">
            Home
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={closeMobileMenu}
                    className="py-2 px-2 rounded hover:bg-blue-800"
                  >
                    Dashboard Admin
                  </Link>
                  <Link
                    to="/admin/lapangan"
                    onClick={closeMobileMenu}
                    className="py-2 px-2 rounded hover:bg-blue-800"
                  >
                    Kelola Lapangan
                  </Link>
                </>
              )}
              {user.role === "penyewa" && (
                <Link
                  to="/riwayat"
                  onClick={closeMobileMenu}
                  className="py-2 px-2 rounded hover:bg-blue-800"
                >
                  Riwayat Booking
                </Link>
              )}

              <div className="border-t border-blue-500 mt-2 pt-2">
                <div className="flex items-center gap-2 px-2 py-1">
                  <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center text-sm font-bold">
                    {(user.namaLengkap || user.username)[0].toUpperCase()}
                  </span>
                  <span className="text-sm">{user.namaLengkap || user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-2 rounded text-red-200 hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="py-2 px-2 rounded hover:bg-blue-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="py-2 px-2 rounded hover:bg-blue-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}