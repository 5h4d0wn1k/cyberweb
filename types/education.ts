export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  points: number;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  modules: Array<{
    id: string;
    title: string;
    description: string;
    order_index: number;
    points: number;
    challenges: Array<{
      id: string;
      title: string;
      difficulty: string;
      points: number;
    }>;
    userProgress?: {
      completed: boolean;
      attempts: number;
    };
  }>;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  course_id: string;
  points: number;
  created_at: string;
  updated_at: string;
  challenges: Challenge[];
  course?: Course;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  content: string;
  points: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  flag: string;
  module_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  module?: Module;
  progress?: ChallengeProgress;
}

export interface CourseProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface ChallengeProgress {
  completed: boolean;
  attempts: number;
}

export interface UserStats {
  points: number;
  rank: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  completionPercentage: number;
}

export interface SubmissionResponse {
  correct: boolean;
  message: string;
  points?: number;
  firstCompletion?: boolean;
  attempts?: number;
}
