export type UserRole = 'student' | 'reviewer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  professionalSummary?: string;
  skillsInterests: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  notifyEmail: boolean;
  role: UserRole;
  createdAt: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estHours: number;
  coverImageUrl: string;
  instructorName: string;
  instructorRole?: string;
  instructorAvatar?: string;
  status: 'draft' | 'published' | 'archived';
  completionNote?: string;
  skillsCount?: number;
  lessonsCount?: number;
  price: number;
  currency: string;
  prerequisites: string[];
  learningOutcomes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  courseId: string;
  title: string;
  description: string;
  position: number;
  requiresPracticeTest: boolean;
  requiresAssignment: boolean;
  requiresProject: boolean;
  passScore: number;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface LessonResource {
  id: string;
  lessonId: string;
  title: string;
  url: string;
  kind: 'pdf' | 'link' | 'github' | 'zip';
}

export interface Lesson {
  id: string;
  skillId: string;
  title: string;
  position: number;
  contentType: 'video' | 'text';
  videoUrl?: string;
  content: string;
  durationMins: number;
  isFreePreview: boolean;
  resources?: LessonResource[];
  createdAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  skillId?: string;
  topicId?: string;
  type: 'mcq' | 'multi_select' | 'true_false' | 'short_answer';
  prompt: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  status: 'active' | 'archived';
  createdAt: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  skillId: string;
  title: string;
  description: string;
  kind: 'practice_test' | 'final_exam';
  timeLimitMins: number;
  maxAttempts: number;
  passScore: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  status: 'draft' | 'published';
  questionIds: string[];
  createdAt: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  startedAt: string;
  submittedAt?: string;
  expiresAt?: string;
  status: 'in_progress' | 'submitted' | 'expired';
  score?: number;
  passed?: boolean;
  answers: Record<string, string | string[]>;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  weight: number;
}

export interface Rubric {
  id: string;
  title: string;
  criteria: RubricCriterion[];
  createdAt: string;
}

export interface Assignment {
  id: string;
  skillId: string;
  title: string;
  instructions: string;
  deadline?: string;
  allowedTypes: string;
  maxFileMb: number;
  required: boolean;
  rubricId?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  skillId: string;
  title: string;
  brief: string;
  objectives: string;
  deliverables: string;
  deadline?: string;
  rubricId?: string;
  createdAt: string;
}

export type SubmissionStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'revision_requested';

export interface Submission {
  id: string;
  kind: 'assignment' | 'project';
  targetId: string;
  targetTitle?: string;
  courseId?: string;
  skillId?: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  status: SubmissionStatus;
  textResponse: string;
  repoUrl?: string;
  demoUrl?: string;
  fileName?: string;
  fileSize?: string;
  attempt: number;
  submittedAt?: string;
  reviewerId?: string;
  reviewerName?: string;
  reviewedAt?: string;
  score?: number;
  feedback?: string;
  rubricScores?: Record<string, number>;
  plagiarismScore?: number;
  plagiarismStatus?: 'clear' | 'suspicious' | 'pending';
  isPublishedInPortfolio?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  code: string;
  userId: string;
  recipientName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  status: 'valid' | 'revoked';
  finalGrade: number;
  completedSkillsCount: number;
  verificationUrl: string;
  instructorName: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Internship' | 'Contract';
  experienceLevel: 'Fresher' | '1-2 years' | '3-5 years' | 'Senior';
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  responsibilities: string[];
  qualifications: string[];
  deadline: string;
  status: 'active' | 'closed';
  postedAt: string;
  applicationsCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'applied' | 'reviewing' | 'shortlisted' | 'rejected' | 'interview_scheduled';
  appliedAt: string;
  coverNote?: string;
}

export interface SavedJob {
  id: string;
  jobId: string;
  userId: string;
  savedAt: string;
}

export interface ResumeData {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    year: string;
  }[];
  projects: {
    id: string;
    title: string;
    techStack: string;
    description: string;
    link?: string;
  }[];
  socials: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export interface InterviewQuestion {
  id: string;
  category: string;
  company?: string;
  title: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  modelAnswer: string;
  tips: string[];
  relatedSkill?: string;
}

export interface MockInterviewSession {
  id: string;
  userId: string;
  category: string;
  company?: string;
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed';
  answers: {
    questionId: string;
    questionText: string;
    userResponse: string;
    aiScore?: number;
    aiFeedback?: string;
    strengths?: string[];
    improvements?: string[];
  }[];
  overallScore?: number;
  overallFeedback?: string;
}

export interface RefundRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  reason: string;
  reasonCategory: 'content_dissatisfaction' | 'scheduling_conflict' | 'financial_need' | 'other';
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'succeeded';
  adminNotes?: string;
  transactionRef: string;
  eligibilityPassed: boolean;
  eligibilityDetails: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  role: UserRole;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: 'enrollment' | 'lesson' | 'assessment' | 'assignment' | 'review' | 'certificate' | 'job' | 'system';
  title: string;
  body: string;
  link?: string;
  readAt?: string;
  createdAt: string;
}

export interface IntegrationStatus {
  id: string;
  name: string;
  category: 'ai' | 'plagiarism' | 'payment' | 'email' | 'storage';
  provider: string;
  status: 'connected' | 'sandbox' | 'not_configured' | 'error';
  lastChecked: string;
  description: string;
  docsUrl?: string;
}
