import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
  userId: number;
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ userId, onTaskCreated }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Please enter a task description');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/users/${userId}/tasks`, { description });
      setDescription('');
      onTaskCreated(); // Notify parent component to refresh the task list
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />
      <button type="submit" className="btn btn-primary mt-2">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
