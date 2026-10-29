import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  FileText,
  Printer,
  Sparkles,
  Github,
  Globe,
  Linkedin,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  FolderGit2,
  CheckCircle2,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export const Route = createFileRoute('/resume-portfolio')({
  component: ResumePortfolioPage,
});

function ResumePortfolioPage() {
  const { resume, updateResume, submissions, certificates, currentUser } = usePrepKaroStore();

  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'portfolio'>('preview');

  // Form states initialized with resume
  const [fullName, setFullName] = useState(resume.fullName);
  const [title, setTitle] = useState(resume.title);
  const [email, setEmail] = useState(resume.email);
  const [phone, setPhone] = useState(resume.phone);
  const [location, setLocation] = useState(resume.location);
  const [summary, setSummary] = useState(resume.summary);
  const [skillsText, setSkillsText] = useState(resume.skills.join(', '));

  const approvedProjects = submissions.filter(
    s => s.userId === currentUser.id && s.kind === 'project' && s.status === 'approved'
  );

  const handleSaveResume = () => {
    updateResume(prev => ({
      ...prev,
      fullName,
      title,
      email,
      phone,
      location,
      summary,
      skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
    }));
    toast.success('Resume updated and saved!');
    setActiveTab('preview');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
                Career Assets
              </Badge>
              <span className="text-xs text-muted-foreground">• Live ATS-Friendly Builder</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Resume & Portfolio Showcase
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Generate ATS-optimized resumes automatically linked to your verified PrepKaro credentials and case studies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="text-xs h-9 gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF / Print</span>
            </Button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)}>
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="text-xs">Live Resume Preview</TabsTrigger>
            <TabsTrigger value="editor" className="text-xs">Edit Details</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">Verified Portfolio ({approvedProjects.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* TAB 1: PREVIEW (Printable Resume Template) */}
        {activeTab === 'preview' && (
          <div className="bg-card border border-border shadow-lg rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6 text-foreground print:border-0 print:shadow-none print:p-0">
            {/* Header */}
            <div className="border-b border-border pb-6 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{resume.fullName}</h1>
                <Badge className="bg-blue-600 text-white text-[11px] font-semibold self-start sm:self-auto">
                  PrepKaro Certified Graduate
                </Badge>
              </div>
              <p className="text-sm font-semibold text-primary">{resume.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span>{resume.email}</span>
                <span>•</span>
                <span>{resume.phone}</span>
                <span>•</span>
                <span>{resume.location}</span>
                {resume.socials.github && (
                  <>
                    <span>•</span>
                    <a href={resume.socials.github} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      GitHub
                    </a>
                  </>
                )}
                {resume.socials.portfolio && (
                  <>
                    <span>•</span>
                    <a href={resume.socials.portfolio} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      Portfolio
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Professional Summary
              </h2>
              <p className="text-xs leading-relaxed text-foreground/90">{resume.summary}</p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Technical Skills & Competencies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Professional Experience
              </h2>
              {resume.experience.map(exp => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-foreground">
                    <span>{exp.role} · {exp.company}</span>
                    <span className="text-muted-foreground font-normal">{exp.duration}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Verified Projects */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Verified Production Projects (Faculty Evaluated)
              </h2>
              {resume.projects.map(proj => (
                <div key={proj.id} className="space-y-1 text-xs p-3 rounded-xl bg-muted/30 border border-border/60">
                  <div className="flex items-center justify-between font-bold text-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      {proj.title}
                    </span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-primary text-[11px] hover:underline flex items-center gap-1 font-medium">
                        Live Demo <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <span className="text-[11px] text-blue-600 font-medium block">Tech Stack: {proj.techStack}</span>
                  <p className="text-muted-foreground leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>

            {/* Education & Certifications */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
              <div className="space-y-1 text-xs">
                <h3 className="font-bold text-foreground">Education</h3>
                {resume.education.map(edu => (
                  <div key={edu.id} className="text-muted-foreground">
                    <strong className="text-foreground">{edu.degree}</strong>
                    <div>{edu.institution} ({edu.year})</div>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs">
                <h3 className="font-bold text-foreground">Verified Certifications</h3>
                {certificates.map(cert => (
                  <div key={cert.id} className="text-muted-foreground">
                    <strong className="text-foreground">{cert.courseTitle}</strong>
                    <div className="text-[11px] text-teal-600 font-mono">ID: {cert.code} • Grade: {cert.finalGrade}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDITOR */}
        {activeTab === 'editor' && (
          <Card className="border-border shadow-sm max-w-3xl mx-auto">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base font-bold">Edit Resume Details</CardTitle>
              <CardDescription className="text-xs">
                Update your contact details, summary, and skills list.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Full Name</label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Professional Title</label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} className="text-xs h-9" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Email</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Phone</label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} className="text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Location</label>
                  <Input value={location} onChange={e => setLocation(e.target.value)} className="text-xs h-9" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Professional Summary</label>
                <Textarea rows={3} value={summary} onChange={e => setSummary(e.target.value)} className="text-xs" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Skills (Comma-separated)</label>
                <Input value={skillsText} onChange={e => setSkillsText(e.target.value)} className="text-xs h-9" />
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={handleSaveResume} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: VERIFIED PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-muted-foreground space-y-1">
              <span className="font-bold text-foreground block">Verified Showcase:</span>
              <p>
                Approved case study projects are automatically stamped with reviewer grades and plagiarism verification, giving hiring managers authentic proof of work.
              </p>
            </div>

            <div className="grid gap-4">
              {approvedProjects.map(sub => (
                <Card key={sub.id} className="border-border shadow-sm bg-card p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">
                          Approved Capstone
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">Grade: {sub.score}/100</span>
                      </div>
                      <h3 className="font-bold text-base text-foreground mt-1">{sub.targetTitle}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{sub.textResponse}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {sub.repoUrl && (
                        <a href={sub.repoUrl} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
                            <Github className="w-3.5 h-3.5" /> Code
                          </Button>
                        </a>
                      )}
                      {sub.demoUrl && (
                        <a href={sub.demoUrl} target="_blank" rel="noreferrer">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 gap-1.5">
                            <Globe className="w-3.5 h-3.5" /> Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
