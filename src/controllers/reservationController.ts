import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';

export const getAll = async (_: Request, res: Response) => {
  const reservations = await Reservation.find();
  res.json(reservations);
};

export const create = async (req: Request, res: Response) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar reserva' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const cancel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Reservation.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
  res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.status(204).send();
};