import { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

export function useAdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setStatus("loading");
    try {
      const data = await apiClient("/bookings");
      if (data.length === 0) {
        setStatus("empty");
      } else {
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sorted);
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await apiClient(`/booking/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      fetchAll(); // refresh list setelah update
    } catch (err) {
      alert(err.message);
    }
  };

  return { bookings, status, updateStatus, refetch: fetchAll };
}