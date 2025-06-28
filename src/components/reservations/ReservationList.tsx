
import { useState } from 'react';
import { Search, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ReservationCard } from './ReservationCard';
import { Reservation } from '@/types/reservation';

interface ReservationListProps {
  reservations: Reservation[];
  loading: boolean;
  onEdit: (reservation: Reservation) => void;
  onCancel: (id: string) => void;
}

export function ReservationList({ reservations, loading, onEdit, onCancel }: ReservationListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = reservations.filter(reservation =>
    reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.phone?.includes(searchTerm) ||
    reservation.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalGuests = reservations.reduce((sum, reservation) => sum + reservation.numberOfPeople, 0);
  const todayReservations = reservations.filter(reservation => {
    const today = new Date().toISOString().split('T')[0];
    return reservation.date === today;
  }).length;

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-wood-cream/40 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-wood-cream/30 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-wood-cream/20 rounded w-3/4"></div>
                <div className="h-3 bg-wood-cream/20 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-wood-medium to-wood-burnt text-white rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-wood-cream/80 text-sm font-medium">Total Reservations</p>
                <p className="text-2xl font-bold font-playfair">{reservations.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-wood-cream/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-wood-beige to-wood-cream text-wood-dark rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-wood-dark/70 text-sm font-medium">Today's Reservations</p>
                <p className="text-2xl font-bold font-playfair">{todayReservations}</p>
              </div>
              <Calendar className="w-8 h-8 text-wood-dark/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-wood-dark to-wood-burnt text-white rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-wood-cream/80 text-sm font-medium">Total Guests</p>
                <p className="text-2xl font-bold font-playfair">{totalGuests}</p>
              </div>
              <Users className="w-8 h-8 text-wood-cream/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and List */}
      <Card className="bg-card border-wood-cream/20 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="font-playfair text-2xl text-wood-dark">
              Active Reservations
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wood-dark/50 w-4 h-4" />
              <Input
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredReservations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-wood-beige mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-semibold text-wood-dark mb-2">
                {searchTerm ? 'No matching reservations' : 'No reservations yet'}
              </h3>
              <p className="text-wood-dark/70">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first reservation to get started'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onEdit={onEdit}
                  onCancel={onCancel}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
