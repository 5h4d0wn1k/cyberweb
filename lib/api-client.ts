import { fetchApi } from '@/lib/utils/api';
import type { Tables } from '@/lib/supabase';

interface CourseWithRelations extends Tables['courses']['Row'] {
  modules?: Array<Tables['modules']['Row'] & {
    challenges?: Tables['challenges']['Row'][];
  }>;
}

export const api = {
  courses: {
    list: async (published?: boolean) => {
      const query = published ? '?published=true' : '';
      return fetchApi<Tables['courses']['Row'][]>(`/api/courses${query}`);
    },
    
    get: async (id: string) => {
      return fetchApi<CourseWithRelations>(`/api/courses/${id}`);
    },
    
    create: async (data: Tables['courses']['Insert']) => {
      return fetchApi<Tables['courses']['Row']>('/api/courses', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    
    update: async (id: string, data: Tables['courses']['Update']) => {
      return fetchApi<Tables['courses']['Row']>(`/api/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    
    delete: async (id: string) => {
      return fetchApi<{ success: boolean }>(`/api/courses/${id}`, {
        method: 'DELETE',
      });
    },
  },
  
  modules: {
    list: async (courseId: string) => {
      return fetchApi<Tables['modules']['Row'][]>(`/api/courses/${courseId}/modules`);
    },
    
    get: async (moduleId: string) => {
      return fetchApi<Tables['modules']['Row'] & {
        challenges: Tables['challenges']['Row'][];
      }>(`/api/modules/${moduleId}`);
    },
  },
  
  challenges: {
    list: async (moduleId: string) => {
      return fetchApi<Tables['challenges']['Row'][]>(`/api/modules/${moduleId}/challenges`);
    },
    
    submit: async (challengeId: string, flag: string) => {
      return fetchApi<{ isCorrect: boolean }>(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ flag }),
      });
    },
  },
  
  auth: {
    getSession: async () => {
      return fetchApi<{ user: Tables['users_profiles']['Row'] | null }>('/api/auth/session');
    },
  },
};