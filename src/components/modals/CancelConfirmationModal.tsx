
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';

interface CancelConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
}

export function CancelConfirmationModal({ 
  open, 
  onClose, 
  onConfirm, 
  customerName 
}: CancelConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-background border-wood-cream/30 rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-playfair text-xl text-wood-dark">
            Cancel Reservation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-wood-dark/70">
            Are you sure you want to cancel the reservation for <strong>{customerName}</strong>? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="rounded-xl border-wood-cream/30 hover:bg-wood-cream/20"
          >
            Keep Reservation
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Cancel Reservation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
