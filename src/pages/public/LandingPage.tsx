import { Link } from '@tanstack/react-router';
import {
  Sparkles,
  ArrowRight,
  Award,
  ShieldCheck,
  ChevronRight,
  PlayCircle,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export function LandingPage() {
  const { courses, switchRole, currentRole } = usePrepKaroStore();

  const hiringCompanies = [
    { name: 'Razorpay', domain: 'Payments' },
    { name: 'Swiggy', domain: 'Consumer Tech' },
    { name: 'Flipkart', domain: 'E-Commerce' },
    { name: 'TCS', domain: 'Enterprise IT' },
    { name: 'Infosys', domain: 'Cloud Consulting' },
    { name: 'Google', domain: 'Cloud Infrastructure' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Brand Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B1F44] flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-lg">P</span>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-foreground block leading-tight">
                Prep<span className="text-blue-600">Karo</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase block">
                Technical LMS & Placement
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
            <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
            <Link to="/jobs" className="hover:text-foreground transition-colors">Job Openings</Link>
            <Link to="/interview-prep" className="hover:text-foreground transition-colors">Interview Prep</Link>
            <Link to="/verify/PREP-2026-REACT-8842" className="hover:text-foreground transition-colors">Verify Credential</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button size="sm" variant="outline" className="text-xs h-9 font-semibold rounded-md">
                Dashboard
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 font-semibold gap-1.5 shadow-sm rounded-md">
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-[#0B1F44] text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs px-3 py-1 font-semibold mb-6 gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            Deterministic Sequential Learning & Assessment Engine
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Learn <span className="text-blue-400">→</span> Practice <span className="text-blue-400">→</span> Prove <span className="text-blue-400">→</span> Build <span className="text-teal-400">→ Get Hired</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Structured online learning, verifiable technical assessments, practical code assignments, and career opportunities in one unified platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm h-12 px-8 shadow-md gap-2 rounded-md">
                <span>Browse Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm h-12 px-6 rounded-md">
                Student Workspace
              </Button>
            </Link>
          </div>

          {/* Quick Demo Switcher Prompt */}
          <div className="mt-10 pt-6 border-t border-white/10 max-w-xl mx-auto flex items-center justify-center gap-3 text-xs text-slate-300">
            <span className="font-semibold text-white">Role Switcher:</span>
            <button
              onClick={() => switchRole('student')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                currentRole === 'student' ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => switchRole('reviewer')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                currentRole === 'reviewer' ? 'bg-teal-600 text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Reviewer
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                currentRole === 'admin' ? 'bg-slate-700 text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </section>

      {/* Sequential Learning Engine Model Section */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-100 text-blue-800 text-xs px-3 py-1 font-semibold mb-3">
              The PrepKaro Progression Model
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Deterministic Sequential Unlocking
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              No skipping ahead. Skills unlock only after passing verified knowledge tests, practical assignments, and faculty-reviewed case study projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="h-1 bg-blue-600 absolute top-0 inset-x-0" />
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1</div>
                <h3 className="font-bold text-base text-foreground">Interactive Lessons</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Deep-dive video explanations, executable code walkthroughs, and architectural diagrams.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="h-1 bg-amber-500 absolute top-0 inset-x-0" />
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 2</div>
                <h3 className="font-bold text-base text-foreground">Practice Tests</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Server-scored technical assessments with multiple-choice, multi-select, and pass criteria.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="h-1 bg-teal-600 absolute top-0 inset-x-0" />
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">Step 3</div>
                <h3 className="font-bold text-base text-foreground">Skill Assignments</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Submit real repositories and code. Evaluated with structured rubrics and plagiarism checks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="h-1 bg-emerald-600 absolute top-0 inset-x-0" />
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 4</div>
                <h3 className="font-bold text-base text-foreground">Unlock Next & Certify</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upon 100% completion, unlock verified certificates with tamper-proof public credentials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses Catalog Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge className="bg-teal-100 text-teal-800 text-xs px-3 py-1 font-semibold mb-2">
                Industry Curriculum
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Featured Career Tracks
              </h2>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="text-xs font-semibold gap-1.5 h-9">
                <span>View All Courses</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map(course => (
              <Card key={course.id} className="border-border shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden bg-card">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.coverImageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#0B1F44]/90 backdrop-blur text-white text-[10px] font-semibold">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {course.category}
                    </span>
                    <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Tuition</span>
                      <span className="text-sm font-bold text-emerald-600">Free Enrollment</span>
                    </div>

                    <Link to={`/courses/${course.slug}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-4">
                        Explore Syllabus
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
            Industry Aligned Tracks for Production Roles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            {hiringCompanies.map((c, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background shadow-xs">
                <span className="font-bold text-foreground text-sm">{c.name}</span>
                <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                  {c.domain}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1F44] text-white pt-14 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <span className="font-extrabold text-base tracking-tight text-white block">
                Prep<span className="text-blue-400">Karo</span>
              </span>
              <p className="text-slate-400 leading-relaxed text-xs">
                Production-ready learning management, verifiable assessments, and career preparation platform for technical roles.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Learning Tracks
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
                <li><Link to="/my-learning" className="hover:text-white transition-colors">My Learning Dashboard</Link></li>
                <li><Link to="/assignments-projects" className="hover:text-white transition-colors">Assignments & Projects</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Career Support
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/interview-prep" className="hover:text-white transition-colors">Interview Preparation</Link></li>
                <li><Link to="/jobs" className="hover:text-white transition-colors">Job Openings</Link></li>
                <li><Link to="/resume-portfolio" className="hover:text-white transition-colors">Resume & Portfolio</Link></li>
                <li><Link to="/verify/PREP-2026-REACT-8842" className="hover:text-white transition-colors">Public Credential Verification</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Legal & Governance
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
                <li><Link to="/help-support" className="hover:text-white transition-colors">14-Day Refund Guarantee</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <span>(c) 2026 PrepKaro Education Technologies. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span>·</span>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span>·</span>
              <Link to="/help-support" className="hover:text-white transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
