
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ReservationFormData } from '@/types/reservation';

const reservationSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  numberOfPeople: z.number().min(1, 'Must be at least 1 person').max(20, 'Maximum 20 people'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  specialRequests: z.string().max(500, 'Special requests too long').optional(),
});

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => Promise<boolean>;
  initialData?: ReservationFormData;
  loading?: boolean;
}

export function ReservationForm({ onSubmit, initialData, loading }: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: initialData || {
      customerName: '',
      numberOfPeople: 2,
      date: '',
      time: '',
      phone: '',
      email: '',
      specialRequests: '',
    },
  });

  const handleSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    const success = await onSubmit(data);
    if (success && !initialData) {
      form.reset();
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-card border-wood-cream/20 shadow-lg rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="font-playfair text-2xl text-wood-dark flex items-center gap-2">
          {initialData ? 'Edit Reservation' : 'New Reservation'}
          <Users className="w-6 h-6 text-wood-medium" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Customer Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter customer name" 
                        className="rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfPeople"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Number of People *
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20">
                          <SelectValue placeholder="Select party size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-wood-cream/30 rounded-xl">
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Date *
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal rounded-xl border-wood-cream/30 hover:bg-wood-cream/20",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(new Date(field.value), 'PPP') : 'Select date'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover border-wood-cream/30 rounded-xl" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-wood-cream/30 rounded-xl">
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        className="rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="customer@example.com" 
                        type="email"
                        className="rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-wood-dark font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Special Requests
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special dietary requirements, celebrations, or seating preferences..."
                        className="rounded-xl border-wood-cream/30 focus:border-wood-medium focus:ring-wood-medium/20 min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || loading}
              className="w-full bg-wood-dark hover:bg-wood-burnt text-wood-cream font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Submitting...' : initialData ? 'Update Reservation' : 'Create Reservation'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
