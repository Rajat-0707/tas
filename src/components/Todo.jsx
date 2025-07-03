import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TodoList from "./TodoList";
import { BsPlus } from "react-icons/bs";
import { addTodo } from "../redux/actions";
import { toast, Toaster } from "sonner";
import './Todo.css'; // ✅ Link to custom CSS

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
    <div className="todo-container">
      <div className="todo-box">
        <h2 className="todo-title">Task Hub</h2>

        <Toaster richColors closeButton />

        <div className="todo-input-row">
          <input
            className="todo-input"
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What's on your mind?"
          />

          <select
            className="todo-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}>
            <option value="No">No Priority</option>
            <option value="High">🔥 High</option>
            <option value="Med">⚡ Medium</option>
            <option value="Low">🌱 Low</option>
          </select>

          <button
            className="todo-button"
            onClick={handleAddTodoClick}>
            <BsPlus size={22} />
            <span className="todo-button-text">Add Task</span>
          </button>
        </div>

        <div className="todo-list-wrapper">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Todo;
