import { toast } from "@/hooks/use-toast";

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

interface FetchOptions extends RequestInit {
  throwOnError?: boolean;
}

export function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new APIError(
      data.message || "An error occurred",
      response.status,
      data.code,
    );
  }

  return data;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { throwOnError = true, ...fetchOptions } = options;

  try {
    const response = await fetch(endpoint, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...fetchOptions.headers,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    if (!throwOnError) {
      toast({
        title: "Error",
        description:
          error instanceof APIError ? error.message : "An error occurred",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
    throw error;
  }
}

export function handleApiError(error: unknown): {
  error: string;
  status: number;
} {
  console.error("[API_ERROR]", error);

  if (error instanceof APIError) {
    return {
      error: error.message,
      status: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      status: 500,
    };
  }

  return {
    error: "An unexpected error occurred",
    status: 500,
  };
}
