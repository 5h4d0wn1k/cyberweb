import { toast } from '@/hooks/use-toast';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

interface FetchOptions extends RequestInit {
  throwOnError?: boolean;
}

async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new APIError(
      data.message || 'An error occurred',
      response.status,
      data.code
    );
  }

  return data;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { throwOnError = true, ...fetchOptions } = options;

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    if (!throwOnError) {
      toast({
        title: 'Error',
        description: error instanceof APIError ? error.message : 'An error occurred',
        variant: 'destructive',
      });
      return Promise.reject(error);
    }
    throw error;
  }
}