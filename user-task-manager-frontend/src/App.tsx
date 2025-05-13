import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <h2 className="text-center mb-4">User & Task Manager</h2>

            {/* Add User Form */}
            <UserForm onUserCreated={fetchUsers} />

            {/* Search */}
            <div className="my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* User Table */}
            <UserList users={currentUsers} onUserClick={setSelectedUser} />

            {/* Pagination */}
            <nav className="my-3">
              <ul className="pagination justify-content-center">
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Tasks Section */}
            {selectedUser && (
              <div className="mt-5">
                <h4 className="text-primary mb-3">Tasks for User #{selectedUser}</h4>
                <TaskList userId={selectedUser} />
                <div className="mt-3">
                  <TaskForm userId={selectedUser} onTaskCreated={() => setSelectedUser(null)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;