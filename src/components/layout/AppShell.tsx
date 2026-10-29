import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '../ui/sonner';

interface AppShellProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export function AppShell({ children, hideSidebar = false }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (hideSidebar) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        {children}
        <Toaster richColors position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans antialiased overflow-hidden">
      {/* Desktop Sidebar (Permanent) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 bg-[#0B1F44] shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1 w-full min-h-screen overflow-x-hidden">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-border bg-card py-6 px-4 sm:px-8 text-xs text-muted-foreground mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">PrepKaro</span>
              <span>: Technical Learning and Career Platform</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span>·</span>
              <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
              <span>·</span>
              <span className="text-teal-600 font-medium">Verified Progression</span>
            </div>
          </div>
        </footer>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
