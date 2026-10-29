import { useMemo } from 'react';
import { usePrepKaroStore } from '../lib/store';
import { ProgressionEngine } from '../lib/progression';

export function useCourseProgress(courseId: string) {
  const store = usePrepKaroStore();
  const userId = store.currentUser?.id;

  return useMemo(() => {
    if (!userId || !courseId) {
      return {
        progressPct: 0,
        completedSkillsCount: 0,
        totalSkillsCount: 0,
        isEligibleForCertificate: false,
        skillsProgress: [],
      };
    }

    const skills = store.getSkills(courseId);
    const lessons = store.lessons.filter((l) =>
      skills.some((s) => s.id === l.skillId)
    );
    const attempts = store.assessmentAttempts.filter((a) => a.userId === userId);
    const submissions = store.submissions.filter((s) => s.userId === userId);

    const skillsProgress = skills.map((skill) =>
      ProgressionEngine.getSkillProgress(skill, lessons, attempts, submissions)
    );

    const courseProgress = ProgressionEngine.getCourseProgress(
      courseId,
      skills,
      lessons,
      attempts,
      submissions
    );

    return {
      ...courseProgress,
      skillsProgress,
    };
  }, [store, userId, courseId]);
}
