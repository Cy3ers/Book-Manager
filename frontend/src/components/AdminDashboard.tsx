// ./components/AdminDashboard.tsx

import React, { useEffect } from "react";
import { logout } from "../auth";
import { Task } from "../types";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import useApi from "../hooks/useApi";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { apiCall, responseData: tasks } = useApi();

  const fetchTasks = async () => {
    await apiCall({ method: "GET", route: "/tasks" });
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTask = async (id: number) => {
    console.log("Before");
    await apiCall({ method: "DELETE", route: `/tasks/${id}` });
    fetchTasks();
    showToast("Task deleted successfully!");
    console.log("After");
  };
  return (
    <div>
      <h1 className='navbar'>Admin Dashboard</h1>
      <br />
      {/* Route Here */}
      <button
        className='nav-button'
        onClick={() => {
          navigate("/dashboard/book");
        }}
      >
        Add Tasks
      </button>
      <button
        className='nav-button'
        onClick={() => {
          navigate("/dashboard/user");
        }}
      >
        Add Users
      </button>
      <button
        className='nav-button'
        onClick={() => {
          navigate("/dashboard/pass");
        }}
      >
        Change Password
      </button>
      <button
        className='nav-button'
        onClick={logout}
      >
        Logout
      </button>
      <div className='book-list'>
        <h2 className='li-header'>Task List</h2>
        <ul>
          {tasks &&
            tasks.map((task: Task) => (
              <li key={task.id}>
                <div className='title'>{task.title}</div>
                <div className='description'>{task.description}</div>
                <div className='status'>{task.status}</div>
                <div className='priority'>{task.priority}</div>
                <div>
                  <button
                    className='submit-btn'
                    onClick={() => {
                      handleDeleteTask(task.id);
                    }}
                  >
                    Delete Task
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
