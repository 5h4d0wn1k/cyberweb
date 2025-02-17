import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');

export const challengeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  points: z.number().min(0, 'Points must be 0 or greater'),
  flag: z.string().min(1, 'Flag is required'),
  hints: z.array(z.string()).optional(),
  order_index: z.number().min(0, 'Order must be 0 or greater'),
});

export const moduleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  points: z.number().min(0, 'Points must be 0 or greater'),
  order_index: z.number().min(0, 'Order must be 0 or greater'),
});

export const courseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  points: z.number().min(0, 'Points must be 0 or greater'),
  image_url: z.string().url('Must be a valid URL').optional(),
  is_published: z.boolean(),
});