import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  description: string;
}

interface TaskListProps {
  userId: number;
}

const TaskList: React.FC<TaskListProps> = ({ userId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}/tasks`);
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [userId]);

  return (
    <div>
      <h5>Task List:</h5>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
