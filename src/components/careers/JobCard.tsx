import { Building2, MapPin, Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { JobListing } from '../../types';

interface JobCardProps {
  job: JobListing;
  onApply?: () => void;
  isApplied?: boolean;
}

export function JobCard({ job, onApply, isApplied }: JobCardProps) {
  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-foreground line-clamp-1">{job.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{job.company}</span>
              </p>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">
              {job.workMode}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {job.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> {job.employmentType}
            </span>
            <span>•</span>
            <span className="font-semibold text-foreground">{job.salaryRange}</span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.requiredSkills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-[10px] px-2 py-0">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Closes: {job.deadline}
          </span>

          <Button
            size="sm"
            disabled={isApplied}
            onClick={onApply}
            className={`text-xs h-8 ${
              isApplied
                ? 'bg-muted text-muted-foreground'
                : 'bg-blue-600 hover:bg-blue-700 text-white font-medium'
            }`}
          >
            {isApplied ? 'Applied' : 'Apply Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
