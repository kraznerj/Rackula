import { betterAuth } from "better-auth";

/**
 * Better Auth configuration with stateless (cookie-only) sessions.
 *
 * Session data is stored in signed/encrypted cookies with no database backend.
 * This eliminates server-side session storage while providing sessions that survive
 * container restarts (stored in browser cookies, not server memory).
 *
 * Environment variables:
 * - RACKULA_AUTH_SESSION_SECRET: HMAC secret for signing session cookies (required, min 32 chars)
 * - RACKULA_OIDC_ISSUER: OIDC provider base URL (for Phase 2)
 * - RACKULA_OIDC_CLIENT_ID: OAuth client ID (for Phase 2)
 * - RACKULA_OIDC_CLIENT_SECRET: OAuth client secret (for Phase 2)
 * - RACKULA_OIDC_REDIRECT_URI: OAuth callback URL (for Phase 2, defaults to /auth/callback)
 *
 * Note: Generic OIDC provider configuration is documented here for Phase 2 implementation.
 * The session infrastructure is complete; OIDC integration requires Better Auth plugin/adapter
 * that will be added in the next phase.
 */
export const auth = betterAuth({
  // Omitting database config enables stateless mode (cookie-only sessions)
  // Session data stored in signed cookies, no database queries for validation
  secret: process.env.RACKULA_AUTH_SESSION_SECRET || "",

  session: {
    // 12 hours session lifetime (shorter than Better Auth default of 7 days)
    expiresIn: 60 * 60 * 12,

    // Refresh session when 6 hours remain
    updateAge: 60 * 60 * 6,

    // Cookie cache for performance optimization
    cookieCache: {
      enabled: true,
      maxAge: 300, // 5-minute cache
    },
  },

  advanced: {
    defaultCookieAttributes: {
      httpOnly: true, // Prevent XSS access to cookie
      sameSite: "lax", // CSRF protection
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      // domain: '.racku.la' // Uncomment if using subdomains
    },
  },

  // TODO Phase 2: Configure generic OIDC provider
  // Research needed: Better Auth's TypeScript interface for generic OIDC (not provider-specific)
  // Environment variables are documented above and ready for integration
  // socialProviders: {
  //   genericOAuth: { ... } // or oidc: { ... } depending on Better Auth's actual API
  // }
});
