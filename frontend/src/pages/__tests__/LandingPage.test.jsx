import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../LandingPage';
import { vi, expect, test } from 'vitest';
import { signInWithGoogle } from '../../firebaseConfig';
import { toast } from 'react-toastify';

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

test('shows logout notification when loggedOut flag is set', () => {
  localStorage.setItem('loggedOut', 'true');

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

test('shows authentication warning when redirected flag is set', () => {
  localStorage.setItem('redirected', 'true');

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

test('calls signInWithGoogle on login button click', async () => {
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
