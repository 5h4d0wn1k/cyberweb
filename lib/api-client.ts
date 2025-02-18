import { handleResponse } from "./utils/api";
import type {
  Course,
  Module,
  Challenge,
  UserStats,
  SubmissionResponse,
} from "@/types/education";
import type { UserProfile } from "@/types/auth";

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return handleResponse<T>(response);
}

export const api = {
  education: {
    stats: {
      get: async (): Promise<UserStats> => {
        return fetchAPI<UserStats>("/api/education/stats");
      },
    },

    courses: {
      list: async (published = true): Promise<Course[]> => {
        const query = published ? "?published=true" : "";
        return fetchAPI<Course[]>(`/api/education/courses${query}`);
      },

      get: async (courseId: string): Promise<Course> => {
        return fetchAPI<Course>(`/api/education/courses/${courseId}`);
      },
    },

    challenges: {
      get: async (challengeId: string): Promise<Challenge> => {
        return fetchAPI<Challenge>(`/api/education/challenges/${challengeId}`);
      },

      submit: async (
        challengeId: string,
        flag: string,
      ): Promise<SubmissionResponse> => {
        return fetchAPI<SubmissionResponse>("/api/education/submit", {
          method: "POST",
          body: JSON.stringify({ challengeId, flag }),
        });
      },
    },

    modules: {
      get: async (moduleId: string): Promise<Module> => {
        return fetchAPI<Module>(`/api/education/modules/${moduleId}`);
      },
    },
  },

  challenges: {
    get: async (challengeId: string): Promise<Challenge> => {
      return fetchAPI<Challenge>(`/api/challenges/${challengeId}`);
    },

    submit: async (
      challengeId: string,
      flag: string,
    ): Promise<SubmissionResponse> => {
      return fetchAPI<SubmissionResponse>(
        `/api/challenges/${challengeId}/submit`,
        {
          method: "POST",
          body: JSON.stringify({ flag }),
        },
      );
    },
  },

  user: {
    profile: async (): Promise<UserProfile> => {
      return fetchAPI("/api/user/profile");
    },

    progress: async () => {
      return fetchAPI("/api/user/progress");
    },

    achievements: async () => {
      return fetchAPI("/api/user/achievements");
    },
  },
};
