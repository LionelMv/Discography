import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';
import { vi, expect, test } from 'vitest';

// Mock axios
vi.mock('axios');

const mockUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
];

const mockAlbums = [
  { id: 11, title: 'Album 1', user: 1 },
  { id: 12, title: 'Album 2', user: 1 },
  { id: 13, title: 'Album 3', user: 2 },
];

test('renders users and their album counts', async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('/api/users/'))
      return Promise.resolve({ data: mockUsers });
    if (url.includes('/api/albums/'))
      return Promise.resolve({ data: mockAlbums });
    return Promise.reject(new Error('Not Found'));
  });

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText('User One - 2 Albums')).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(screen.getByText('User Two - 1 Albums')).toBeInTheDocument()
  );

  // Ensure links to user pages exist
  expect(screen.getByText(/User One/)).toHaveAttribute('href', '/users/1');
  expect(screen.getByText(/User Two/)).toHaveAttribute('href', '/users/2');
});
