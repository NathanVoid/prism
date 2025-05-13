import React, { useState } from 'react';
import axios from 'axios';

interface UserFormProps {
  onUserCreated: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post('http://localhost:5000/users', { name });
      setName('');
      onUserCreated(); // trigger parent to refresh list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
