import { createFileRoute, Link } from '@tanstack/react-router';
import {
  GraduationCap,
  PlayCircle,
  Clock,
  Layers,
  Award,
  ChevronRight,
  BookOpen,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { usePrepKaroStore } from '../lib/store';
import { AppShell } from '../components/layout/AppShell';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export const Route = createFileRoute('/my-learning')({
  component: MyLearningPage,
});

function MyLearningPage() {
  const { courses, skills, enrollments, currentUser } = usePrepKaroStore();

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);
  const enrolledCourses = courses.filter(c => userEnrollments.some(e => e.courseId === c.id));

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="pb-2 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
              Enrolled Tracks
            </Badge>
            <span className="text-xs text-muted-foreground">• Active Study Progress</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            My Learning
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Track course completion percentages, completed skills, and resume your active lessons.
          </p>
        </div>

        {/* Enrolled Courses Cards */}
        <div className="grid gap-6">
          {enrolledCourses.map(course => {
            const courseSkills = skills.filter(s => s.courseId === course.id);

            return (
              <Card key={course.id} className="border-border shadow-sm overflow-hidden bg-card">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 aspect-video md:aspect-auto shrink-0 bg-slate-900 overflow-hidden relative">
                    <img
                      src={course.coverImageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#0B1F44]/90 text-white text-[10px]">
                        {course.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                          {course.level} Track
                        </span>
                        <span className="text-xs font-semibold text-teal-600">65% Completed</span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mt-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Progress bar */}
                      <div className="w-full bg-muted h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-blue-500" />
                          {courseSkills.length} Skills
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-500" />
                          {course.estHours} Hours
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/courses/${course.slug}`}>
                          <Button variant="outline" size="sm" className="text-xs h-8">
                            Syllabus
                          </Button>
                        </Link>
                        <Link to={`/learn/${course.slug}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 gap-1">
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>Continue Learning</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {enrolledCourses.length === 0 && (
          <div className="p-12 text-center border border-dashed border-border rounded-xl bg-card space-y-3">
            <GraduationCap className="w-10 h-10 text-muted-foreground mx-auto opacity-50" />
            <h3 className="font-bold text-base text-foreground">No active enrollments</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Explore our verified curriculum and enroll in your first career track today.
            </p>
            <Link to="/courses">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
