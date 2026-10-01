import { useState, useEffect } from "react";
import { apiClient } from "../utils/apiClient";

export function useLapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    setStatus("loading");
    try {
      const data = await apiClient("/lapangan");
      if (data.length === 0) {
        setStatus("empty");
      } else {
        setLapangan(data);
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return { lapangan, status, refetch: fetchLapangan };
}