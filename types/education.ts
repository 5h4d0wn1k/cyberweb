export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: "offensive" | "defensive" | "web3";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  published: boolean;
  points: number;
  created_at: string;
  updated_at: string;
  modules: Module[];
  progress?: CourseProgress;
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
