// ./frontend/src/components/AddTask.tsx

import React, { useState } from "react";
import useApi from "../hooks/useApi";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const AddTask: React.FC = () => {
  const { apiCall } = useApi();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async () => {
    const newTask = { title, description, status, priority };
    await apiCall({ method: "POST", route: "/tasks", payload: newTask });
    showToast("Task added successfully!");
    navigate("/dashboard");
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
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
        />
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          required
        />
        <input
          type='text'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder='Status'
          required
        />
        <input
          type='text'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder='Priority'
          required
        />
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
