## Context

The frontend is a small React/Vite project that currently has the login UI and user state inside `App.tsx`. The API login integration already uses an HttpOnly cookie transport, so the route/auth architecture must preserve credential inclusion and avoid JavaScript token storage even though the visual reference comes from a project that used JWT in `localStorage`.

## Goals / Non-Goals

**Goals:**
- Give the frontend a small, extensible application shell similar to the provided reference: providers around route rendering and a fixed version badge.
- Separate page structure from app bootstrap by moving login into `src/pages/Login`.
- Introduce route-level public/private behavior so post-login screens can be added without returning auth logic to `App.tsx`.
- Keep the current secure cookie-based authentication model.

**Non-Goals:**
- Do not add Axios, refresh token queues, WebSocket providers, notification libraries, or additional global providers that the current project does not use.
- Do not implement the full task CRUD in this change.
- Do not add token persistence to `localStorage` or `sessionStorage`.
- Do not change backend authentication endpoints.

## Decisions

1. Use Context API for authenticated user state.
   - Rationale: The project already has React and does not need a new state library for login state.
   - Alternative considered: keep state in `App.tsx`; rejected because it keeps routing and login form concerns coupled.

2. Keep fetch-based API service with `credentials: "include"`.
   - Rationale: Cookie HttpOnly requires browser credential inclusion and does not require Axios.
   - Alternative considered: migrate to Axios to match the reference; rejected because it adds a dependency without solving a current problem.

3. Treat private route access as frontend state for this stage.
   - Rationale: The current API login response returns the user summary, enough to move from public to private routes after login.
   - Follow-up: Add an authenticated `/auth/me` or similar backend endpoint later to restore sessions after page refresh without exposing the token.

4. Use a minimal private home page after login.
   - Rationale: The user requested a private route after login, while task screens are outside the immediate scope.
   - Alternative considered: route directly to task list; deferred until the task list feature is implemented.

5. Read the version from `package.json`.
   - Rationale: The reference displays package version in the root shell; importing package metadata keeps it single-source.
   - Implementation note: Vite/TypeScript may require `resolveJsonModule` or a small local constants file if direct JSON import is not supported by current compiler settings.

## Risks / Trade-offs

- Session is lost on full page reload because the token is HttpOnly and there is no current `/auth/me` endpoint → Mitigate by keeping reload restoration out of scope and documenting `/auth/me` as the next backend addition.
- Private route gating is client-side only → Backend remains the true protection through the HttpOnly cookie and authenticated API endpoints.
- Matching the reference too literally could reintroduce localStorage token handling → Mitigate by copying structure only, not the unsafe token persistence strategy.
- `react-router` version may affect exact route API usage → Mitigate by checking installed v8 APIs before implementation and keeping route files thin.

## Migration Plan

1. Add `.env.example` with `VITE_API_BASE_URL=http://localhost:8080`.
2. Introduce `AuthProvider` and route files while preserving the existing service contract.
3. Move login UI/styling into the `pages/Login` folder and render it through public routes.
4. Add a minimal private page to verify successful login route switching.
5. Update `App.tsx` to provider shell plus version badge.
6. Run TypeScript and production build checks.
