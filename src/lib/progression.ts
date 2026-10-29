import { Course, Skill, Lesson, AssessmentAttempt, Submission, Certificate } from './types';

export interface SkillProgressSummary {
  skillId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  lessonsTotal: number;
  lessonsCompleted: number;
  practiceTestRequired: boolean;
  practiceTestPassed: boolean;
  practiceTestScore?: number;
  assignmentRequired: boolean;
  assignmentApproved: boolean;
  projectRequired: boolean;
  projectApproved: boolean;
  lockReason?: string;
}

export interface NextAction {
  type: 'lesson' | 'practice_test' | 'assignment' | 'project' | 'claim_certificate' | 'complete';
  title: string;
  description: string;
  skillId?: string;
  itemId?: string;
  url?: string;
}

export class ProgressionEngine {
  /**
   * Determine if a skill is accessible/unlocked for a student.
   * Sequential rule: Skill 0 is unlocked. Skill N requires Skill N-1 to be completed.
   */
  static isSkillUnlocked(
    skill: Skill,
    allCourseSkills: Skill[],
    completedSkillIds: Set<string>
  ): { unlocked: boolean; reason?: string } {
    const sortedSkills = [...allCourseSkills].sort((a, b) => a.position - b.position);
    const currentIndex = sortedSkills.findIndex(s => s.id === skill.id);

    if (currentIndex <= 0) {
      return { unlocked: true };
    }

    const previousSkill = sortedSkills[currentIndex - 1];
    if (completedSkillIds.has(previousSkill.id)) {
      return { unlocked: true };
    }

    return {
      unlocked: false,
      reason: `Prerequisite "${previousSkill.title}" must be 100% completed first.`,
    };
  }

  /**
   * Calculate detailed progress for a skill based on student records.
   */
  static getSkillProgress(
    skill: Skill,
    lessons: Lesson[],
    completedLessonIds: Set<string>,
    attempts: AssessmentAttempt[],
    submissions: Submission[],
    isUnlocked: boolean,
    lockReason?: string
  ): SkillProgressSummary {
    const skillLessons = lessons.filter(l => l.skillId === skill.id);
    const completedSkillLessons = skillLessons.filter(l => completedLessonIds.has(l.id));
    const allLessonsDone = skillLessons.length === 0 || completedSkillLessons.length === skillLessons.length;

    // Practice test
    const skillAttempts = attempts.filter(a => {
      // Find attempts where score >= passScore
      return a.passed && (a.score ?? 0) >= skill.passScore;
    });
    const practiceTestPassed = !skill.requiresPracticeTest || skillAttempts.length > 0;
    const bestScore = skillAttempts.reduce((max, a) => Math.max(max, a.score ?? 0), 0);

    // Assignment
    const approvedAssignment = submissions.some(
      s => s.skillId === skill.id && s.kind === 'assignment' && s.status === 'approved'
    );
    const assignmentApproved = !skill.requiresAssignment || approvedAssignment;

    // Project
    const approvedProject = submissions.some(
      s => s.skillId === skill.id && s.kind === 'project' && s.status === 'approved'
    );
    const projectApproved = !skill.requiresProject || approvedProject;

    const isCompleted = isUnlocked && allLessonsDone && practiceTestPassed && assignmentApproved && projectApproved;

    return {
      skillId: skill.id,
      isUnlocked,
      isCompleted,
      lessonsTotal: skillLessons.length,
      lessonsCompleted: completedSkillLessons.length,
      practiceTestRequired: skill.requiresPracticeTest,
      practiceTestPassed,
      practiceTestScore: bestScore > 0 ? bestScore : undefined,
      assignmentRequired: skill.requiresAssignment,
      assignmentApproved,
      projectRequired: skill.requiresProject,
      projectApproved,
      lockReason,
    };
  }

  /**
   * Find the next sequential action for the student.
   */
  static getNextRecommendedAction(
    course: Course,
    skills: Skill[],
    lessons: Lesson[],
    completedLessonIds: Set<string>,
    attempts: AssessmentAttempt[],
    submissions: Submission[],
    certificate?: Certificate
  ): NextAction {
    const sortedSkills = [...skills]
      .filter(s => s.courseId === course.id)
      .sort((a, b) => a.position - b.position);

    const completedSkillIds = new Set<string>();

    for (const skill of sortedSkills) {
      const unlockStatus = this.isSkillUnlocked(skill, sortedSkills, completedSkillIds);
      if (!unlockStatus.unlocked) {
        continue;
      }

      const summary = this.getSkillProgress(
        skill,
        lessons,
        completedLessonIds,
        attempts,
        submissions,
        true
      );

      if (summary.isCompleted) {
        completedSkillIds.add(skill.id);
        continue;
      }

      // Check lessons in this skill
      const skillLessons = lessons
        .filter(l => l.skillId === skill.id)
        .sort((a, b) => a.position - b.position);

      for (const lesson of skillLessons) {
        if (!completedLessonIds.has(lesson.id)) {
          return {
            type: 'lesson',
            title: `Continue Lesson: ${lesson.title}`,
            description: `Part of ${skill.title} (${lesson.durationMins} mins)`,
            skillId: skill.id,
            itemId: lesson.id,
            url: `/learn/${course.slug}?skillId=${skill.id}&lessonId=${lesson.id}`,
          };
        }
      }

      // Lessons complete; check practice test
      if (skill.requiresPracticeTest && !summary.practiceTestPassed) {
        return {
          type: 'practice_test',
          title: `Take Practice Test: ${skill.title}`,
          description: `Score at least ${skill.passScore}% to unlock assignments & projects`,
          skillId: skill.id,
          url: `/learn/${course.slug}?skillId=${skill.id}&tab=test`,
        };
      }

      // Practice test passed; check assignment
      if (skill.requiresAssignment && !summary.assignmentApproved) {
        const pendingSub = submissions.find(s => s.skillId === skill.id && s.kind === 'assignment');
        if (pendingSub && pendingSub.status === 'revision_requested') {
          return {
            type: 'assignment',
            title: `Revise Assignment: ${skill.title}`,
            description: `Reviewer requested revisions. Check feedback and resubmit.`,
            skillId: skill.id,
            url: `/learn/${course.slug}?skillId=${skill.id}&tab=assignment`,
          };
        }
        return {
          type: 'assignment',
          title: `Submit Assignment: ${skill.title}`,
          description: `Complete practical code tasks and submit for review.`,
          skillId: skill.id,
          url: `/learn/${course.slug}?skillId=${skill.id}&tab=assignment`,
        };
      }

      // Assignment passed; check project
      if (skill.requiresProject && !summary.projectApproved) {
        return {
          type: 'project',
          title: `Complete Case Study Project: ${skill.title}`,
          description: `Submit real-world deliverables for faculty evaluation.`,
          skillId: skill.id,
          url: `/learn/${course.slug}?skillId=${skill.id}&tab=project`,
        };
      }
    }

    // All skills completed!
    if (certificate) {
      return {
        type: 'complete',
        title: 'Course Completed! Certificate Verified',
        description: `Certificate ${certificate.code} issued. Ready for job applications.`,
        url: `/certificates`,
      };
    }

    return {
      type: 'claim_certificate',
      title: 'Claim Your Course Certificate',
      description: 'You have satisfied all milestones. Generate and verify your credential.',
      url: `/certificates`,
    };
  }

  /**
   * Evaluate if a student qualifies for an official Certificate.
   */
  static evaluateCertificateEligibility(
    courseId: string,
    skills: Skill[],
    lessons: Lesson[],
    completedLessonIds: Set<string>,
    attempts: AssessmentAttempt[],
    submissions: Submission[]
  ): { eligible: boolean; completedSkillsCount: number; totalSkillsCount: number; message: string } {
    const courseSkills = skills.filter(s => s.courseId === courseId);
    if (courseSkills.length === 0) {
      return { eligible: false, completedSkillsCount: 0, totalSkillsCount: 0, message: 'No skills configured for course.' };
    }

    let completedSkills = 0;
    const completedSet = new Set<string>();

    for (const skill of [...courseSkills].sort((a, b) => a.position - b.position)) {
      const summary = this.getSkillProgress(
        skill,
        lessons,
        completedLessonIds,
        attempts,
        submissions,
        true
      );
      if (summary.isCompleted) {
        completedSkills++;
        completedSet.add(skill.id);
      }
    }

    const eligible = completedSkills === courseSkills.length;
    return {
      eligible,
      completedSkillsCount: completedSkills,
      totalSkillsCount: courseSkills.length,
      message: eligible
        ? 'All required skills, practice tests, and project reviews are verified.'
        : `Completed ${completedSkills} of ${courseSkills.length} skills. Finish remaining milestones to qualify.`,
    };
  }

  /**
   * Evaluate refund eligibility according to configured SaaS policy.
   */
  static evaluateRefundEligibility(
    enrollmentDate: string,
    completedLessonsCount: number,
    totalLessonsCount: number,
    hasClaimedCertificate: boolean
  ): { eligible: boolean; checklist: { label: string; passed: boolean }[]; summary: string } {
    const enrolledTime = new Date(enrollmentDate).getTime();
    const now = Date.now();
    const daysSinceEnrollment = Math.floor((now - enrolledTime) / (1000 * 60 * 60 * 24));

    const checkDays = daysSinceEnrollment <= 14;
    const progressPercent = totalLessonsCount > 0 ? (completedLessonsCount / totalLessonsCount) * 100 : 0;
    const checkProgress = progressPercent <= 50;
    const checkNoCert = !hasClaimedCertificate;

    const eligible = checkDays && checkProgress && checkNoCert;

    return {
      eligible,
      checklist: [
        { label: `Within 14-day policy window (${daysSinceEnrollment} days elapsed)`, passed: checkDays },
        { label: `Less than 50% course content completed (${Math.round(progressPercent)}% completed)`, passed: checkProgress },
        { label: 'No verified completion certificate issued or claimed', passed: checkNoCert },
      ],
      summary: eligible
        ? 'Eligible for 100% refund review according to PrepKaro guarantee policy.'
        : 'Does not satisfy automated refund conditions (exceeded time window, progress threshold, or credential issued).',
    };
  }
}
