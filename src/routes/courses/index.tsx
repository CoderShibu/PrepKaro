import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  Clock,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

export const Route = createFileRoute('/courses/')({
  component: CoursesCatalogPage,
});

function CoursesCatalogPage() {
  const { courses, skills, enrollments, currentUser, enrollInCourse } = usePrepKaroStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Data Science'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCat && matchesLevel;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 font-semibold">
                Industry-Verified
              </Badge>
              <span className="text-xs text-muted-foreground">• Sequential Tracks</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Course Catalog
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Explore job-ready curricula with integrated practice tests, assignments, and capstones.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
              <Input
                placeholder="Search courses, skills, frameworks, tools..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const isEnrolled = enrollments.some(
              e => e.courseId === course.id && e.userId === currentUser.id
            );
            const courseSkills = skills.filter(s => s.courseId === course.id);

            return (
              <Card
                key={course.id}
                className="border-border shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden bg-card group"
              >
                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.coverImageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#0B1F44]/90 backdrop-blur text-white text-[10px] font-semibold">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Metadata */}
                  <div className="pt-2 border-t border-border/60 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {course.estHours} total hours
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-500" />
                      {courseSkills.length} Sequential Skills
                    </span>
                  </div>

                  {/* Instructor & Actions */}
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Tuition</span>
                      <span className="text-xs font-bold text-emerald-600">Free Enrollment</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/courses/${course.slug}`}>
                        <Button variant="outline" size="sm" className="text-xs h-8 px-3">
                          Syllabus
                        </Button>
                      </Link>

                      {isEnrolled ? (
                        <Link to={`/learn/${course.slug}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-3 gap-1">
                            <span>Continue</span>
                            <ChevronRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => enrollInCourse(course.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-3"
                        >
                          Enroll Free
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="p-12 text-center border border-dashed border-border rounded-xl bg-card space-y-3">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto opacity-50" />
            <h3 className="font-bold text-base text-foreground">No courses found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search keywords or resetting your filter criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="text-xs h-8"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
