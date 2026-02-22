import { auth } from "./config";

/**
 * Better Auth client instance for use in route handlers.
 *
 * Provides session management and authentication APIs:
 * - auth.api.getSession() - Retrieve current session
 * - auth.api.signOut() - Terminate session
 * - auth.handler() - Handle authentication endpoints
 */
export const authClient = auth;
