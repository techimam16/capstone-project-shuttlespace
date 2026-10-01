import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    namaLengkap: "",
    noHp: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
    <div className="w-full max-w-md mx-auto text-center mt-12 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="namaLengkap"
          placeholder="Nama Lengkap"
          value={formData.namaLengkap}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 pr-16 rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          type="text"
          name="noHp"
          placeholder="Nomor HP"
          value={formData.noHp}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
         <p class="text-gray-900 mt-4"> Already have an account? 
          <a href="/login" class="text-sm text-blue-500 -200 hover:underline mt-4"> Login</a></p>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold 
          py-2 px-4 rounded-md mt-4 transition-transform transform hover:scale-105
          hover:from-blue-400 hover:to-blue-600 
          transition ease-in-out duration-150"
        >
          {loading ? "Memproses..." : "Register"}
        </button>
      </form>
    </div>
    </div>
  );
}