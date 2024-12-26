import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';
import '@testing-library/jest-dom';
const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

describe('ConfirmDialog', () => {
  it('renders without crashing', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when the delete button is clicked', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('does not render dialog when open is false', () => {
    render(
      <ConfirmDialog
        open={false}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
  });
});
