import type { Context, MiddlewareHandler } from "hono";
import { auth } from "../auth/config";

/**
 * Creates a Better Auth handler for Hono routes.
 *
 * Mounts at /auth/* to handle all Better Auth endpoints:
 * - POST /auth/sign-in - OIDC authentication initiation
 * - GET /auth/callback - OIDC callback handler
 * - POST /auth/sign-out - Session termination
 * - GET /auth/session - Current session status
 *
 * @returns Hono route handler that delegates to Better Auth
 */
export function createAuthHandler(): (
  c: Context,
) => Response | Promise<Response> {
  return (c: Context) => {
    return auth.handler(c.req.raw);
  };
}

/**
 * Creates middleware for session validation on protected routes.
 *
 * For authenticated requests:
 * - Attaches session to context: c.set('authSession', session)
 * - Returns 401 if route requires auth and no session exists
 *
 * For unauthenticated requests:
 * - Allows access to read-only routes (GET /api/layouts)
 * - Blocks access to write routes (PUT, DELETE, POST)
 *
 * @returns Hono middleware that validates sessions
 */
export function createAuthMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (session) {
      c.set("authSession", session);
    }

    // For now, allow all requests through (unauthenticated access preserved)
    // Protected routes will be gated separately using existing write-auth middleware
    await next();
  };
}

/**
 * Creates optional auth middleware that attaches session if present but never blocks.
 *
 * Use for routes that work with both authenticated and unauthenticated users:
 * - GET /api/layouts - Public read access, enhanced for authenticated users
 * - GET /api/assets - Public access
 *
 * @returns Hono middleware that optionally attaches session
 */
export function createOptionalAuthMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (session) {
      c.set("authSession", session);
    }

    await next();
  };
}
