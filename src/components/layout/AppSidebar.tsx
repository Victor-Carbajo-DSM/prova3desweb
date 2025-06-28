
import { Calendar, Clock, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: 'Reservations',
    url: '/',
    icon: Users,
  },
  {
    title: 'Availability',
    url: '/availability',
    icon: Clock,
  },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 ${
      isActive 
        ? 'bg-wood-dark text-wood-cream font-medium shadow-sm' 
        : 'text-wood-dark hover:bg-wood-cream/50 hover:text-wood-dark'
    }`;

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} bg-wood-beige border-r border-wood-cream/30`}>
      <SidebarContent className="bg-wood-beige">
        <div className="p-6 border-b border-wood-cream/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-wood-dark rounded-2xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-wood-cream" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-playfair font-semibold text-wood-dark text-lg">
                  Bistro Reserve
                </h2>
                <p className="text-sm text-wood-dark/70">Table Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="text-wood-dark/70 font-medium text-xs uppercase tracking-wider mb-4">
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12 rounded-2xl">
                    <NavLink to={item.url} end className={getNavClassName}>
                      <item.icon className={`${collapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
