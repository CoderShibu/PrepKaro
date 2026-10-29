import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import {
  Clock,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  PlayCircle,
  HelpCircle,
  FileCheck2,
  FolderGit2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Share2,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { toast } from 'sonner';

export const Route = createFileRoute('/courses/$slug')({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { slug } = useParams({ from: '/courses/$slug' });
  const { courses, skills, lessons, enrollments, currentUser, enrollInCourse } = usePrepKaroStore();

  const course = courses.find(c => c.slug === slug) || courses[0];
  const courseSkills = skills
    .filter(s => s.courseId === course.id)
    .sort((a, b) => a.position - b.position);

  const isEnrolled = enrollments.some(
    e => e.courseId === course.id && e.userId === currentUser.id
  );

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Course Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0B1F44] to-[#12366B] text-white p-6 sm:p-10 shadow-lg">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 text-xs font-semibold">
                {course.category}
              </Badge>
              <Badge variant="secondary" className="text-xs font-semibold">
                {course.level}
              </Badge>
              <span className="text-xs text-slate-300">• Verified Syllabus</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course.description}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-200">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                {course.estHours} Hours
              </span>
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                {courseSkills.length} Sequential Skills
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Official Certificate Included
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {isEnrolled ? (
                <Link to={`/learn/${course.slug}`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-11 px-6 gap-2 shadow-md">
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={() => {
                    enrollInCourse(course.id);
                    toast.success(`Enrolled in ${course.title}!`);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-11 px-6 gap-2 shadow-md"
                >
                  <span>Enroll for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Two-Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Curriculum & Outcomes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Outcomes */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold">What You Will Master</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2.5">
                {course.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sequential Curriculum Tree */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Curriculum & Sequential Path</CardTitle>
                  <CardDescription className="text-xs">
                    4-step progression for every skill: Lessons → Quiz → Assignment → Project
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                  {courseSkills.length} Skills
                </Badge>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {courseSkills.map((skill, index) => {
                  const skillLessons = lessons.filter(l => l.skillId === skill.id);

                  return (
                    <div
                      key={skill.id}
                      className="p-4 rounded-xl border border-border bg-card/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            Skill Module {index + 1}
                          </span>
                          <h4 className="font-bold text-sm text-foreground mt-0.5">{skill.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{skill.description}</p>
                        </div>
                        {index === 0 ? (
                          <Badge className="bg-blue-100 text-blue-800 text-[10px]">Unlocked</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] gap-1 text-muted-foreground">
                            <Lock className="w-2.5 h-2.5" /> Requires Skill {index}
                          </Badge>
                        )}
                      </div>

                      {/* Milestones inside this skill */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1.5 p-2 rounded bg-muted/40">
                          <PlayCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span className="truncate">{skillLessons.length} Lessons</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 rounded bg-muted/40">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">Practice Quiz ({skill.passScore}%)</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 rounded bg-muted/40">
                          <FileCheck2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">Assignment</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 rounded bg-muted/40">
                          <FolderGit2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span className="truncate">Case Study</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Col: Instructor, Prerequisites & Policy */}
          <div className="space-y-6">
            {/* Instructor Card */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-sm font-bold">Faculty & Lead Instructor</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex items-center gap-3">
                <img
                  src={course.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={course.instructorName}
                  className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-foreground">{course.instructorName}</h4>
                  <p className="text-xs text-muted-foreground">{course.instructorRole}</p>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-sm font-bold">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2">
                {course.prerequisites.map((prereq, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{prereq}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Guarantee / Refund Policy Summary */}
            <Card className="border-border shadow-sm bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  PrepKaro Guarantee Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  Free enrollment with complete sequential access. All projects evaluated by verified reviewers.
                </p>
                <div className="pt-2 border-t border-border flex items-center gap-2 text-[11px] text-teal-700 dark:text-teal-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>100% Verifiable Certificates</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
