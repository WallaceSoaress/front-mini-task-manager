## Why

The current frontend keeps the login screen and authentication state inside `App.tsx`, which makes the next private screens harder to add without mixing routing, layout, authentication, and form logic. This change introduces a small application structure for public/private routes and page-level login while preserving the HttpOnly cookie authentication model already integrated with the API.

## What Changes

- Move the login UI into `src/pages/Login/index.tsx` with styles in `src/pages/Login/styles.ts`.
- Introduce an `AuthProvider`/`useAuth` context to centralize authenticated user state, login submission, and logout behavior.
- Update `App.tsx` to mirror the provider-based structure from the reference: theme provider, auth provider, routes, and a fixed version label at the bottom of the main screen.
- Implement route separation under `src/routes`: public routes for login and private routes for authenticated content.
- Add `.env.example` documenting `VITE_API_BASE_URL`, while leaving the user to create their own `.env`.
- Keep token handling compatible with cookie HttpOnly authentication: no JWT storage in `localStorage`, `sessionStorage`, or JavaScript-accessible storage.

## Capabilities

### New Capabilities
- `login-routing`: Login page, authenticated state, public/private route selection, and version display for the frontend application shell.

### Modified Capabilities
- None.

## Impact

- Affected frontend files include `src/App.tsx`, `src/routes/*`, `src/pages/Login/*`, `src/hooks/auth.tsx`, `src/services/api.ts`, `src/services/authService.ts`, theme typings/styles as needed, and `.env.example`.
- No backend API endpoint changes are expected.
- No new dependencies are expected; the existing React, React Router, Context API, styled-components, and fetch-based service layer are sufficient.
