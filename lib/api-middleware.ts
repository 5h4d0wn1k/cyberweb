import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ZodError } from "zod";
import { handleServerError } from "./utils/server-api";
import type { AuthToken } from "@/types/auth";

export type ApiHandler = (
  req: NextRequest,
  context: { params: Record<string, string>; token: AuthToken },
) => Promise<NextResponse>;

export function withAuth(handler: ApiHandler) {
  return async (
    req: NextRequest,
    context: { params: Record<string, string> },
  ) => {
    try {
      const token = (await getToken({ req })) as AuthToken | null;
      if (!token) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      return await handler(req, { ...context, token });
    } catch (error) {
      return handleError(error);
    }
  };
}

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return new NextResponse(
      JSON.stringify({
        error: "Validation error",
        details: error.errors,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { error: errorMessage, status } = handleServerError(error);

  return new NextResponse(JSON.stringify({ error: errorMessage }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
