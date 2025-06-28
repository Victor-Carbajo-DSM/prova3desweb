// Dados normalizados usados no front-end
export interface Reservation {
  id: string;
  customerName: string;
  numberOfPeople: number;
  date: string;
  time: string;
  phone?: string;
  email?: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

// Dados enviados pelo formulário (sem ID, status ou createdAt)
export interface ReservationFormData {
  customerName: string;
  numberOfPeople: number;
  date: string;
  time: string;
  phone?: string;
  email?: string;
  specialRequests?: string;
}

// Dados vindos da API, com _id em vez de id
export type ReservationFromAPI = Omit<Reservation, 'id'> & { _id: string };

export interface AvailabilitySlot {
  time: string;
  available: boolean;
  maxCapacity: number;
  currentReservations: number;
}