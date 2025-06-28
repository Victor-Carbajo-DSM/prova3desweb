
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useAvailability } from '@/hooks/useAvailability';
import { AvailabilitySlot } from '@/types/reservation';

export function AvailabilityChecker() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const { checkAvailability, loading } = useAvailability();

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      const slots = await checkAvailability(dateString);
      setAvailabilitySlots(slots);
    } else {
      setAvailabilitySlots([]);
    }
  };

  const getAvailabilityColor = (slot: AvailabilitySlot) => {
    if (!slot.available) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    const percentage = slot.currentReservations / slot.maxCapacity;
    if (percentage < 0.5) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (percentage < 0.8) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    } else {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getAvailabilityText = (slot: AvailabilitySlot) => {
    if (!slot.available) {
      return 'Fully Booked';
    }
    
    const available = slot.maxCapacity - slot.currentReservations;
    return `${available} seats available`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-wood-cream/20 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl text-wood-dark flex items-center gap-2">
            <Clock className="w-6 h-6 text-wood-medium" />
            Check Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-80 justify-start text-left font-normal rounded-xl border-wood-cream/30 hover:bg-wood-cream/20",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover border-wood-cream/30 rounded-xl" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card className="bg-card border-wood-cream/20 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="font-playfair text-xl text-wood-dark">
              Availability for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-24 bg-wood-cream/40 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availabilitySlots.map((slot) => (
                  <Card key={slot.time} className="border-wood-cream/20 rounded-xl hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4 text-wood-medium" />
                          <span className="font-semibold text-wood-dark">{slot.time}</span>
                        </div>
                        
                        <Badge className={`${getAvailabilityColor(slot)} w-full justify-center py-2 rounded-xl`}>
                          {getAvailabilityText(slot)}
                        </Badge>
                        
                        <div className="flex items-center justify-center gap-1 text-sm text-wood-dark/70">
                          <Users className="w-3 h-3" />
                          <span>{slot.currentReservations}/{slot.maxCapacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
