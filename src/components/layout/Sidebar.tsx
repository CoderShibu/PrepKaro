import { Link, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Briefcase,
  Award,
  Bell,
  Settings,
  HelpCircle,
  FileText,
  MessageSquareCode,
  Layers,
  HelpCircle as QuestionIcon,
  CheckSquare,
  Users,
  UserCheck,
  CreditCard,
  BarChart3,
  Sliders,
  ShieldAlert,
  FolderGit2,
  ListTodo,
  CheckCircle2,
  FileCode2,
  History,
  X,
  Sparkles,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { Badge } from '../ui/badge';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const {
    currentRole,
    submissions,
    jobs,
    certificates,
    notifications,
  } = usePrepKaroStore();

  const pendingReviewsCount = submissions.filter(
    s => s.status === 'under_review' || s.status === 'submitted'
  ).length;
  const unreadNotifsCount = notifications.filter(n => !n.readAt).length;

  // Student Navigation (11 items per specification)
  const studentNavItems = [
    { title: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { title: 'Courses', to: '/courses', icon: BookOpen },
    { title: 'My Learning', to: '/my-learning', icon: GraduationCap },
    { title: 'Assignments & Projects', to: '/assignments-projects', icon: FileCheck2 },
    { title: 'Interview Preparation', to: '/interview-prep', icon: MessageSquareCode },
    { title: 'Job Openings', to: '/jobs', icon: Briefcase, badge: `${jobs.length}` },
    { title: 'Resume & Portfolio', to: '/resume-portfolio', icon: FileText },
    { title: 'Notifications', to: '/notifications', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : undefined },
    { title: 'Achievements & Certificates', to: '/certificates', icon: Award, badge: certificates.length > 0 ? `${certificates.length}` : undefined },
    { title: 'Profile & Settings', to: '/profile', icon: Settings },
    { title: 'Help & Support', to: '/help-support', icon: HelpCircle },
  ];

  // Reviewer Navigation (7 items per specification)
  const reviewerNavItems = [
    { title: 'Reviewer Dashboard', to: '/reviewer', icon: LayoutDashboard },
    { title: 'Assigned Reviews', to: '/reviewer/assigned', icon: ListTodo, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined },
    { title: 'Submission Details', to: '/reviewer/submissions', icon: FileCode2 },
    { title: 'Assessment Rubrics', to: '/reviewer/rubrics', icon: CheckSquare },
    { title: 'Review History', to: '/reviewer/history', icon: History },
    { title: 'Notifications', to: '/reviewer/notifications', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : undefined },
    { title: 'Profile & Settings', to: '/reviewer/profile', icon: Settings },
  ];

  // Admin Navigation (17 items per specification)
  const adminNavItems = [
    { title: 'Overview', to: '/admin', icon: LayoutDashboard },
    { title: 'Course Management', to: '/admin/courses', icon: BookOpen },
    { title: 'Skills & Curriculum', to: '/admin/skills', icon: Layers },
    { title: 'Lessons & Content', to: '/admin/lessons', icon: FileText },
    { title: 'Question Bank', to: '/admin/questions', icon: QuestionIcon },
    { title: 'Assessments', to: '/admin/assessments', icon: CheckSquare },
    { title: 'Assignment & Project Mgmt', to: '/admin/assignments', icon: FolderGit2 },
    { title: 'Student Management', to: '/admin/students', icon: Users },
    { title: 'Reviewer Management', to: '/admin/reviewers', icon: UserCheck },
    { title: 'Submission Reviews', to: '/admin/reviews', icon: FileCheck2, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined },
    { title: 'Payments & Refunds', to: '/admin/payments', icon: CreditCard },
    { title: 'Certificates', to: '/admin/certificates', icon: Award },
    { title: 'Job Management', to: '/admin/jobs', icon: Briefcase },
    { title: 'Analytics & Reports', to: '/admin/analytics', icon: BarChart3 },
    { title: 'Integrations', to: '/admin/integrations', icon: Sliders },
    { title: 'Security & Audit Logs', to: '/admin/audit-logs', icon: ShieldAlert },
    { title: 'Platform Settings', to: '/admin/settings', icon: Settings },
  ];

  let currentItems = studentNavItems;
  if (currentRole === 'reviewer') currentItems = reviewerNavItems;
  if (currentRole === 'admin') currentItems = adminNavItems;

  return (
    <aside className="w-64 h-full flex flex-col bg-[#0B1F44] text-white border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-teal-400 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white block leading-tight">
              Prep<span className="text-blue-400">Karo</span>
            </span>
            <span className="text-[10px] text-slate-300 font-medium tracking-wider uppercase block">
              Learn → Get Hired
            </span>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Context Bar */}
      <div className="px-4 py-2.5 bg-[#07152E] border-b border-white/5 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">
          {currentRole} Workspace
        </span>
        <span className="text-[11px] text-teal-400 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Live
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {currentItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.to ||
            (item.to !== '/' && item.to !== '/admin' && item.to !== '/reviewer' && currentPath.startsWith(item.to));

          return (
            <Link
              key={item.to + idx}
              to={item.to}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2.5 min-h-[44px] md:min-h-[38px] rounded-lg text-xs font-medium transition-all group touch-manipulation ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </div>
              {item.badge && (
                <Badge
                  className={`text-[10px] px-1.5 py-0 h-4 min-w-[18px] flex items-center justify-center font-bold border-0 ${
                    isActive ? 'bg-white text-blue-700' : 'bg-blue-500/30 text-blue-300'
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Status Card */}
      <div className="p-3.5 border-t border-white/10 bg-[#07152E]/60 m-2 rounded-xl">
        <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5">
          <span className="font-medium text-slate-200">Sequential Learning</span>
          <span className="text-teal-400 font-semibold">Active</span>
        </div>
        <p className="text-[10px] text-slate-300 leading-relaxed">
          Unlock skills sequentially through tests, assignments & projects.
        </p>
      </div>
    </aside>
  );
}
