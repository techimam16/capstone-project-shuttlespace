import { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

export function useMyBookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    setStatus("loading");
    try {
      const data = await apiClient("/booking/me");
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

  return { bookings, status, refetch: fetchMyBookings };
}