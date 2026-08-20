## Purpose

Defines the frontend login shell behavior, including public/private route selection, authenticated user state, and version display without exposing authentication tokens to JavaScript.

## ADDED Requirements

### Requirement: Public login route
The system SHALL expose a public login route for unauthenticated users.

#### Scenario: Unauthenticated user opens the application
- **WHEN** no authenticated user is available in frontend state
- **THEN** the system renders the login page as the public entry point

#### Scenario: Login page uses system theme
- **WHEN** the login page is rendered
- **THEN** visible login styles use the application theme colors and typography tokens

### Requirement: Cookie-based login submission
The system SHALL submit login credentials to the configured API URL using browser credential inclusion.

#### Scenario: User submits valid credentials
- **WHEN** the user submits e-mail and password from the login page
- **THEN** the system sends the login request with credentials included so the browser can receive the HttpOnly authentication cookie

#### Scenario: Login response contains authenticated user
- **WHEN** the login request succeeds
- **THEN** the system stores the returned user profile in frontend authentication state without reading or storing the JWT token

#### Scenario: Login request fails
- **WHEN** the API rejects the credentials or the request cannot reach the API
- **THEN** the system keeps the user on the login page and shows an actionable error message

### Requirement: Private route after login
The system SHALL render private application routes only after the frontend marks the user as authenticated.

#### Scenario: Successful login changes route set
- **WHEN** login succeeds and the authenticated user is stored in context state
- **THEN** the system renders the private route set instead of the public login route

#### Scenario: Unauthenticated user requests private content
- **WHEN** an unauthenticated user attempts to access private content
- **THEN** the system redirects or falls back to the public login route

### Requirement: Authentication token privacy
The system SHALL NOT store authentication tokens in JavaScript-accessible browser storage.

#### Scenario: Login succeeds
- **WHEN** the API returns after a successful login
- **THEN** the system does not write JWT or session token values to `localStorage`, `sessionStorage`, IndexedDB, or in-memory variables intended to expose the raw token

### Requirement: Application version display
The system SHALL display the frontend package version in a fixed low-emphasis location on the main application shell.

#### Scenario: Application shell renders
- **WHEN** the application root renders either public or private routes
- **THEN** the package version is visible near the bottom of the viewport without blocking primary content

### Requirement: Environment example
The project SHALL provide an environment example file for local API configuration.

#### Scenario: Developer checks environment configuration
- **WHEN** the developer opens the repository
- **THEN** `.env.example` documents `VITE_API_BASE_URL` with the local API default
