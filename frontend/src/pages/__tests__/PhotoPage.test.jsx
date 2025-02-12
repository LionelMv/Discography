import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PhotoPage from '../PhotoPage';
import { vi, it, expect } from 'vitest';
import axios from 'axios';

vi.mock('axios');

it('renders PhotoPage and updates title', async () => {
  axios.get.mockResolvedValueOnce({
    data: { id: 1, title: 'Old Title', image_url: 'image.jpg' },
  });
  axios.patch.mockResolvedValueOnce({
    data: { id: 1, title: 'New Title', image_url: 'image.jpg' },
  });

  render(
    <BrowserRouter>
      <PhotoPage />
    </BrowserRouter>
  );

  expect(
    await screen.findByText('Old Title (Click to edit)')
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText('Old Title (Click to edit)'));

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'New Title' } });
  fireEvent.click(screen.getByText('Save'));

  expect(
    await screen.findByText('New Title (Click to edit)')
  ).toBeInTheDocument();
});
