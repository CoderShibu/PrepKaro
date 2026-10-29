import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Layers,
  Clock,
  Eye,
  Archive,
} from 'lucide-react';
import { usePrepKaroStore } from '../../lib/store';
import { Course } from '../../lib/types';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/courses')({
  component: AdminCoursesPage,
});

function AdminCoursesPage() {
  const { courses, skills, saveCourse, deleteCourse } = usePrepKaroStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [estHours, setEstHours] = useState(40);
  const [instructorName, setInstructorName] = useState('PrepKaro Faculty');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  const filteredCourses = courses.filter(
    c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setCategory('Web Development');
    setLevel('Beginner');
    setEstHours(40);
    setInstructorName('PrepKaro Faculty');
    setCoverImageUrl('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800');
    setStatus('published');
    setCourseModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setSlug(course.slug);
    setDescription(course.description);
    setCategory(course.category);
    setLevel(course.level);
    setEstHours(course.estHours);
    setInstructorName(course.instructorName);
    setCoverImageUrl(course.coverImageUrl);
    setStatus(course.status as any);
    setCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      toast.error('Title and URL slug are required.');
      return;
    }

    const courseToSave: Course = {
      id: editingCourse ? editingCourse.id : `course-${Date.now()}`,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      title,
      description,
      category,
      level,
      estHours: Number(estHours),
      coverImageUrl: coverImageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      instructorName,
      status,
      price: 0,
      currency: 'INR',
      prerequisites: editingCourse ? editingCourse.prerequisites : ['Basic programming fundamentals'],
      learningOutcomes: editingCourse ? editingCourse.learningOutcomes : ['Master core industry workflows'],
      createdAt: editingCourse ? editingCourse.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveCourse(courseToSave);
    setCourseModalOpen(false);
    toast.success(editingCourse ? 'Course updated successfully!' : 'New course created and published!');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-[10px] px-2 py-0.5 font-semibold">
                Curriculum Operations
              </Badge>
              <span className="text-xs text-muted-foreground">• Course Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Course Management ({courses.length})
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Create, edit, publish, and configure sequential career tracks.
            </p>
          </div>

          <Button
            onClick={handleOpenCreate}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 px-4 gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </Button>
        </div>

        {/* Search */}
        <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            <Input
              placeholder="Search courses by title or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        {/* Courses Table */}
        <Card className="border-border shadow-sm overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5 pl-5">Course Title</th>
                  <th className="p-3.5">Category & Level</th>
                  <th className="p-3.5">Hours</th>
                  <th className="p-3.5">Skills</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCourses.map(course => {
                  const courseSkills = skills.filter(s => s.courseId === course.id);

                  return (
                    <tr key={course.id} className="hover:bg-muted/40 transition-colors">
                      <td className="p-3.5 pl-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.coverImageUrl}
                            alt={course.title}
                            className="w-10 h-10 rounded-lg object-cover border border-border shrink-0"
                          />
                          <div>
                            <span className="font-bold text-foreground block">{course.title}</span>
                            <span className="text-[11px] text-muted-foreground font-mono">/{course.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="text-foreground block font-medium">{course.category}</span>
                        <Badge variant="secondary" className="text-[10px] mt-0.5">{course.level}</Badge>
                      </td>

                      <td className="p-3.5 font-medium">{course.estHours} hrs</td>

                      <td className="p-3.5">
                        <Badge variant="outline" className="text-xs font-semibold">
                          {courseSkills.length} Skills
                        </Badge>
                      </td>

                      <td className="p-3.5">
                        <Badge
                          className={`text-[10px] ${
                            course.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {course.status.toUpperCase()}
                        </Badge>
                      </td>

                      <td className="p-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(course)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            aria-label="Edit course"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm(`Archive course "${course.title}"?`)) {
                                deleteCourse(course.id);
                                toast.success('Course archived');
                              }
                            }}
                            className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            aria-label="Archive course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Create / Edit Course Modal */}
        <Dialog open={courseModalOpen} onOpenChange={setCourseModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">
                {editingCourse ? 'Edit Course Details' : 'Create New Career Track'}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Configure course metadata, category, and publishing status.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveCourse} className="space-y-3.5 py-2 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Course Title</label>
                <Input
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    if (!editingCourse) {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                    }
                  }}
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">URL Slug</label>
                <Input
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  className="text-xs h-9 font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development" className="text-xs">Web Development</SelectItem>
                      <SelectItem value="Artificial Intelligence" className="text-xs">Artificial Intelligence</SelectItem>
                      <SelectItem value="Data Science" className="text-xs">Data Science</SelectItem>
                      <SelectItem value="Cloud & DevOps" className="text-xs">Cloud & DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Level</label>
                  <Select value={level} onValueChange={v => setLevel(v as any)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner" className="text-xs">Beginner</SelectItem>
                      <SelectItem value="Intermediate" className="text-xs">Intermediate</SelectItem>
                      <SelectItem value="Advanced" className="text-xs">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Est. Total Hours</label>
                  <Input
                    type="number"
                    value={estHours}
                    onChange={e => setEstHours(Number(e.target.value))}
                    className="text-xs h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Publishing Status</label>
                  <Select value={status} onValueChange={v => setStatus(v as any)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published" className="text-xs">Published</SelectItem>
                      <SelectItem value="draft" className="text-xs">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Instructor Name</label>
                <Input
                  value={instructorName}
                  onChange={e => setInstructorName(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Cover Image URL</label>
                <Input
                  value={coverImageUrl}
                  onChange={e => setCoverImageUrl(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Description</label>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setCourseModalOpen(false)} className="text-xs h-8">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                  Save Course
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}
