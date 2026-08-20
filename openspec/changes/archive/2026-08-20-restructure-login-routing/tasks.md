## 1. Configuration

- [x] 1.1 Add `.env.example` with `VITE_API_BASE_URL=http://localhost:8080` and verify the API service still resolves the same local default when no `.env` exists.
- [x] 1.2 Confirm the app can access the package version for display and verify TypeScript accepts the chosen approach.

## 2. Authentication Context

- [x] 2.1 Create `src/hooks/auth.tsx` with `AuthProvider`, `useAuth`, `user`, `isAuthorized`, `signIn`, and `signOut`, and verify no raw token is stored in JavaScript-accessible storage.
- [x] 2.2 Move login submission state from `App.tsx` into the auth context/page flow and verify successful login stores only the returned user profile.
- [x] 2.3 Implement logout state clearing without token storage assumptions and verify the app returns to public routes.

## 3. Routing

- [x] 3.1 Implement `src/routes/index.tsx` as `AppRoutes` that chooses public or private routes from `isAuthorized`, and verify unauthenticated state renders the public route set.
- [x] 3.2 Implement `src/routes/publicRoutes.tsx` for the login page and verify `/login` renders for unauthenticated users.
- [x] 3.3 Implement `src/routes/privateRoutes.tsx` with a minimal authenticated landing page and verify successful login switches to the private route set.

## 4. Pages and Styling

- [x] 4.1 Move login UI into `src/pages/Login/index.tsx` and verify the form still handles success, invalid credentials, API errors, and connection failures.
- [x] 4.2 Move login styled-components into `src/pages/Login/styles.ts` and verify styles use `theme.colors` and existing theme typography tokens.
- [x] 4.3 Add a minimal private home page under `src/pages/Home` and verify it does not implement task CRUD scope.

## 5. Application Shell

- [x] 5.1 Refactor `src/App.tsx` to render `ThemeProvider`, `AuthProvider`, `AppRoutes`, and the fixed version badge, and verify login form code no longer lives in `App.tsx`.
- [x] 5.2 Ensure the fixed version badge stays near the bottom of public/private screens without blocking content and verify it shows the package version.

## 6. Verification

- [x] 6.1 Run `.\node_modules\.bin\tsc.cmd -b` and verify TypeScript passes.
- [x] 6.2 Run `.\node_modules\.bin\vite.cmd build` and verify the production build passes.
- [x] 6.3 Search for `localStorage`, `sessionStorage`, and `accessToken` in frontend auth/login code and verify no JWT persistence or exposure was introduced.
