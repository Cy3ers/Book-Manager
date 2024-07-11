// import React from "react";
// import AddBook from "../components/AddBook";
// import { useToast } from "../contexts/ToastContext";
// import { addTask } from "../api/api";
// import { Task } from "../types";

// const AddBookContainer: React.FC = () => {
//   const { showToast } = useToast();

//   const addTasks = async (task: Omit<Task, "id">) => {
//     try {
//       await addTask(task);
//       showToast("Task Added Successfully!");
//     } catch (error) {
//       console.error("Error adding task:", error);
//       showToast("Failed to add task.");
//     }
//   };

//   return <AddBook addTasks={addTasks} />;
// };

// export default AddBookContainer;
