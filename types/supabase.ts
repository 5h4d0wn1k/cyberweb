export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image_url: string;
          points: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          image_url: string;
          points?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string;
          points?: number;
          title?: string;
        };
        Relationships: [];
      };
      challenges: {
        Row: {
          created_at: string;
          description: string;
          difficulty: string;
          flag: string;
          hints: string[] | null;
          id: string;
          module_id: string;
          order_index: number;
          points: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          difficulty: string;
          flag: string;
          hints?: string[] | null;
          id?: string;
          module_id: string;
          order_index: number;
          points?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          difficulty?: string;
          flag?: string;
          hints?: string[] | null;
          id?: string;
          module_id?: string;
          order_index?: number;
          points?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "challenges_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          difficulty: string;
          id: string;
          image_url: string | null;
          is_published: boolean;
          points: number;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          difficulty: string;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          points?: number;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          difficulty?: string;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          points?: number;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      modules: {
        Row: {
          course_id: string;
          created_at: string;
          description: string;
          id: string;
          order_index: number;
          points: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          course_id: string;
          created_at?: string;
          description: string;
          id?: string;
          order_index: number;
          points?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          course_id?: string;
          created_at?: string;
          description?: string;
          id?: string;
          order_index?: number;
          points?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      submissions: {
        Row: {
          challenge_id: string;
          created_at: string;
          id: string;
          is_correct: boolean;
          submission: string;
          user_id: string;
        };
        Insert: {
          challenge_id: string;
          created_at?: string;
          id?: string;
          is_correct: boolean;
          submission: string;
          user_id: string;
        };
        Update: {
          challenge_id?: string;
          created_at?: string;
          id?: string;
          is_correct?: boolean;
          submission?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "submissions_challenge_id_fkey";
            columns: ["challenge_id"];
            isOneToOne: false;
            referencedRelation: "challenges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "submissions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_achievements: {
        Row: {
          achievement_id: string;
          earned_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          achievement_id: string;
          earned_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          achievement_id?: string;
          earned_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey";
            columns: ["achievement_id"];
            isOneToOne: false;
            referencedRelation: "achievements";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_progress: {
        Row: {
          attempts: number;
          challenge_id: string;
          completed_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          attempts?: number;
          challenge_id: string;
          completed_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          attempts?: number;
          challenge_id?: string;
          completed_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_challenge_id_fkey";
            columns: ["challenge_id"];
            isOneToOne: false;
            referencedRelation: "challenges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      users_profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          points: number;
          rank: string;
          updated_at: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          points?: number;
          rank?: string;
          updated_at?: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          points?: number;
          rank?: string;
          updated_at?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      discussion_comments: {
        Row: {
          id: string;
          challenge_id: string;
          user_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          challenge_id: string;
          user_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          challenge_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "discussion_comments_challenge_id_fkey";
            columns: ["challenge_id"];
            referencedRelation: "challenges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "discussion_comments_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          type?: string;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_challenge_submission: {
        Args: {
          challenge_id: string;
          submission_text: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
