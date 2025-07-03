import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TodoList from "./TodoList";
import { BsPlus } from "react-icons/bs";
import { addTodo } from "../redux/actions";
import { toast, Toaster } from "sonner";

const Todo = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [priority, setPriority] = useState("No");
  const dispatch = useDispatch();

  const handleAddTodoClick = () => {
    if (newTodoText.trim() === "") {
      toast.error("Please enter a Task");
    } else {
      dispatch(addTodo(newTodoText.trim(), priority));
      setNewTodoText("");
      setPriority("No");
      toast.success("Task added successfully");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-mono tracking-widest uppercase">
          Task Hub
        </h2>

        <Toaster richColors closeButton />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            className="w-full flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400 shadow-sm"
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What's on your mind?"
          />

          <select
            className="w-full sm:w-40 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-700 shadow-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}>
            <option value="No">No Priority</option>
            <option value="High">🔥 High</option>
            <option value="Med">⚡ Medium</option>
            <option value="Low">🌱 Low</option>
          </select>

          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
            onClick={handleAddTodoClick}>
            <BsPlus size={22} />
            <span className="text-sm">Add Task</span>
          </button>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Todo;
