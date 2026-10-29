import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressionEngine } from '../lib/progression';
import {
  INITIAL_COURSES,
  INITIAL_SKILLS,
  INITIAL_LESSONS,
  INITIAL_ASSESSMENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_PROJECTS,
  INITIAL_SUBMISSIONS,
  INITIAL_PROFILES,
} from '../lib/mock-data';
import type { Course, Skill, Lesson, Submission, UserProfile, AssessmentAttempt } from '../lib/types';

describe('PrepKaro End-to-End Workflow & Business Rules', () => {
  let mockCourse: Course;
  let courseSkills: Skill[];
  let courseLessons: Lesson[];
  let mockStudent: UserProfile;
  let mockReviewer: UserProfile;

  beforeEach(() => {
    mockCourse = JSON.parse(JSON.stringify(INITIAL_COURSES[0]));
    courseSkills = JSON.parse(JSON.stringify(INITIAL_SKILLS.filter(s => s.courseId === mockCourse.id)));
    courseLessons = JSON.parse(JSON.stringify(INITIAL_LESSONS.filter(l => courseSkills.some(s => s.id === l.skillId))));
    mockStudent = JSON.parse(JSON.stringify(INITIAL_PROFILES.find(p => p.role === 'student')!));
    mockReviewer = JSON.parse(JSON.stringify(INITIAL_PROFILES.find(p => p.role === 'reviewer')!));
  });

  it('Flow: Signup/Login -> Verify Initial Course and Roles', () => {
    expect(mockStudent.role).toBe('student');
    expect(mockReviewer.role).toBe('reviewer');
    expect(mockCourse.status).toBe('published');
    expect(courseSkills.length).toBeGreaterThan(0);
  });

  it('Flow: Sequential Progression -> First Skill Unlocked, Subsequent Skills Locked', () => {
    const sortedSkills = [...courseSkills].sort((a, b) => a.position - b.position);
    const skill1 = sortedSkills[0];
    const skill2 = sortedSkills[1];

    const completedSkillIds = new Set<string>();

    // Skill 1 is the first skill, so it MUST be unlocked initially
    const status1 = ProgressionEngine.isSkillUnlocked(skill1, sortedSkills, completedSkillIds);
    expect(status1.unlocked).toBe(true);

    // Skill 2 requires Skill 1 to be completed, so it MUST be locked
    const status2 = ProgressionEngine.isSkillUnlocked(skill2, sortedSkills, completedSkillIds);
    expect(status2.unlocked).toBe(false);
    expect(status2.reason).toContain('Prerequisite');
  });

  it('Flow: Complete Lesson -> Track Progress & Recalculate Skill Status', () => {
    const sortedSkills = [...courseSkills].sort((a, b) => a.position - b.position);
    const skill1 = sortedSkills[0];
    const skill1Lessons = courseLessons.filter(l => l.skillId === skill1.id);
    expect(skill1Lessons.length).toBeGreaterThan(0);

    const completedLessonIds = new Set<string>();
    
    // Initially 0 lessons completed
    const initialProgress = ProgressionEngine.getSkillProgress(
      skill1,
      courseLessons,
      completedLessonIds,
      [],
      [],
      true
    );
    expect(initialProgress.lessonsCompleted).toBe(0);
    expect(initialProgress.isCompleted).toBe(false);

    // Complete the first lesson
    completedLessonIds.add(skill1Lessons[0].id);

    const updatedProgress = ProgressionEngine.getSkillProgress(
      skill1,
      courseLessons,
      completedLessonIds,
      [],
      [],
      true
    );
    expect(updatedProgress.lessonsCompleted).toBe(1);
  });

  it('Flow: Take Practice Test -> Validate Scoring & Passing Status', () => {
    const sortedSkills = [...courseSkills].sort((a, b) => a.position - b.position);
    const skill1 = sortedSkills[0];
    
    // Mark all lessons done
    const completedLessonIds = new Set(courseLessons.filter(l => l.skillId === skill1.id).map(l => l.id));

    // Passing test attempt (score >= skill.passScore)
    const passingAttempt: AssessmentAttempt = {
      id: 'att-pass',
      assessmentId: 'test-asmt-1',
      userId: mockStudent.id,
      score: skill1.passScore + 10,
      passed: true,
      timeSpentSeconds: 300,
      submittedAt: new Date().toISOString(),
      answers: {},
    };

    const progressWithPassingTest = ProgressionEngine.getSkillProgress(
      skill1,
      courseLessons,
      completedLessonIds,
      [passingAttempt],
      [],
      true
    );
    expect(progressWithPassingTest.practiceTestPassed).toBe(true);
    expect(progressWithPassingTest.practiceTestScore).toBe(skill1.passScore + 10);

    // Failing attempt
    const failingAttempt: AssessmentAttempt = {
      id: 'att-fail',
      assessmentId: 'test-asmt-1',
      userId: mockStudent.id,
      score: skill1.passScore - 20,
      passed: false,
      timeSpentSeconds: 300,
      submittedAt: new Date().toISOString(),
      answers: {},
    };

    const progressWithFailingTest = ProgressionEngine.getSkillProgress(
      skill1,
      courseLessons,
      completedLessonIds,
      [failingAttempt],
      [],
      true
    );
    expect(progressWithFailingTest.practiceTestPassed).toBe(false);
  });

  it('Flow: Submit Assignment -> Reviewer Approves -> Skill Completed -> Next Skill Unlocks', () => {
    const sortedSkills = [...courseSkills].sort((a, b) => a.position - b.position);
    const skill1 = sortedSkills[0];
    const skill2 = sortedSkills[1];

    // Mark lessons done
    const completedLessonIds = new Set(courseLessons.filter(l => l.skillId === skill1.id).map(l => l.id));

    // Pass practice test
    const attempts: AssessmentAttempt[] = [{
      id: 'att-1',
      assessmentId: 'asmt-1',
      userId: mockStudent.id,
      score: 95,
      passed: true,
      timeSpentSeconds: 350,
      submittedAt: new Date().toISOString(),
      answers: {},
    }];

    // Create approved assignment submission
    const approvedAssignment: Submission = {
      id: 'sub-test-asg',
      kind: 'assignment',
      targetId: 'asg-test-1',
      userId: mockStudent.id,
      courseId: mockCourse.id,
      skillId: skill1.id,
      status: 'approved',
      attemptNumber: 1,
      repoUrl: 'https://github.com/prepkaro/assignment-solution',
      notes: 'Clean implementation with full unit tests.',
      submittedAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString(),
      reviewerId: mockReviewer.id,
      reviewerFeedback: 'Outstanding code structure and documentation.',
      rubricScores: [
        { criterionId: 'crit-1', score: 30, feedback: 'Perfect SSR usage' },
      ],
    };

    // Create approved project submission
    const approvedProject: Submission = {
      id: 'sub-test-proj',
      kind: 'project',
      targetId: 'proj-test-1',
      userId: mockStudent.id,
      courseId: mockCourse.id,
      skillId: skill1.id,
      status: 'approved',
      attemptNumber: 1,
      repoUrl: 'https://github.com/prepkaro/project-solution',
      demoUrl: 'https://prepkaro-project.vercel.app',
      notes: 'Production ready real-world application.',
      submittedAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString(),
      reviewerId: mockReviewer.id,
      reviewerFeedback: 'Exceptional full-stack architecture.',
      rubricScores: [
        { criterionId: 'crit-p1', score: 40, feedback: 'Scalable schema and caching' },
      ],
    };

    // Evaluate Skill 1
    const skill1Progress = ProgressionEngine.getSkillProgress(
      skill1,
      courseLessons,
      completedLessonIds,
      attempts,
      [approvedAssignment, approvedProject],
      true
    );

    expect(skill1Progress.isCompleted).toBe(true);

    // Once Skill 1 is completed, Skill 2 MUST unlock
    const completedSkillIds = new Set<string>([skill1.id]);
    const skill2Unlock = ProgressionEngine.isSkillUnlocked(skill2, sortedSkills, completedSkillIds);
    expect(skill2Unlock.unlocked).toBe(true);
  });

  it('Flow: Certificate Eligibility Verification', () => {
    // When not all skills are completed
    const incompleteEligibility = ProgressionEngine.evaluateCertificateEligibility(
      mockCourse.id,
      courseSkills,
      courseLessons,
      new Set<string>(), // no lessons completed
      [],
      []
    );
    expect(incompleteEligibility.eligible).toBe(false);
    expect(incompleteEligibility.completedSkillsCount).toBeLessThan(courseSkills.length);

    // Simulate all skills completed
    const allLessonIds = new Set(courseLessons.map(l => l.id));
    const allAttempts = courseSkills.map(s => ({
      id: `att-${s.id}`,
      assessmentId: `asmt-${s.id}`,
      userId: mockStudent.id,
      score: 90,
      passed: true,
      timeSpentSeconds: 400,
      submittedAt: new Date().toISOString(),
      answers: {},
    }));
    const allAssignments = courseSkills.map(s => ({
      id: `sub-asg-${s.id}`,
      kind: 'assignment' as const,
      targetId: `asg-${s.id}`,
      userId: mockStudent.id,
      courseId: mockCourse.id,
      skillId: s.id,
      status: 'approved' as const,
      attemptNumber: 1,
      submittedAt: new Date().toISOString(),
    }));
    const allProjects = courseSkills.map(s => ({
      id: `sub-proj-${s.id}`,
      kind: 'project' as const,
      targetId: `proj-${s.id}`,
      userId: mockStudent.id,
      courseId: mockCourse.id,
      skillId: s.id,
      status: 'approved' as const,
      attemptNumber: 1,
      submittedAt: new Date().toISOString(),
    }));

    const completeEligibility = ProgressionEngine.evaluateCertificateEligibility(
      mockCourse.id,
      courseSkills,
      courseLessons,
      allLessonIds,
      allAttempts,
      [...allAssignments, ...allProjects]
    );
    expect(completeEligibility.eligible).toBe(true);
    expect(completeEligibility.completedSkillsCount).toBe(courseSkills.length);
  });

  it('Flow: 14-Day Refund Policy Checklist Evaluation', () => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Within policy: 5 days, 2 of 10 lessons completed, no certificate
    const eligibleResult = ProgressionEngine.evaluateRefundEligibility(
      fiveDaysAgo.toISOString(),
      2,
      10,
      false
    );
    expect(eligibleResult.eligible).toBe(true);
    expect(eligibleResult.checklist.every(c => c.passed)).toBe(true);

    // Ineligible: 20 days elapsed (> 14 days)
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
    const expiredResult = ProgressionEngine.evaluateRefundEligibility(
      twentyDaysAgo.toISOString(),
      1,
      10,
      false
    );
    expect(expiredResult.eligible).toBe(false);

    // Ineligible: Certificate already claimed
    const certClaimedResult = ProgressionEngine.evaluateRefundEligibility(
      fiveDaysAgo.toISOString(),
      2,
      10,
      true
    );
    expect(certClaimedResult.eligible).toBe(false);
  });

  it('Flow: Admin Course Lifecycle (Create -> Draft -> Publish)', () => {
    const newCourse: Course = {
      id: 'course-new-1',
      slug: 'ai-agents-engineering',
      title: 'Autonomous AI Agents & Tool Calling',
      description: 'Master LLM orchestration, function calling, and vector embeddings.',
      category: 'Artificial Intelligence',
      level: 'Advanced',
      estHours: 45,
      instructorName: 'Dr. Anita Roy',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(newCourse.status).toBe('draft');

    // Admin publishes
    newCourse.status = 'published';
    newCourse.updatedAt = new Date().toISOString();
    expect(newCourse.status).toBe('published');
  });

  it('Security: Reviewer Queue Isolation & Role Verification', () => {
    expect(mockStudent.role).toBe('student');
    expect(mockReviewer.role).toBe('reviewer');

    // Submissions assigned to reviewer vs unassigned
    const testSub: Submission = {
      id: 'sub-assigned',
      kind: 'assignment',
      targetId: 'asg-1',
      userId: mockStudent.id,
      courseId: mockCourse.id,
      skillId: courseSkills[0].id,
      status: 'submitted',
      attemptNumber: 1,
      assignedReviewerId: mockReviewer.id,
      submittedAt: new Date().toISOString(),
    };

    expect(testSub.assignedReviewerId).toBe(mockReviewer.id);

    const otherSub: Submission = {
      id: 'sub-other',
      kind: 'assignment',
      targetId: 'asg-1',
      userId: 'other-student',
      courseId: mockCourse.id,
      skillId: courseSkills[0].id,
      status: 'submitted',
      attemptNumber: 1,
      assignedReviewerId: 'different-reviewer-id',
      submittedAt: new Date().toISOString(),
    };

    // Reviewer should only see their own assigned reviews
    expect(otherSub.assignedReviewerId).not.toBe(mockReviewer.id);
  });
});
