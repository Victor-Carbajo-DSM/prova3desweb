
import { useState } from 'react';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { ReservationList } from '@/components/reservations/ReservationList';
import { EditReservationModal } from '@/components/modals/EditReservationModal';
import { CancelConfirmationModal } from '@/components/modals/CancelConfirmationModal';
import { useReservations } from '@/hooks/useReservations';
import { Reservation } from '@/types/reservation';

export default function Reservations() {
  const { 
    reservations, 
    loading, 
    addReservation, 
    updateReservation, 
    cancelReservation 
  } = useReservations();
  
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [cancelingReservation, setCancelingReservation] = useState<Reservation | null>(null);

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
  };

  const handleCancelClick = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      setCancelingReservation(reservation);
    }
  };

  const handleCancelConfirm = async () => {
    if (cancelingReservation) {
      await cancelReservation(cancelingReservation.id);
      setCancelingReservation(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="order-2 xl:order-1">
          <ReservationList
            reservations={reservations}
            loading={loading}
            onEdit={handleEdit}
            onCancel={handleCancelClick}
          />
        </div>
        
        <div className="order-1 xl:order-2">
          <ReservationForm onSubmit={addReservation} />
        </div>
      </div>

      <EditReservationModal
        reservation={editingReservation}
        open={!!editingReservation}
        onClose={() => setEditingReservation(null)}
        onUpdate={updateReservation}
      />

      <CancelConfirmationModal
        open={!!cancelingReservation}
        onClose={() => setCancelingReservation(null)}
        onConfirm={handleCancelConfirm}
        customerName={cancelingReservation?.customerName || ''}
      />
    </div>
  );
}
