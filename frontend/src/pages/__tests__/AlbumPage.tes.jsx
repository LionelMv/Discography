import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi, expect, test } from 'vitest';
import axios from 'axios';
import AlbumPage from '../AlbumPage';

// Mock axios
vi.mock('axios');

test('renders album page and photos', async () => {
  const mockAlbum = { title: 'Test Album', photo_count: 2 };
  const mockPhotos = [
    {
      id: 2,
      album: 2,
      title: 'beast_mode_1',
      image_url:
        'https://fastly.picsum.photos/id/575/200/300.jpg?hmac=sopd2rAqqxeAtI5YKmESfglb3av7FRnaTdo3woj1uEM',
    },
    {
      id: 6,
      album: 2,
      title: 'beast_2',
      image_url:
        'https://fastly.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU',
    },
  ];

  axios.get.mockImplementation((url) => {
    if (url.includes('/api/albums/')) {
      return Promise.resolve({ data: mockAlbum });
    }
    if (url.includes('/api/albums/2/photos/')) {
      return Promise.resolve({ data: mockPhotos });
    }
    return Promise.reject(new Error('Not Found'));
  });

  render(
    <MemoryRouter initialEntries={['/albums/2']}>
      <AlbumPage />
    </MemoryRouter>
  );

  // Ensure album title is displayed
  await waitFor(() =>
    expect(screen.getByText('Test Album')).toBeInTheDocument()
  );

  // Ensure photos are rendered
  await waitFor(() => {
    expect(screen.getByText('beast_mode_1')).toBeInTheDocument();
    expect(screen.getByText('beast_2')).toBeInTheDocument();
  });
});
