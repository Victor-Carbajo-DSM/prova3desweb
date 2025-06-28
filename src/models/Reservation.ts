import { Schema, model } from 'mongoose';

const ReservationSchema = new Schema({
  customerName: String,
  numberOfPeople: Number,
  date: String,
  time: String,
  phone: String,
  email: String,
  specialRequests: String,
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

export const Reservation = model('Reservation', ReservationSchema);