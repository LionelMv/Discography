import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../LandingPage';
import { vi, expect, test } from 'vitest';
import { signInWithGoogle } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';

// Mock Firebase and toast notifications
vi.mock('../../firebaseConfig', () => ({
  signInWithGoogle: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock('../../AuthContext', () => ({
  useAuth: vi.fn(),
}));

// ✅ Test for logout notification
test('shows logout notification when loggedOut flag is set', () => {
  localStorage.setItem('loggedOut', 'true');
  useAuth.mockReturnValue({ user: null });

  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(toast.info).toHaveBeenCalledWith('You have been logged out.', {
    toastId: 'logout-info',
  });
  expect(localStorage.getItem('loggedOut')).toBeNull();
});

// ✅ Test for authentication warning
test('shows authentication warning when redirected flag is set', () => {
  localStorage.setItem('redirected', 'true');
  useAuth.mockReturnValue({ user: null });

  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(toast.warn).toHaveBeenCalledWith(
    'You need to log in to access that page!',
    { toastId: 'auth-warning' }
  );
  expect(localStorage.getItem('redirected')).toBeNull();
});

// ✅ Test when user is NOT logged in (button should be visible)
test('renders login button when user is not logged in', () => {
  useAuth.mockReturnValue({ user: null });

  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  const loginButton = screen.getByRole('button', {
    name: /login with google/i,
  });

  expect(loginButton).toBeInTheDocument();
});

// ✅ Test when user is logged in (button should be hidden)
test('does not render login button when user is logged in', () => {
  useAuth.mockReturnValue({ user: { email: 'test@example.com' } });

  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  const loginButton = screen.queryByRole('button', {
    name: /login with google/i,
  });

  expect(loginButton).not.toBeInTheDocument();
});

// ✅ Test for clicking the login button
test('calls signInWithGoogle on login button click', async () => {
  useAuth.mockReturnValue({ user: null });

  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  const loginButton = screen.getByRole('button', {
    name: /login with google/i,
  });

  await userEvent.click(loginButton);

  expect(signInWithGoogle).toHaveBeenCalled();
});
