import { useState } from "react";
import { useAdminLapangan } from "../../hooks/useAdminLapangan";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

export default function AdminLapanganPage() {
  const { lapangan, status, createLapangan, updateLapangan, deleteLapangan } = useAdminLapangan();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nama: "", hargaPerJam: "" });
  const [error, setError] = useState(null);

  const openCreateForm = () => {
    setEditingId(null);
    setFormData({ nama: "", hargaPerJam: "" });
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    setFormData({ nama: item.nama, hargaPerJam: item.hargaPerJam });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = { nama: formData.nama, hargaPerJam: Number(formData.hargaPerJam) };
      if (editingId) {
        await updateLapangan(editingId, payload);
      } else {
        await createLapangan(payload);
      }
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus lapangan ini?")) return;
    try {
      await deleteLapangan(id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Lapangan</h1>
        <button
          onClick={openCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Lapangan
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6 flex flex-col gap-3">
          <h3 className="font-semibold">{editingId ? "Edit Lapangan" : "Tambah Lapangan"}</h3>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            type="text"
            placeholder="Nama Lapangan"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Harga per Jam"
            value={formData.hargaPerJam}
            onChange={(e) => setFormData({ ...formData, hargaPerJam: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <p className="text-red-600">Gagal memuat data lapangan.</p>}
      {status === "empty" && <EmptyState message="Belum ada lapangan. Tambahkan sekarang." />}

      {status === "success" && (
        <div className="flex flex-col gap-3">
          {lapangan.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.nama}</p>
                <p className="text-sm text-gray-500">Rp{item.hargaPerJam}/jam</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm(item)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}