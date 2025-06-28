
import { format } from 'date-fns';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reservation } from '@/types/reservation';

interface ReservationCardProps {
  reservation: Reservation;
  onEdit: (reservation: Reservation) => void;
  onCancel: (id: string) => void;
}

export function ReservationCard({ reservation, onEdit, onCancel }: ReservationCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="bg-card border-wood-cream/20 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-playfair text-xl font-semibold text-wood-dark">
              {reservation.customerName}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-wood-dark/70">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(reservation.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{reservation.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{reservation.numberOfPeople} people</span>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(reservation.status)} capitalize font-medium px-3 py-1 rounded-full`}>
            {reservation.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {reservation.phone && (
            <div className="flex items-center gap-2 text-wood-dark/70">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{reservation.phone}</span>
            </div>
          )}
          
          {reservation.email && (
            <div className="flex items-center gap-2 text-wood-dark/70">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{reservation.email}</span>
            </div>
          )}
          
          {reservation.specialRequests && (
            <div className="flex items-start gap-2 text-wood-dark/70">
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{reservation.specialRequests}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-6 pt-4 border-t border-wood-cream/20">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(reservation)}
            className="flex-1 border-wood-medium/30 text-wood-dark hover:bg-wood-cream/30 rounded-xl"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel(reservation.id)}
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50 rounded-xl"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
