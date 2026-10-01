import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient("/booking", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      navigate("/riwayat");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
}