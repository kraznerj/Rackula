import { betterAuth } from "better-auth";

/**
 * Better Auth configuration with stateless (cookie-only) sessions.
 *
 * Session data is stored in signed/encrypted cookies with no database backend.
 * This eliminates server-side session storage while providing sessions that survive
 * container restarts (stored in browser cookies, not server memory).
 *
 * Environment variables:
 * - RACKULA_OIDC_ISSUER: OIDC provider base URL (e.g., https://authentik.example.com/application/o/rackula/)
 * - RACKULA_OIDC_CLIENT_ID: OAuth client ID
 * - RACKULA_OIDC_CLIENT_SECRET: OAuth client secret
 * - RACKULA_OIDC_REDIRECT_URI: OAuth callback URL (defaults to /auth/callback)
 * - RACKULA_AUTH_SESSION_SECRET: HMAC secret for signing session cookies (required, min 32 chars)
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

  socialProviders: {
    // Generic OIDC provider configuration
    // Supports any OIDC-compliant IdP (Authentik, Authelia, Keycloak, etc.)
    ...(process.env.RACKULA_OIDC_ISSUER && {
      oidc: {
        issuer: process.env.RACKULA_OIDC_ISSUER,
        clientId: process.env.RACKULA_OIDC_CLIENT_ID || "",
        clientSecret: process.env.RACKULA_OIDC_CLIENT_SECRET || "",
        redirectURI:
          process.env.RACKULA_OIDC_REDIRECT_URI ||
          `${process.env.PUBLIC_URL || "http://localhost:3000"}/auth/callback`,
      },
    }),
  },
});
