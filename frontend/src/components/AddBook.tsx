// ./frontend/src/components/AddTask.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import useApi from "../hooks/useApi";

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  const { apiCall: addTask } = useApi({
    method: "POST",
    queryParams: "/tasks",
    payload: { title, description, status, priority }
  });

  const handleAddTask = async () => {
    const newTask = await addTask();
    if (newTask) {
      showToast("Task added successfully!");
      navigate("/dashboard");
    } else {
      showToast("Failed to add task.");
    }
  };

  return (
    <div>
      <h1>Add Task</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <label>
          Title:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>In Progress</option>
            <option value='Completed'>Completed</option>
          </select>
        </label>
        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </label>
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
