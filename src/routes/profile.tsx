import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { currentUser, currentRole } = usePrepKaroStore();

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [linkedin, setLinkedin] = useState(currentUser.linkedinUrl || '');
  const [github, setGithub] = useState(currentUser.githubUrl || '');
  const [portfolio, setPortfolio] = useState(currentUser.portfolioUrl || '');
  const [emailNotifs, setEmailNotifs] = useState(currentUser.notifyEmail);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile preferences successfully saved!');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
              Account Settings
            </Badge>
            <span className="text-xs text-muted-foreground">• Identity & Security</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage your personal profile, contact information, social links, and notification preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar and Basic Info */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base font-bold">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                  alt={currentUser.fullName}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">{currentUser.fullName}</h4>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {currentRole} Account
                  </Badge>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Full Name</label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Phone Number</label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} className="text-xs h-9" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Bio / Career Objective</label>
                <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="text-xs" />
              </div>
            </CardContent>
          </Card>

          {/* Social Profiles */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base font-bold">Professional Profiles</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn Profile
                </label>
                <Input value={linkedin} onChange={e => setLinkedin(e.target.value)} className="text-xs h-9" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-foreground" /> GitHub Profile
                </label>
                <Input value={github} onChange={e => setGithub(e.target.value)} className="text-xs h-9" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-teal-600" /> Portfolio Website
                </label>
                <Input value={portfolio} onChange={e => setPortfolio(e.target.value)} className="text-xs h-9" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Privacy */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base font-bold">Preferences & Notifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground block">Email Notifications</span>
                  <span className="text-muted-foreground">Receive updates on review feedback and deadlines.</span>
                </div>
                <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <span className="font-semibold text-foreground block">Job Opportunity Alerts</span>
                  <span className="text-muted-foreground">Notify when a new role matches your completed skills.</span>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
