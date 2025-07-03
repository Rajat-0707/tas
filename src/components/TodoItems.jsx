import { useDispatch } from "react-redux";
import { removeTodo, markCompleted, markIncomplete } from "../redux/actions";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { toast, Toaster } from "sonner";

const TodoItems = ({ todo, index }) => {
  const dispatch = useDispatch();

  // Determine priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Med":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-400 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <li className="bg-white/90 backdrop-blur-sm shadow-md rounded-lg px-5 py-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Toaster richColors closeButton />

      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
        <span
          className={`text-lg ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}>
          {todo.text}
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-end">
        <span
          className={`px-2 py-1 text-xs rounded-full font-semibold ${getPriorityColor(
            todo.priority
          )}`}>
          {todo.priority === "No" ? "No Priority" : todo.priority}
        </span>

        <button
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          onClick={() => {
            dispatch(removeTodo(index));
            toast.error("Task deleted");
          }}>
          <FaTrash size={14} />
        </button>

        {!todo.completed ? (
          <button
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            onClick={() => {
              dispatch(markCompleted(index));
              toast.success("Task completed");
            }}>
            <FaCheck size={14} />
          </button>
        ) : (
          <button
            className="p-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition"
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
