import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';

test('submits new user', () => {
  const mockOnUserCreated = jest.fn();

  render(<UserForm onUserCreated={mockOnUserCreated} />);

  const input = screen.getByPlaceholderText(/enter user name/i);
  const button = screen.getByText(/add user/i);

  fireEvent.change(input, { target: { value: 'Charlie' } });
  fireEvent.click(button);

  expect(mockOnUserCreated).toHaveBeenCalled();
});
