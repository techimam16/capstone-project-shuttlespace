const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function apiClient(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // Hanya anggap "token kedaluwarsa" kalau memang ada token yang dikirim.
  // Kalau tidak ada token (misalnya saat login/register), 401 adalah error biasa dari kredensial salah.
  if (res.status === 401 && token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Terjadi kesalahan");
  }

  return data;
}