import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  Bell,
  Search,
  User,
  Shield,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Menu,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { UserRole } from '../../lib/types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Input } from '../ui/input';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const {
    currentRole,
    currentUser,
    switchRole,
    notifications,
    markNotificationsAsRead,
    resetToDefaults,
  } = usePrepKaroStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const unreadNotifications = notifications.filter(n => !n.readAt);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-slate-800 hover:bg-slate-900 text-white font-medium gap-1 text-xs px-2 py-0.5">
            <Shield className="w-3 h-3" /> Admin
          </Badge>
        );
      case 'reviewer':
        return (
          <Badge className="bg-teal-600 hover:bg-teal-700 text-white font-medium gap-1 text-xs px-2 py-0.5">
            <ClipboardCheck className="w-3 h-3" /> Reviewer
          </Badge>
        );
      case 'student':
      default:
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-medium gap-1 text-xs px-2 py-0.5">
            <GraduationCap className="w-3 h-3" /> Student
          </Badge>
        );
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile Menu Trigger & Brand on mobile */}
        <div className="flex items-center gap-3">
          {onMobileMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-muted min-h-[44px] min-w-[44px] touch-manipulation"
              onClick={onMobileMenuToggle}
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          {/* Quick Breadcrumbs indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors font-medium">PrepKaro</Link>
            <span>/</span>
            <span className="capitalize text-foreground font-semibold">
              {currentPath === '/' ? 'Home' : currentPath.split('/')[1]?.replace('-', ' ') || 'Dashboard'}
            </span>
            {currentPath.split('/')[2] && (
              <>
                <span>/</span>
                <span className="capitalize text-primary font-medium">
                  {currentPath.split('/')[2]?.replace('-', ' ')}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden sm:flex items-center relative max-w-xs md:max-w-md w-full mx-4">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search courses, lessons, skills, jobs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs bg-muted/50 border-input focus:bg-background transition-colors w-full"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher Pill */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 border-border bg-background hover:bg-muted font-medium text-xs rounded-md px-3"
              >
                <span className="text-muted-foreground hidden sm:inline">Role:</span>
                {getRoleBadge(currentRole)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1">
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5">
                Switch Simulated Role
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => switchRole('student')}
                className={`flex items-center justify-between cursor-pointer text-xs ${
                  currentRole === 'student' ? 'bg-primary/10 text-primary font-medium' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Student (Sneha Sharma)</span>
                </div>
                {currentRole === 'student' && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => switchRole('reviewer')}
                className={`flex items-center justify-between cursor-pointer text-xs ${
                  currentRole === 'reviewer' ? 'bg-primary/10 text-primary font-medium' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-teal-600" />
                  <span>Reviewer (Dr. Rajesh)</span>
                </div>
                {currentRole === 'reviewer' && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => switchRole('admin')}
                className={`flex items-center justify-between cursor-pointer text-xs ${
                  currentRole === 'admin' ? 'bg-primary/10 text-primary font-medium' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-800" />
                  <span>Admin (Priya Mehta)</span>
                </div>
                {currentRole === 'admin' && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 text-foreground hover:bg-muted rounded-md"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-background">
                    {unreadNotifications.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 sm:w-96 p-0 shadow-lg border-border">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
                  {unreadNotifications.length > 0 && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium">
                      {unreadNotifications.length} new
                    </Badge>
                  )}
                </div>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markNotificationsAsRead}
                    className="text-xs text-primary hover:underline font-medium transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.slice(0, 6).map(notif => (
                    <div
                      key={notif.id}
                      className={`p-3.5 hover:bg-muted/50 transition-colors text-xs ${
                        !notif.readAt ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-semibold text-foreground">{notif.title}</div>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                          <Clock className="w-2.5 h-2.5" />
                          {new Date(notif.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 leading-relaxed">{notif.body}</p>
                      {notif.link && (
                        <Link
                          to={notif.link}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                        >
                          View Details <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-border bg-muted/20 text-center">
                <Link
                  to={currentRole === 'reviewer' ? '/reviewer/notifications' : '/notifications'}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View All Notifications
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="User profile menu"
              >
                {currentUser?.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {currentUser?.fullName.charAt(0) || 'U'}
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1 shadow-lg border-border">
              <div className="px-3 py-2 border-b border-border">
                <div className="font-semibold text-sm text-foreground truncate">
                  {currentUser?.fullName}
                </div>
                <div className="text-xs text-muted-foreground truncate">{currentUser?.email}</div>
                <div className="mt-1.5">{getRoleBadge(currentRole)}</div>
              </div>

              <DropdownMenuItem asChild className="cursor-pointer text-xs my-0.5">
                <Link to={currentRole === 'reviewer' ? '/reviewer/profile' : '/profile'} className="flex items-center gap-2 w-full">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Profile & Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer text-xs my-0.5">
                <Link to="/help-support" className="flex items-center gap-2 w-full">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={resetToDefaults}
                className="cursor-pointer text-xs text-amber-600 focus:text-amber-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Demo State</span>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer text-xs text-destructive focus:text-destructive my-0.5">
                <Link to="/auth" className="flex items-center gap-2 w-full">
                  <span>Sign Out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
