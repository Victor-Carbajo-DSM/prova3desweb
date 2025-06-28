
import { useState } from 'react';
import { AvailabilitySlot } from '@/types/reservation';

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

const RESTAURANT_CAPACITY = 50;

export const useAvailability = () => {
  const [loading, setLoading] = useState(false);

  const checkAvailability = async (date: string): Promise<AvailabilitySlot[]> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const slots: AvailabilitySlot[] = TIME_SLOTS.map(time => {
      // Mock logic for availability - in real app, this would check against actual reservations
      const random = Math.random();
      const currentReservations = Math.floor(random * RESTAURANT_CAPACITY);
      const available = currentReservations < RESTAURANT_CAPACITY * 0.9; // 90% capacity threshold
      
      return {
        time,
        available,
        maxCapacity: RESTAURANT_CAPACITY,
        currentReservations
      };
    });
    
    setLoading(false);
    return slots;
  };

  return {
    checkAvailability,
    loading
  };
};
