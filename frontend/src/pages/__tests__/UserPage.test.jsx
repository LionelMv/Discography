import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserPage from '../UserPage';
import { vi, it, expect } from 'vitest';
import axios from 'axios';

vi.mock('axios');

it('renders UserPage and fetches user data', async () => {
  axios.get.mockResolvedValueOnce({
    data: { id: 1, name: 'Test User', email: 'test@example.com' },
  });
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, title: 'Test Album' }],
  });

  render(
    <BrowserRouter>
      <UserPage />
    </BrowserRouter>
  );

  expect(await screen.findByText("Test User's Albums")).toBeInTheDocument();
  expect(await screen.findByText('Test Album')).toBeInTheDocument();
});