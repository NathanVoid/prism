import React from 'react';

interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
  onUserClick: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onUserClick(user.id)} style={{ cursor: 'pointer' }}>
            <td>{user.id}</td>
            <td>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
