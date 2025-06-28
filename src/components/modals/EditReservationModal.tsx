
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { Reservation, ReservationFormData } from '@/types/reservation';

interface EditReservationModalProps {
  reservation: Reservation | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: ReservationFormData) => Promise<boolean>;
}

export function EditReservationModal({ 
  reservation, 
  open, 
  onClose, 
  onUpdate 
}: EditReservationModalProps) {
  const handleSubmit = async (data: ReservationFormData) => {
    if (!reservation) return false;
    
    const success = await onUpdate(reservation.id, data);
    if (success) {
      onClose();
    }
    return success;
  };

  if (!reservation) return null;

  const initialData: ReservationFormData = {
    customerName: reservation.customerName,
    numberOfPeople: reservation.numberOfPeople,
    date: reservation.date,
    time: reservation.time,
    phone: reservation.phone || '',
    email: reservation.email || '',
    specialRequests: reservation.specialRequests || '',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-wood-cream/30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-wood-dark">
            Edit Reservation
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ReservationForm
            onSubmit={handleSubmit}
            initialData={initialData}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
