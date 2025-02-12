import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi, expect, test } from 'vitest';
import BackButton from '../BackButton';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test('navigates back when clicking the button', () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  render(
    <MemoryRouter>
      <BackButton />
    </MemoryRouter>
  );

  const button = screen.getByText('Go Back');
  fireEvent.click(button);

  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
