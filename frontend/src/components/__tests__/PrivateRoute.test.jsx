import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, expect, test } from 'vitest';
import { useAuth } from '../../AuthContext';
import PrivateRoute from '../PrivateRoute';

vi.mock('../../AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: vi.fn(({ to }) => `Redirected to ${to}`),
  };
});

test('renders children when user is authenticated', () => {
  useAuth.mockReturnValue({ user: { name: 'Test User' } });

  const { getByText } = render(
    <MemoryRouter>
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    </MemoryRouter>
  );

  expect(getByText('Protected Content')).toBeInTheDocument();
});

test('redirects to login when user is not authenticated', () => {
  useAuth.mockReturnValue({ user: null });

  const { getByText } = render(
    <MemoryRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div>Protected Content</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(getByText('Redirected to /')).toBeInTheDocument();
});
