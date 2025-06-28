
import { AvailabilityChecker } from '@/components/availability/AvailabilityChecker';

export default function Availability() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="font-playfair text-3xl font-bold text-wood-dark mb-2">
          Table Availability
        </h1>
        <p className="text-wood-dark/70 text-lg">
          Check available time slots for any date
        </p>
      </div>
      
      <AvailabilityChecker />
    </div>
  );
}
