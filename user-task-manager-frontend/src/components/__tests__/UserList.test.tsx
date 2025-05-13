import { render, screen } from '@testing-library/react';
import UserList from '../UserList';

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

test('displays users in the list', () => {
  render(<UserList users={mockUsers} onUserClick={() => {}} />);

  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});
