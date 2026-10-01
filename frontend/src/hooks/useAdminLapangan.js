import { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

export function useAdminLapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setStatus("loading");
    try {
      const data = await apiClient("/lapangan");
      setLapangan(data);
      setStatus(data.length === 0 ? "empty" : "success");
    } catch (err) {
      setStatus("error");
    }
  };

  const createLapangan = async (payload) => {
    await apiClient("/lapangan", { method: "POST", body: JSON.stringify(payload) });
    fetchAll();
  };

  const updateLapangan = async (id, payload) => {
    await apiClient(`/lapangan/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    fetchAll();
  };

  const deleteLapangan = async (id) => {
    await apiClient(`/lapangan/${id}`, { method: "DELETE" });
    fetchAll();
  };

  return { lapangan, status, createLapangan, updateLapangan, deleteLapangan };
}