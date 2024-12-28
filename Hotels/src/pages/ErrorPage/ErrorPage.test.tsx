import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import '@testing-library/jest-dom'; 

describe('ErrorPage Component', () => {
  test('renders default error page with 404 and Not Found message', () => {
    render(<ErrorPage />);
    const numberElement = screen.getByText('404');
    expect(numberElement).toBeInTheDocument();
    const messageElement = screen.getByText('Not Found');
    expect(messageElement).toBeInTheDocument();
  });

  test('renders custom error number and message when provided as props', () => {
    render(<ErrorPage number={500} msg="Internal Server Error" />);
    const numberElement = screen.getByText('500');
    expect(numberElement).toBeInTheDocument();
    const messageElement = screen.getByText('Internal Server Error');
    expect(messageElement).toBeInTheDocument();
  });
});
