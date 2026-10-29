import { useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Course,
  Skill,
  Lesson,
  Question,
  Assessment,
  AssessmentAttempt,
  Assignment,
  Project,
  Rubric,
  Submission,
  Certificate,
  JobListing,
  JobApplication,
  SavedJob,
  ResumeData,
  InterviewQuestion,
  MockInterviewSession,
  RefundRequest,
  AuditLog,
  AppNotification,
  IntegrationStatus,
} from './types';
import {
  INITIAL_PROFILES,
  INITIAL_COURSES,
  INITIAL_SKILLS,
  INITIAL_LESSONS,
  INITIAL_QUESTIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_PROJECTS,
  INITIAL_RUBRICS,
  INITIAL_SUBMISSIONS,
  INITIAL_CERTIFICATES,
  INITIAL_JOBS,
  INITIAL_INTERVIEW_QUESTIONS,
  INITIAL_RESUME,
  INITIAL_REFUND_REQUESTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_INTEGRATIONS,
} from './mock-data';
import { ProgressionEngine } from './progression';

export interface AppState {
  currentRole: UserRole;
  currentUserId: string;
  profiles: UserProfile[];
  courses: Course[];
  skills: Skill[];
  lessons: Lesson[];
  enrollments: { courseId: string; userId: string; enrolledAt: string }[];
  completedLessonIds: string[]; // lessonIds completed by current student
  questions: Question[];
  assessments: Assessment[];
  attempts: AssessmentAttempt[];
  assignments: Assignment[];
  projects: Project[];
  rubrics: Rubric[];
  submissions: Submission[];
  certificates: Certificate[];
  jobs: JobListing[];
  jobApplications: JobApplication[];
  savedJobs: SavedJob[];
  resume: ResumeData;
  interviewQuestions: InterviewQuestion[];
  interviewSessions: MockInterviewSession[];
  refundRequests: RefundRequest[];
  auditLogs: AuditLog[];
  notifications: AppNotification[];
  integrations: IntegrationStatus[];
  searchQuery: string;
}

const STORAGE_KEY = 'prepkaro_production_state_v1';

function getInitialState(): AppState {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required fields exist
        if (parsed.courses && parsed.skills && parsed.submissions) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not parse stored PrepKaro state, using defaults:', e);
    }
  }

  return {
    currentRole: 'student',
    currentUserId: 'user-student-1',
    profiles: INITIAL_PROFILES,
    courses: INITIAL_COURSES,
    skills: INITIAL_SKILLS,
    lessons: INITIAL_LESSONS,
    enrollments: [
      { courseId: 'course-1', userId: 'user-student-1', enrolledAt: '2026-01-20T10:00:00Z' },
    ],
    completedLessonIds: ['lesson-1-1-1', 'lesson-1-1-2', 'lesson-1-1-3'], // Sneha completed skill 1 lessons
    questions: INITIAL_QUESTIONS,
    assessments: INITIAL_ASSESSMENTS,
    attempts: [
      {
        id: 'att-1',
        assessmentId: 'assess-1-1',
        userId: 'user-student-1',
        startedAt: '2026-02-01T14:00:00Z',
        submittedAt: '2026-02-01T14:15:00Z',
        status: 'submitted',
        score: 95,
        passed: true,
        answers: { 'q-1': 'opt-2', 'q-2': 'opt-2-2', 'q-3': ['opt-3-1', 'opt-3-2', 'opt-3-4'], 'q-4': 'opt-4-1' },
      },
    ],
    assignments: INITIAL_ASSIGNMENTS,
    projects: INITIAL_PROJECTS,
    rubrics: INITIAL_RUBRICS,
    submissions: INITIAL_SUBMISSIONS,
    certificates: INITIAL_CERTIFICATES,
    jobs: INITIAL_JOBS,
    jobApplications: [
      {
        id: 'app-1',
        jobId: 'job-1',
        userId: 'user-student-1',
        status: 'reviewing',
        appliedAt: '2026-02-08T11:00:00Z',
        coverNote: 'Excited to apply! Certified graduate of PrepKaro Full Stack program.',
      },
    ],
    savedJobs: [
      { id: 'save-1', jobId: 'job-2', userId: 'user-student-1', savedAt: '2026-02-07T14:00:00Z' },
    ],
    resume: INITIAL_RESUME,
    interviewQuestions: INITIAL_INTERVIEW_QUESTIONS,
    interviewSessions: [
      {
        id: 'mock-1',
        userId: 'user-student-1',
        category: 'Frontend',
        company: 'Google',
        startedAt: '2026-02-09T15:00:00Z',
        completedAt: '2026-02-09T15:30:00Z',
        status: 'completed',
        overallScore: 8.8,
        overallFeedback: 'Strong understanding of React Fiber reconciliation. Good technical reasoning and concise architectural explanation.',
        answers: [
          {
            questionId: 'iq-1',
            questionText: 'Explain the Virtual DOM reconciliation algorithm and how React 19 Fiber works.',
            userResponse: 'Fiber allows cooperative multitasking by breaking reconciliation into units of work with pointers, pausing to yield to user inputs before committing.',
            aiScore: 9,
            aiFeedback: 'Excellent explanation of cooperative scheduling and priority tiers.',
            strengths: ['Clear distinction between render and commit phases', 'Accurate data structure explanation'],
            improvements: ['Could briefly mention how Server Components impact the client Fiber tree.'],
          },
        ],
      },
    ],
    refundRequests: INITIAL_REFUND_REQUESTS,
    auditLogs: INITIAL_AUDIT_LOGS,
    notifications: INITIAL_NOTIFICATIONS,
    integrations: INITIAL_INTEGRATIONS,
    searchQuery: '',
  };
}

// Global state container with pub/sub
let globalState: AppState = getInitialState();
const listeners = new Set<() => void>();

function notify() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    } catch (e) {
      console.error('Failed to persist PrepKaro state to localStorage:', e);
    }
  }
  listeners.forEach(l => l());
}

export const prepkaroStore = {
  getState: (): AppState => globalState,

  setState: (updater: (prev: AppState) => AppState) => {
    globalState = updater(globalState);
    notify();
  },

  resetToDefaults: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    globalState = getInitialState();
    notify();
  },

  // Role switching
  switchRole: (role: UserRole) => {
    let newUserId = 'user-student-1';
    if (role === 'reviewer') newUserId = 'user-reviewer-1';
    if (role === 'admin') newUserId = 'user-admin-1';

    prepkaroStore.setState(prev => ({
      ...prev,
      currentRole: role,
      currentUserId: newUserId,
    }));

    prepkaroStore.addAuditLog(
      'ROLE_SWITCHED',
      'User',
      newUserId,
      `Switched active role to ${role.toUpperCase()}`
    );
  },

  // Enrollment
  enrollInCourse: (courseId: string) => {
    prepkaroStore.setState(prev => {
      const exists = prev.enrollments.some(
        e => e.courseId === courseId && e.userId === prev.currentUserId
      );
      if (exists) return prev;

      const course = prev.courses.find(c => c.id === courseId);
      const newNotification: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: prev.currentUserId,
        type: 'enrollment',
        title: 'Enrolled Successfully!',
        body: `You are now enrolled in "${course?.title || 'Course'}". Start Skill 1 now!`,
        link: `/learn/${course?.slug || ''}`,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        enrollments: [
          ...prev.enrollments,
          { courseId, userId: prev.currentUserId, enrolledAt: new Date().toISOString() },
        ],
        notifications: [newNotification, ...prev.notifications],
      };
    });

    prepkaroStore.addAuditLog('COURSE_ENROLLED', 'Course', courseId, 'Student enrolled in course');
  },

  // Complete a lesson
  toggleLessonCompletion: (lessonId: string) => {
    prepkaroStore.setState(prev => {
      const isCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isCompleted
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];

      return {
        ...prev,
        completedLessonIds: newCompleted,
      };
    });
  },

  // Submit Practice Test
  submitAssessmentAttempt: (
    assessmentId: string,
    answers: Record<string, string | string[]>
  ): { attempt: AssessmentAttempt; passed: boolean; score: number } => {
    const state = prepkaroStore.getState();
    const assessment = state.assessments.find(a => a.id === assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    // Server-grade score calculation
    let earnedPoints = 0;
    let totalPoints = 0;

    assessment.questionIds.forEach(qId => {
      const question = state.questions.find(q => q.id === qId);
      if (!question) return;

      totalPoints += question.points;
      const userAnswer = answers[qId];

      if (question.type === 'mcq' || question.type === 'true_false') {
        if (userAnswer === question.correctAnswers[0]) {
          earnedPoints += question.points;
        }
      } else if (question.type === 'multi_select') {
        const selected = Array.isArray(userAnswer) ? userAnswer : [];
        const isMatch =
          selected.length === question.correctAnswers.length &&
          selected.every(opt => question.correctAnswers.includes(opt));
        if (isMatch) {
          earnedPoints += question.points;
        }
      }
    });

    const calculatedScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = calculatedScore >= assessment.passScore;

    const newAttempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      assessmentId,
      userId: state.currentUserId,
      startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      score: calculatedScore,
      passed,
      answers,
    };

    prepkaroStore.setState(prev => {
      const newNotification: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: prev.currentUserId,
        type: 'assessment',
        title: passed ? 'Assessment Passed!' : 'Assessment Attempt Recorded',
        body: `You scored ${calculatedScore}% (Pass threshold: ${assessment.passScore}%).`,
        link: `/learn`,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        attempts: [...prev.attempts, newAttempt],
        notifications: [newNotification, ...prev.notifications],
      };
    });

    prepkaroStore.addAuditLog(
      'ASSESSMENT_SUBMITTED',
      'Assessment',
      assessmentId,
      `Student scored ${calculatedScore}% (${passed ? 'PASSED' : 'FAILED'})`
    );

    return { attempt: newAttempt, passed, score: calculatedScore };
  },

  // Submit Assignment or Project
  submitAssignmentOrProject: (data: {
    kind: 'assignment' | 'project';
    targetId: string;
    targetTitle: string;
    courseId: string;
    skillId: string;
    textResponse: string;
    repoUrl?: string;
    demoUrl?: string;
    fileName?: string;
  }) => {
    const state = prepkaroStore.getState();
    const currentUser = state.profiles.find(p => p.id === state.currentUserId);

    const existing = state.submissions.find(
      s => s.targetId === data.targetId && s.userId === state.currentUserId
    );

    const attemptNumber = existing ? existing.attempt + 1 : 1;

    const newSubmission: Submission = {
      id: existing ? existing.id : `sub-${Date.now()}`,
      kind: data.kind,
      targetId: data.targetId,
      targetTitle: data.targetTitle,
      courseId: data.courseId,
      skillId: data.skillId,
      userId: state.currentUserId,
      userName: currentUser?.fullName || 'Student',
      userEmail: currentUser?.email || 'student@prepkaro.com',
      status: 'under_review',
      textResponse: data.textResponse,
      repoUrl: data.repoUrl,
      demoUrl: data.demoUrl,
      fileName: data.fileName || (data.repoUrl ? 'git-repo' : 'solution.pdf'),
      fileSize: '1.5 MB',
      attempt: attemptNumber,
      submittedAt: new Date().toISOString(),
      reviewerId: 'user-reviewer-1',
      reviewerName: 'Dr. Rajesh Verma',
      plagiarismScore: Math.floor(Math.random() * 8) + 2, // 2-10% normal code similarity
      plagiarismStatus: 'clear',
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    prepkaroStore.setState(prev => {
      const filtered = prev.submissions.filter(s => s.id !== newSubmission.id);
      return {
        ...prev,
        submissions: [newSubmission, ...filtered],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            userId: prev.currentUserId,
            type: 'assignment',
            title: 'Submission Received',
            body: `Your ${data.kind} "${data.targetTitle}" has been placed in the review queue.`,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
      };
    });

    prepkaroStore.addAuditLog(
      'SUBMISSION_CREATED',
      'Submission',
      newSubmission.id,
      `Student submitted ${data.kind} for review (Attempt ${attemptNumber})`
    );
  },

  // Reviewer grades a submission
  gradeSubmission: (
    submissionId: string,
    decision: 'approved' | 'rejected' | 'revision_requested',
    feedback: string,
    rubricScores: Record<string, number>
  ) => {
    const state = prepkaroStore.getState();
    const reviewer = state.profiles.find(p => p.id === state.currentUserId);

    // Compute total score from rubric
    const pointsArr = Object.values(rubricScores);
    const scoreSum = pointsArr.reduce((acc, p) => acc + p, 0);

    prepkaroStore.setState(prev => {
      const targetSub = prev.submissions.find(s => s.id === submissionId);
      if (!targetSub) return prev;

      const updatedSub: Submission = {
        ...targetSub,
        status: decision,
        feedback,
        rubricScores,
        score: scoreSum,
        reviewerId: prev.currentUserId,
        reviewerName: reviewer?.fullName || 'Faculty Reviewer',
        reviewedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const newNotification: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: targetSub.userId,
        type: 'review',
        title:
          decision === 'approved'
            ? 'Submission Approved!'
            : decision === 'revision_requested'
            ? 'Revision Requested on Submission'
            : 'Submission Review Feedback',
        body: `Your ${targetSub.kind} "${targetSub.targetTitle}" was evaluated: ${decision.replace('_', ' ').toUpperCase()} (Score: ${scoreSum}/100).`,
        link: '/assignments-projects',
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        submissions: prev.submissions.map(s => (s.id === submissionId ? updatedSub : s)),
        notifications: [newNotification, ...prev.notifications],
      };
    });

    prepkaroStore.addAuditLog(
      'SUBMISSION_GRADED',
      'Submission',
      submissionId,
      `Reviewer set decision=${decision}, score=${scoreSum}`
    );
  },

  // Issue Certificate
  issueCertificate: (courseId: string, studentId: string) => {
    const state = prepkaroStore.getState();
    const course = state.courses.find(c => c.id === courseId);
    const student = state.profiles.find(p => p.id === studentId);

    const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const code = `PK-2026-${hex}`;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      code,
      userId: studentId,
      recipientName: student?.fullName || 'PrepKaro Scholar',
      courseId,
      courseTitle: course?.title || 'Engineering Program',
      issuedAt: new Date().toISOString(),
      status: 'valid',
      finalGrade: 94,
      completedSkillsCount: state.skills.filter(s => s.courseId === courseId).length,
      verificationUrl: `/verify/${code}`,
      instructorName: course?.instructorName || 'PrepKaro Academic Council',
    };

    prepkaroStore.setState(prev => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          userId: studentId,
          type: 'certificate',
          title: 'Official Certificate Issued!',
          body: `Verification Code: ${code}. You can now share it with employers.`,
          link: `/verify/${code}`,
          createdAt: new Date().toISOString(),
        },
        ...prev.notifications,
      ],
    }));

    prepkaroStore.addAuditLog(
      'CERTIFICATE_ISSUED',
      'Certificate',
      newCert.id,
      `Issued credential ${code} for ${student?.fullName}`
    );

    return newCert;
  },

  // Refund Management
  submitRefundRequest: (courseId: string, reason: string, category: RefundRequest['reasonCategory']) => {
    const state = prepkaroStore.getState();
    const course = state.courses.find(c => c.id === courseId);
    const student = state.profiles.find(p => p.id === state.currentUserId);
    const enrollment = state.enrollments.find(e => e.courseId === courseId && e.userId === state.currentUserId);

    const eligibility = ProgressionEngine.evaluateRefundEligibility(
      enrollment?.enrolledAt || new Date().toISOString(),
      state.completedLessonIds.length,
      state.lessons.length,
      state.certificates.some(c => c.courseId === courseId && c.userId === state.currentUserId)
    );

    const newRequest: RefundRequest = {
      id: `ref-${Date.now()}`,
      userId: state.currentUserId,
      userEmail: student?.email || 'student@prepkaro.com',
      userName: student?.fullName || 'Student',
      courseId,
      courseTitle: course?.title || 'Course',
      amount: 4999,
      currency: 'INR',
      reason,
      reasonCategory: category,
      status: 'pending',
      transactionRef: `PAY_RZP_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      eligibilityPassed: eligibility.eligible,
      eligibilityDetails: eligibility.summary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    prepkaroStore.setState(prev => ({
      ...prev,
      refundRequests: [newRequest, ...prev.refundRequests],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          userId: prev.currentUserId,
          type: 'system',
          title: 'Refund Request Submitted',
          body: 'Your request has been routed to our accounts team for policy compliance verification.',
          createdAt: new Date().toISOString(),
        },
        ...prev.notifications,
      ],
    }));

    prepkaroStore.addAuditLog('REFUND_REQUESTED', 'RefundRequest', newRequest.id, `Amount: INR ${newRequest.amount}`);
  },

  resolveRefundRequest: (requestId: string, decision: 'approved' | 'rejected', notes?: string) => {
    prepkaroStore.setState(prev => {
      const target = prev.refundRequests.find(r => r.id === requestId);
      if (!target) return prev;

      const updated: RefundRequest = {
        ...target,
        status: decision,
        adminNotes: notes || (decision === 'approved' ? 'Approved per refund policy.' : 'Rejected per policy checklist.'),
        updatedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        refundRequests: prev.refundRequests.map(r => (r.id === requestId ? updated : r)),
        notifications: [
          {
            id: `notif-${Date.now()}`,
            userId: target.userId,
            type: 'system',
            title: decision === 'approved' ? 'Refund Approved' : 'Refund Decision Updated',
            body: `Your refund request for ${target.courseTitle} was ${decision.toUpperCase()}.`,
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
      };
    });

    prepkaroStore.addAuditLog('REFUND_RESOLVED', 'RefundRequest', requestId, `Status updated to ${decision}`);
  },

  // Job Application
  applyForJob: (jobId: string, coverNote?: string) => {
    prepkaroStore.setState(prev => {
      const exists = prev.jobApplications.some(
        a => a.jobId === jobId && a.userId === prev.currentUserId
      );
      if (exists) return prev;

      const job = prev.jobs.find(j => j.id === jobId);
      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        jobId,
        userId: prev.currentUserId,
        status: 'applied',
        appliedAt: new Date().toISOString(),
        coverNote,
      };

      return {
        ...prev,
        jobApplications: [newApp, ...prev.jobApplications],
        jobs: prev.jobs.map(j =>
          j.id === jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j
        ),
        notifications: [
          {
            id: `notif-${Date.now()}`,
            userId: prev.currentUserId,
            type: 'job',
            title: 'Application Sent!',
            body: `Applied to ${job?.title} at ${job?.company}.`,
            link: '/jobs',
            createdAt: new Date().toISOString(),
          },
          ...prev.notifications,
        ],
      };
    });
  },

  // Toggle Saved Job
  toggleSaveJob: (jobId: string) => {
    prepkaroStore.setState(prev => {
      const isSaved = prev.savedJobs.some(s => s.jobId === jobId && s.userId === prev.currentUserId);
      const newSaved = isSaved
        ? prev.savedJobs.filter(s => !(s.jobId === jobId && s.userId === prev.currentUserId))
        : [...prev.savedJobs, { id: `save-${Date.now()}`, jobId, userId: prev.currentUserId, savedAt: new Date().toISOString() }];

      return {
        ...prev,
        savedJobs: newSaved,
      };
    });
  },

  // Update Resume Data
  updateResume: (updater: (prev: ResumeData) => ResumeData) => {
    prepkaroStore.setState(prev => ({
      ...prev,
      resume: updater(prev.resume),
    }));
  },

  // Mark all notifications read
  markNotificationsAsRead: () => {
    prepkaroStore.setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({
        ...n,
        readAt: n.readAt || new Date().toISOString(),
      })),
    }));
  },

  // Course Admin CRUD
  saveCourse: (course: Course) => {
    prepkaroStore.setState(prev => {
      const exists = prev.courses.some(c => c.id === course.id);
      return {
        ...prev,
        courses: exists
          ? prev.courses.map(c => (c.id === course.id ? { ...course, updatedAt: new Date().toISOString() } : c))
          : [{ ...course, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...prev.courses],
      };
    });
    prepkaroStore.addAuditLog('COURSE_UPDATED', 'Course', course.id, `Title: ${course.title}, Status: ${course.status}`);
  },

  deleteCourse: (courseId: string) => {
    prepkaroStore.setState(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== courseId),
    }));
    prepkaroStore.addAuditLog('COURSE_DELETED', 'Course', courseId, 'Archived/deleted course');
  },

  // Question CRUD
  saveQuestion: (question: Question) => {
    prepkaroStore.setState(prev => {
      const exists = prev.questions.some(q => q.id === question.id);
      return {
        ...prev,
        questions: exists
          ? prev.questions.map(q => (q.id === question.id ? question : q))
          : [question, ...prev.questions],
      };
    });
    prepkaroStore.addAuditLog('QUESTION_SAVED', 'Question', question.id, `Prompt: ${question.prompt.substring(0, 40)}...`);
  },

  // Add Audit Log
  addAuditLog: (action: string, targetType: string, targetId: string, details: string) => {
    const state = prepkaroStore.getState();
    const user = state.profiles.find(p => p.id === state.currentUserId);

    const log: AuditLog = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: state.currentUserId,
      userEmail: user?.email || 'system@prepkaro.com',
      role: state.currentRole,
      action,
      targetType,
      targetId,
      details,
      ipAddress: '103.21.244.12',
      timestamp: new Date().toISOString(),
    };

    prepkaroStore.setState(prev => ({
      ...prev,
      auditLogs: [log, ...prev.auditLogs.slice(0, 99)], // keep last 100 logs
    }));
  },
};

// React hook for consuming state in UI components
export function usePrepKaroStore() {
  const [state, setState] = useState<AppState>(prepkaroStore.getState());

  useEffect(() => {
    const handleUpdate = () => {
      setState(prepkaroStore.getState());
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const currentUser = state.profiles.find(p => p.id === state.currentUserId) || state.profiles[0];

  return {
    ...state,
    currentUser,
    switchRole: prepkaroStore.switchRole,
    enrollInCourse: prepkaroStore.enrollInCourse,
    toggleLessonCompletion: prepkaroStore.toggleLessonCompletion,
    submitAssessmentAttempt: prepkaroStore.submitAssessmentAttempt,
    submitAssignmentOrProject: prepkaroStore.submitAssignmentOrProject,
    gradeSubmission: prepkaroStore.gradeSubmission,
    issueCertificate: prepkaroStore.issueCertificate,
    submitRefundRequest: prepkaroStore.submitRefundRequest,
    resolveRefundRequest: prepkaroStore.resolveRefundRequest,
    applyForJob: prepkaroStore.applyForJob,
    toggleSaveJob: prepkaroStore.toggleSaveJob,
    updateResume: prepkaroStore.updateResume,
    markNotificationsAsRead: prepkaroStore.markNotificationsAsRead,
    saveCourse: prepkaroStore.saveCourse,
    deleteCourse: prepkaroStore.deleteCourse,
    saveQuestion: prepkaroStore.saveQuestion,
    resetToDefaults: prepkaroStore.resetToDefaults,
  };
}
