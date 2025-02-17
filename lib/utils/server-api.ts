import { headers } from "next/headers";

export function getServerHeaders() {
  const headersList = headers();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Request-Id": headersList.get("x-request-id") || "",
  };
}

export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    `http://localhost:${process.env.PORT || 3000}`
  );
}

export function handleServerError(error: unknown): {
  error: string;
  status: number;
} {
  console.error("[SERVER_ERROR]", error);

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
