import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Briefcase,
  Search,
  MapPin,
  Building,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Send,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { JobListing } from '../lib/types';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { toast } from 'sonner';

export const Route = createFileRoute('/jobs')({
  component: JobsPage,
});

function JobsPage() {
  const {
    jobs,
    jobApplications,
    savedJobs,
    applyForJob,
    toggleSaveJob,
    currentUser,
    resume,
  } = usePrepKaroStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedExp, setSelectedExp] = useState('All');

  // Application Dialog
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [coverNote, setCoverNote] = useState('');

  const workModes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const expLevels = ['All', 'Fresher', '1-2 years', 'Senior'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMode = selectedWorkMode === 'All' || job.workMode === selectedWorkMode;
    const matchesExp = selectedExp === 'All' || job.experienceLevel === selectedExp;
    return matchesSearch && matchesMode && matchesExp;
  });

  const handleOpenApply = (job: JobListing) => {
    setSelectedJob(job);
    setCoverNote(`Excited to apply for the ${job.title} position at ${job.company}. As a certified PrepKaro graduate, I have built verified production projects.`);
    setApplyDialogOpen(true);
  };

  const handleConfirmApply = () => {
    if (!selectedJob) return;
    applyForJob(selectedJob.id, coverNote);
    setApplyDialogOpen(false);
    toast.success(`Application submitted to ${selectedJob.company}! Status: Reviewing`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-semibold">
                Direct Hiring Partners
              </Badge>
              <span className="text-xs text-muted-foreground">• Verified Placement Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Job Openings & Careers
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Discover opportunities with automatic skill-match benchmarking and one-click applications.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
              <Input
                placeholder="Search by job title, company, or skills (e.g. Next.js, AI, Python)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {workModes.map(mode => (
                <button
                  key={mode}
                  onClick={() => setSelectedWorkMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    selectedWorkMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid gap-4">
          {filteredJobs.map(job => {
            const hasApplied = jobApplications.some(
              a => a.jobId === job.id && a.userId === currentUser.id
            );
            const isSaved = savedJobs.some(
              s => s.jobId === job.id && s.userId === currentUser.id
            );

            // Compute skill match count against student's skills
            const matchedSkills = job.requiredSkills.filter(s =>
              currentUser.skillsInterests.some(ci => ci.toLowerCase() === s.toLowerCase())
            );
            const matchPercent = Math.round(
              (matchedSkills.length / Math.max(1, job.requiredSkills.length)) * 100
            );

            return (
              <Card
                key={job.id}
                className="border-border shadow-sm hover:shadow-md transition-shadow bg-card"
              >
                <CardContent className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                        {job.company.charAt(0)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-foreground">{job.title}</h3>
                          <Badge variant="secondary" className="text-[10px] font-semibold">
                            {job.workMode}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] font-semibold">
                            {job.employmentType}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <Building className="w-3.5 h-3.5 text-muted-foreground" />
                            {job.company}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Match Badge & Bookmark */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300 text-xs font-bold gap-1 px-2.5 py-0.5">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {matchPercent}% Skill Match
                      </Badge>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-blue-50 dark:bg-blue-950 border-blue-400 text-blue-600'
                            : 'border-border text-muted-foreground hover:bg-muted'
                        }`}
                        aria-label="Save job"
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">Required:</span>
                    {job.requiredSkills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Compensation & Apply Footer */}
                  <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-muted-foreground block text-[10px]">Estimated Compensation</span>
                      <span className="font-bold text-foreground text-sm">{job.salaryRange}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasApplied ? (
                        <Button size="sm" variant="outline" disabled className="text-xs h-8 text-emerald-600 border-emerald-300 gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied • In Review</span>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleOpenApply(job)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-4 gap-1.5"
                        >
                          <span>1-Click Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Application Modal */}
        <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Apply to {selectedJob?.company}</DialogTitle>
              <DialogDescription className="text-xs">
                Position: {selectedJob?.title} ({selectedJob?.location})
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1">
                <span className="font-bold text-foreground block">Attached Candidate Profile:</span>
                <p className="text-muted-foreground">{resume.fullName} • {resume.title}</p>
                <p className="text-muted-foreground">{resume.email} • {resume.phone}</p>
                <div className="pt-1 text-[11px] text-teal-600 font-semibold">
                  Verified PrepKaro credentials and case studies automatically attached.
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Cover Note / Candidate Pitch</label>
                <Textarea
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  rows={4}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setApplyDialogOpen(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button size="sm" onClick={handleConfirmApply} className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Submit Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
