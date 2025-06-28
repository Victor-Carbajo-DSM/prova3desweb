import { useState, useEffect } from "react";
import {
  Reservation,
  ReservationFormData,
  ReservationFromAPI,
} from "@/types/reservation";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001/api/reservations";

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // Converte _id do Mongo para id usado no frontend
  const normalize = (data: ReservationFromAPI): Reservation => ({
    id: data._id,
    customerName: data.customerName,
    numberOfPeople: data.numberOfPeople,
    date: data.date,
    time: data.time,
    phone: data.phone,
    email: data.email,
    specialRequests: data.specialRequests,
    status: data.status,
    createdAt: data.createdAt,
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(API_URL);
        const raw = await response.json();
        const normalized = raw.map(normalize);
        setReservations(normalized);
      } catch (error) {
        toast.error("Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const addReservation = async (
    data: ReservationFormData
  ): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const raw = await response.json();
      setReservations((prev) => [...prev, normalize(raw)]);

      toast.success("Reservation created successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to create reservation.");
      return false;
    }
  };

  const updateReservation = async (
    id: string,
    data: ReservationFormData
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const updated = normalize(await response.json());
      setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));

      toast.success("Reservation updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update reservation.");
      return false;
    }
  };

  const cancelReservation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/${id}/cancel`, {
        method: "PATCH",
      });

      const cancelled = normalize(await response.json());
      setReservations((prev) => prev.map((r) => (r.id === id ? cancelled : r)));

      toast.success("Reservation cancelled successfully.");
      return true;
    } catch (error) {
      toast.error("Failed to cancel reservation.");
      return false;
    }
  };

  const deleteReservation = async (id: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setReservations((prev) => prev.filter((r) => r.id !== id));
      toast.success("Reservation deleted successfully.");
      return true;
    } catch (error) {
      toast.error("Failed to delete reservation.");
      return false;
    }
  };

  const sortedReservations = reservations
    .filter((r) => r.status !== "cancelled")
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

  return {
    reservations: sortedReservations,
    loading,
    addReservation,
    updateReservation,
    cancelReservation,
    deleteReservation,
  };
};
