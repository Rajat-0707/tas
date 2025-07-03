import { useDispatch } from "react-redux";
import { removeTodo, markCompleted, markIncomplete } from "../redux/actions";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import './TodoItems.css'; 

const TodoItems = ({ todo, index }) => {
  const dispatch = useDispatch();

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Med":
        return "priority-med";
      case "Low":
        return "priority-low";
      default:
        return "priority-none";
    }
  };

  return (
    <li className="todo-item">
      <Toaster richColors closeButton />

      <div className="todo-item-left">
        <span className="todo-index">#{index + 1}</span>
        <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
          {todo.text}
        </span>
      </div>

      <div className="todo-item-right">
        <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
          {todo.priority === "No" ? "No Priority" : todo.priority}
        </span>

        <button
          className="todo-btn delete-btn"
          onClick={() => {
            dispatch(removeTodo(index));
            toast.error("Task deleted");
          }}>
          <FaTrash size={14} />
        </button>

        {!todo.completed ? (
          <button
            className="todo-btn complete-btn"
            onClick={() => {
              dispatch(markCompleted(index));
              toast.success("Task completed");
            }}>
            <FaCheck size={14} />
          </button>
        ) : (
          <button
            className="todo-btn incomplete-btn"
            onClick={() => {
              dispatch(markIncomplete(index));
              toast.error("Task moved to incomplete");
            }}>
            <FaTimes size={14} />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItems;
