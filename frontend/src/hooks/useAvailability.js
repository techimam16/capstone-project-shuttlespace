import { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

export function useAvailability(lapanganId, tanggal) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!lapanganId || !tanggal) {
      setStatus("idle");
      return;
    }
    fetchAvailability();
  }, [lapanganId, tanggal]);

  const fetchAvailability = async () => {
    setStatus("loading");
    try {
      const data = await apiClient(
        `/booking/availability?lapanganId=${lapanganId}&tanggal=${tanggal}`
      );
      setBookedSlots(data.bookedSlots || []);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return { bookedSlots, status, refetch: fetchAvailability };
}