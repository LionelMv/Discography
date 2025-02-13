import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi, test, expect } from 'vitest';
import { useAuth } from '../../AuthContext';
import NavbarComponent from '../NavbarComponent';

// Mock the AuthContext
vi.mock('../../AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock react-router-dom and ensure useNavigate is properly mocked
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test('calls logOut and navigates on logout', async () => {
  const mockLogOut = vi.fn().mockResolvedValue(); // Mock logOut as an async function
  const mockNavigate = vi.fn(); // Mock navigate function

  useAuth.mockReturnValue({ user: { name: 'Test User' }, logOut: mockLogOut });
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  render(
    <MemoryRouter>
      <NavbarComponent />
    </MemoryRouter>
  );

  const logoutButton = screen.getByText('Log Out');
  fireEvent.click(logoutButton);

  await waitFor(() => {
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
