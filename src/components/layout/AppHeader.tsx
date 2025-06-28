
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="h-16 bg-background border-b border-wood-cream/30 flex items-center px-6 sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="p-2 hover:bg-wood-cream/50 rounded-xl transition-colors">
          <Menu className="h-5 w-5 text-wood-dark" />
        </SidebarTrigger>
        
        <div className="hidden sm:block">
          <h1 className="font-playfair font-semibold text-xl text-wood-dark">
            Reservation Management
          </h1>
          <p className="text-sm text-wood-dark/70">
            Welcome to your restaurant dashboard
          </p>
        </div>
      </div>
    </header>
  );
}
