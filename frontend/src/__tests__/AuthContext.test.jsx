import '@testing-library/jest-dom/vitest';
import { renderHook } from '@testing-library/react';
import { vi, it, expect } from 'vitest';
import { useAuth, AuthProvider } from '../AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

// Mock Firebase Auth
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    onAuthStateChanged: vi.fn(),
  };
});

it('handles authentication state changes', () => {
  const mockUser = { uid: '123', email: 'test@example.com' };

  // Ensure onAuthStateChanged returns an unsubscribe function
  onAuthStateChanged.mockImplementation((_, callback) => {
    callback(mockUser); // Simulate user authentication state change
    return () => {}; // Mock unsubscribe function to prevent the error
  });

  // Render the hook with AuthProvider
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

  expect(result.current.user).toEqual(mockUser);
});
