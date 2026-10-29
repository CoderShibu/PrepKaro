import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Sparkles,
  GraduationCap,
  ClipboardCheck,
  Shield,
  Mail,
  Lock,
  User,
  CheckCircle2,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { UserRole } from '../../types';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

export function AuthPage() {
  const navigate = useNavigate();
  const { currentRole, switchRole } = usePrepKaroStore();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (authMode === 'register') {
      setIsVerifyingEmail(true);
      toast.success('Registration successful! Verification email sent to ' + email);
      setTimeout(() => {
        switchRole(selectedRole);
        if (selectedRole === 'admin') navigate({ to: '/admin' });
        else if (selectedRole === 'reviewer') navigate({ to: '/reviewer' });
        else navigate({ to: '/dashboard' });
      }, 1200);
    } else if (authMode === 'login') {
      toast.success('Signed in successfully!');
      switchRole(selectedRole);
      if (selectedRole === 'admin') navigate({ to: '/admin' });
      else if (selectedRole === 'reviewer') navigate({ to: '/reviewer' });
      else navigate({ to: '/dashboard' });
    } else {
      toast.success('Password reset link sent to ' + email);
      setAuthMode('login');
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    toast.success(`Logged in as simulated ${role.toUpperCase()}`);
    if (role === 'admin') navigate({ to: '/admin' });
    else if (role === 'reviewer') navigate({ to: '/reviewer' });
    else navigate({ to: '/dashboard' });
  };

  return (
    <AppShell hideSidebar>
      <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-muted/30">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#0B1F44] flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl">P</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-foreground">
                Prep<span className="text-blue-600">Karo</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground">
              Learn → Practice → Prove → Build → Get Hired
            </p>
          </div>

          {/* Quick 1-Click Role Demonstrator Card */}
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                  Evaluation Quick Access
                </span>
                <Badge variant="outline" className="text-[10px] bg-white dark:bg-card border-blue-300">
                  Demo Fast-Track
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Instantly explore the platform with fully provisioned permissions:
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <Button
                  onClick={() => handleQuickDemoLogin('student')}
                  variant="outline"
                  size="sm"
                  className="h-10 text-xs font-semibold flex flex-col items-center justify-center border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <GraduationCap className="w-4 h-4 text-blue-600 mb-0.5" />
                  <span>Student</span>
                </Button>

                <Button
                  onClick={() => handleQuickDemoLogin('reviewer')}
                  variant="outline"
                  size="sm"
                  className="h-10 text-xs font-semibold flex flex-col items-center justify-center border-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900"
                >
                  <ClipboardCheck className="w-4 h-4 text-teal-600 mb-0.5" />
                  <span>Reviewer</span>
                </Button>

                <Button
                  onClick={() => handleQuickDemoLogin('admin')}
                  variant="outline"
                  size="sm"
                  className="h-10 text-xs font-semibold flex flex-col items-center justify-center border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Shield className="w-4 h-4 text-slate-800 dark:text-slate-200 mb-0.5" />
                  <span>Admin</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Auth Form Card */}
          <Card className="border-border shadow-lg">
            <CardHeader className="pb-3 border-b border-border/60">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">
                  {authMode === 'login' ? 'Sign In' : authMode === 'register' ? 'Create Account' : 'Reset Password'}
                </CardTitle>
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                  Secure Access
                </Badge>
              </div>
              <CardDescription className="text-xs">
                {authMode === 'login'
                  ? 'Enter your credentials to access your dashboard'
                  : authMode === 'register'
                  ? 'Start your verified learning journey today'
                  : 'Enter your email to receive recovery instructions'}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-5 space-y-4">
              {isVerifyingEmail ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
                    Verification Email Sent
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    A confirmation link was dispatched to <strong>{email}</strong>. Logging you into the platform...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                        <Input
                          placeholder="Sneha Sharma"
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          className="pl-9 h-9 text-xs"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="pl-9 h-9 text-xs"
                        required
                      />
                    </div>
                  </div>

                  {authMode !== 'forgot' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-foreground">Password</label>
                        {authMode === 'login' && (
                          <button
                            type="button"
                            onClick={() => setAuthMode('forgot')}
                            className="text-[11px] text-primary hover:underline font-medium"
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="pl-9 h-9 text-xs"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {authMode === 'register' && (
                    <div className="space-y-1 pt-1">
                      <label className="text-xs font-medium text-foreground">Desired Track Role</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['student', 'reviewer', 'admin'] as UserRole[]).map(r => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setSelectedRole(r)}
                            className={`p-2 rounded-lg border text-xs capitalize text-center font-medium transition-colors ${
                              selectedRole === r
                                ? 'bg-primary/10 border-primary text-primary font-bold'
                                : 'bg-muted/40 border-border text-muted-foreground hover:bg-muted'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 mt-2"
                  >
                    {authMode === 'login'
                      ? 'Sign In to Dashboard'
                      : authMode === 'register'
                      ? 'Register & Verify Account'
                      : 'Send Reset Link'}
                  </Button>
                </form>
              )}

              <div className="pt-3 border-t border-border flex items-center justify-center text-xs text-muted-foreground gap-1">
                {authMode === 'login' ? (
                  <>
                    <span>Don't have an account?</span>
                    <button
                      onClick={() => setAuthMode('register')}
                      className="font-semibold text-primary hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <span>Already have an account?</span>
                    <button
                      onClick={() => setAuthMode('login')}
                      className="font-semibold text-primary hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
