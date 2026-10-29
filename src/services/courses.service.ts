import { supabase } from '../integrations/supabase/client';
import type { Course, Skill, Lesson } from '../types';

export const CoursesService = {
  async getAllCourses(): Promise<Course[]> {
    const { data, error } = await (supabase as any)
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[CoursesService.getAllCourses] Supabase query failed, falling back:', error.message);
      return [];
    }
    return (data as Course[]) || [];
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const { data, error } = await (supabase as any)
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.warn(`[CoursesService.getCourseBySlug] Failed for ${slug}:`, error.message);
      return null;
    }
    return (data as Course) || null;
  },

  async getCourseSkills(courseId: string): Promise<Skill[]> {
    const { data, error } = await (supabase as any)
      .from('skills')
      .select('*')
      .eq('course_id', courseId)
      .order('position', { ascending: true });

    if (error) {
      console.warn(`[CoursesService.getCourseSkills] Failed for ${courseId}:`, error.message);
      return [];
    }
    return (data as Skill[]) || [];
  },

  async getSkillLessons(skillId: string): Promise<Lesson[]> {
    const { data, error } = await (supabase as any)
      .from('lessons')
      .select('*')
      .eq('skill_id', skillId)
      .order('position', { ascending: true });

    if (error) {
      console.warn(`[CoursesService.getSkillLessons] Failed for ${skillId}:`, error.message);
      return [];
    }
    return (data as Lesson[]) || [];
  },
};
