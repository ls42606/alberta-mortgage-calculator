# Authentication Components

This directory contains the authentication system for admin access to the Alberta Mortgage Calculator.

## Components

### `AuthProvider.tsx`
- React Context provider that manages authentication state
- Stores auth state in localStorage for persistence
- Provides login/logout functionality
- Uses simple credential validation (username: "admin", password: "admin123")

### `Login.tsx`
- Login form component with username/password fields
- Redirects to admin dashboard on successful authentication
- Shows error messages for invalid credentials
- Displays default credentials for development

### `ProtectedRoute.tsx`
- Higher-order component that protects admin routes
- Redirects unauthenticated users to the login page
- Preserves the intended destination for post-login redirect

## Usage

### Setting up Authentication

1. Wrap your app with the `AuthProvider`:
```tsx
import { AuthProvider } from './components/auth';

function App() {
  return (
    <AuthProvider>
      {/* Your app content */}
    </AuthProvider>
  );
}
```

2. Protect admin routes with `ProtectedRoute`:
```tsx
import { ProtectedRoute, useAuth } from './components/auth';

function App() {
  const { authState } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

3. Add the login route:
```tsx
import { Login, useAuth } from './components/auth';

function App() {
  const { authState, login } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <Login 
            onLogin={login}
            isAuthenticated={authState.isAuthenticated}
          />
        } 
      />
    </Routes>
  );
}
```

## Default Credentials

- **Username**: admin
- **Password**: admin123

## Security Notes

- This is a simple authentication system suitable for development and basic admin protection
- For production use, consider implementing:
  - Backend authentication with JWT tokens
  - Password hashing
  - Session timeout
  - CSRF protection
  - Rate limiting for login attempts

## TypeScript Types

All authentication types are defined in `src/types/index.ts`:

- `AuthState`: Current authentication state
- `LoginCredentials`: Login form data structure