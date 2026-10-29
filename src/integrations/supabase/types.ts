export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      assessment_answers: {
        Row: {
          answer: Json
          attempt_id: string
          earned: number
          id: string
          is_correct: boolean | null
          question_id: string
        }
        Insert: {
          answer?: Json
          attempt_id: string
          earned?: number
          id?: string
          is_correct?: boolean | null
          question_id: string
        }
        Update: {
          answer?: Json
          attempt_id?: string
          earned?: number
          id?: string
          is_correct?: boolean | null
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "assessment_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_attempts: {
        Row: {
          assessment_id: string
          expires_at: string | null
          id: string
          passed: boolean | null
          score: number | null
          started_at: string
          status: string
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          assessment_id: string
          expires_at?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          status?: string
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          assessment_id?: string
          expires_at?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          status?: string
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          assessment_id: string
          id: string
          position: number
          question_id: string
        }
        Insert: {
          assessment_id: string
          id?: string
          position?: number
          question_id: string
        }
        Update: {
          assessment_id?: string
          id?: string
          position?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          course_id: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          kind: string
          max_attempts: number
          pass_score: number
          randomize_options: boolean
          randomize_questions: boolean
          skill_id: string
          status: string
          time_limit_mins: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          kind?: string
          max_attempts?: number
          pass_score?: number
          randomize_options?: boolean
          randomize_questions?: boolean
          skill_id: string
          status?: string
          time_limit_mins?: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          kind?: string
          max_attempts?: number
          pass_score?: number
          randomize_options?: boolean
          randomize_questions?: boolean
          skill_id?: string
          status?: string
          time_limit_mins?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          allowed_types: string
          created_at: string
          created_by: string | null
          deadline: string | null
          id: string
          instructions: string
          max_file_mb: number
          required: boolean
          rubric_id: string | null
          skill_id: string
          title: string
        }
        Insert: {
          allowed_types?: string
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          id?: string
          instructions?: string
          max_file_mb?: number
          required?: boolean
          rubric_id?: string | null
          skill_id: string
          title: string
        }
        Update: {
          allowed_types?: string
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          id?: string
          instructions?: string
          max_file_mb?: number
          required?: boolean
          rubric_id?: string | null
          skill_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "rubrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          completion_note: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          description: string
          est_hours: number
          id: string
          instructor_name: string
          level: string
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          completion_note?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          est_hours?: number
          id?: string
          instructor_name?: string
          level?: string
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          completion_note?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          est_hours?: number
          id?: string
          instructor_name?: string
          level?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_resources: {
        Row: {
          id: string
          kind: string
          lesson_id: string
          title: string
          url: string
        }
        Insert: {
          id?: string
          kind?: string
          lesson_id: string
          title: string
          url: string
        }
        Update: {
          id?: string
          kind?: string
          lesson_id?: string
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string
          content_type: string
          created_at: string
          duration_mins: number
          id: string
          is_free_preview: boolean
          position: number
          skill_id: string
          title: string
          video_url: string | null
        }
        Insert: {
          content?: string
          content_type?: string
          created_at?: string
          duration_mins?: number
          id?: string
          is_free_preview?: boolean
          position?: number
          skill_id: string
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          duration_mins?: number
          id?: string
          is_free_preview?: boolean
          position?: number
          skill_id?: string
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      plagiarism_reports: {
        Row: {
          created_at: string
          id: string
          provider: string
          report_url: string | null
          similarity_score: number | null
          status: string
          submission_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          provider?: string
          report_url?: string | null
          similarity_score?: number | null
          status?: string
          submission_id: string
        }
        Update: {
          created_at?: string
          id?: string
          provider?: string
          report_url?: string | null
          similarity_score?: number | null
          status?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plagiarism_reports_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string
          github_url: string | null
          id: string
          linkedin_url: string | null
          notify_email: boolean
          phone: string | null
          portfolio_url: string | null
          professional_summary: string | null
          skills_interests: string[]
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string
          github_url?: string | null
          id: string
          linkedin_url?: string | null
          notify_email?: boolean
          phone?: string | null
          portfolio_url?: string | null
          professional_summary?: string | null
          skills_interests?: string[]
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          notify_email?: boolean
          phone?: string | null
          portfolio_url?: string | null
          professional_summary?: string | null
          skills_interests?: string[]
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          brief: string
          created_at: string
          created_by: string | null
          deadline: string | null
          deliverables: string
          id: string
          objectives: string
          rubric_id: string | null
          skill_id: string
          title: string
        }
        Insert: {
          brief?: string
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          deliverables?: string
          id?: string
          objectives?: string
          rubric_id?: string | null
          skill_id: string
          title: string
        }
        Update: {
          brief?: string
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          deliverables?: string
          id?: string
          objectives?: string
          rubric_id?: string | null
          skill_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "rubrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correct_answers: Json
          created_at: string
          created_by: string | null
          difficulty: string
          explanation: string
          id: string
          options: Json
          points: number
          prompt: string
          skill_id: string | null
          status: string
          topic_id: string | null
          type: string
        }
        Insert: {
          correct_answers?: Json
          created_at?: string
          created_by?: string | null
          difficulty?: string
          explanation?: string
          id?: string
          options?: Json
          points?: number
          prompt: string
          skill_id?: string | null
          status?: string
          topic_id?: string | null
          type?: string
        }
        Update: {
          correct_answers?: Json
          created_at?: string
          created_by?: string | null
          difficulty?: string
          explanation?: string
          id?: string
          options?: Json
          points?: number
          prompt?: string
          skill_id?: string | null
          status?: string
          topic_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          decision: string
          feedback: string
          id: string
          reviewer_id: string
          rubric_scores: Json
          score: number | null
          submission_id: string
        }
        Insert: {
          created_at?: string
          decision: string
          feedback?: string
          id?: string
          reviewer_id: string
          rubric_scores?: Json
          score?: number | null
          submission_id: string
        }
        Update: {
          created_at?: string
          decision?: string
          feedback?: string
          id?: string
          reviewer_id?: string
          rubric_scores?: Json
          score?: number | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      rubrics: {
        Row: {
          created_at: string
          created_by: string | null
          criteria: Json
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          criteria?: Json
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          criteria?: Json
          id?: string
          title?: string
        }
        Relationships: []
      }
      skill_progress: {
        Row: {
          completed_at: string | null
          id: string
          skill_id: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          skill_id: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          skill_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_progress_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          course_id: string
          created_at: string
          description: string
          id: string
          pass_score: number
          position: number
          requires_assignment: boolean
          requires_practice_test: boolean
          requires_project: boolean
          status: string
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string
          id?: string
          pass_score?: number
          position?: number
          requires_assignment?: boolean
          requires_practice_test?: boolean
          requires_project?: boolean
          status?: string
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string
          id?: string
          pass_score?: number
          position?: number
          requires_assignment?: boolean
          requires_practice_test?: boolean
          requires_project?: boolean
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_files: {
        Row: {
          file_name: string
          id: string
          mime_type: string
          size_bytes: number
          storage_path: string
          submission_id: string
        }
        Insert: {
          file_name: string
          id?: string
          mime_type?: string
          size_bytes?: number
          storage_path: string
          submission_id: string
        }
        Update: {
          file_name?: string
          id?: string
          mime_type?: string
          size_bytes?: number
          storage_path?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_files_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          attempt: number
          created_at: string
          demo_url: string | null
          id: string
          kind: string
          repo_url: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
          submitted_at: string | null
          target_id: string
          text_response: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attempt?: number
          created_at?: string
          demo_url?: string | null
          id?: string
          kind?: string
          repo_url?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_at?: string | null
          target_id: string
          text_response?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attempt?: number
          created_at?: string
          demo_url?: string | null
          id?: string
          kind?: string
          repo_url?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_at?: string | null
          target_id?: string
          text_response?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string
          id: string
          name: string
          skill_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          skill_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "topics_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_notification: {
        Args: {
          _body?: string
          _link?: string
          _title: string
          _type: string
          _user_id: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "reviewer" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "reviewer", "student"],
    },
  },
} as const
