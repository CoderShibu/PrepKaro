import { Link } from '@tanstack/react-router';
import { Clock, BookOpen, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Course } from '../../types';

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div>
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
          <img
            src={course.coverImageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2.5 left-2.5">
            <Badge className="bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium border-0">
              {course.level}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold uppercase tracking-wider">
            <span>{course.category}</span>
          </div>

          <h3 className="font-bold text-base text-foreground line-clamp-1">{course.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>

          <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.estHours}h
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {course.instructorName}
            </span>
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0">
        <Link to={`/courses/${course.slug}`}>
          <Button className="w-full text-xs font-semibold h-9 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
            <span>View Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
