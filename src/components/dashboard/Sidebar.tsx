import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  PenTool, 
  Layout, 
  Library,
  PanelLeftClose,
  PanelLeftOpen,
  Repeat,
  BookOpen
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { TokenDisplay } from './TokenDisplay';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUserStore } from '@/stores/userStore';

const navigation = [
  { name: 'Content Generation', href: '/dashboard/generation', icon: PenTool },
  { name: 'Content Revival', href: '/dashboard/revival', icon: Repeat },
  { name: 'Content Library', href: '/dashboard/library', icon: Library },
  { name: 'Templates', href: '/dashboard/templates', icon: Layout },
  { name: 'Hooks Library', href: '/dashboard/hooks', icon: BookOpen },
];

export const Sidebar: React.FC = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { plan, fetchPlan } = useUserStore();

  React.useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  return (
    <div 
      className={cn(
        "group flex flex-col bg-white border-r min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out relative",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => isDesktop && !isExpanded && toggleSidebar()}
      onMouseLeave={() => isDesktop && isExpanded && toggleSidebar()}
    >
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white"
                  : "text-gray-600 hover:bg-gray-50",
                !isExpanded && "justify-center"
              )
            }
            title={!isExpanded ? item.name : undefined}
          >
            <item.icon className={cn("h-5 w-5", isExpanded && "mr-3")} />
            {isExpanded && item.name}
          </NavLink>
        ))}
      </nav>

      {plan && <TokenDisplay plan={plan} isExpanded={isExpanded} />}

      <button
        onClick={() => !isDesktop && toggleSidebar()}
        className={cn(
          "absolute bottom-4 left-0 right-0 mx-auto w-fit p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg border border-gray-200",
          isDesktop && "hidden"
        )}
        aria-label="Toggle sidebar"
      >
        {isExpanded ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelLeftOpen className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};