import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import { useState } from "react";
import { setFilter } from "../redux/actions";
import { BsSearch } from "react-icons/bs";

const TodoList = () => {
  const [sortByPriority, setSortByPriority] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo) => {
      if (filter === "ALL") return true;
      if (filter === "COMPLETED" && todo.completed) return true;
      if (filter === "INCOMPLETE" && !todo.completed) return true;
      return false;
    })
    .sort((a, b) => {
      if (sortByPriority) {
        const priorityOrder = { High: 3, Med: 2, Low: 1, No: 0 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (newFilter) => dispatch(setFilter(newFilter));

  return (
    <div className="mt-8">
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "COMPLETED", "INCOMPLETE"].map((type) => (
            <button
              key={type}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition ${
                filter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterChange(type)}>
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}

          <button
            className="text-sm px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition font-medium"
            onClick={() => setSortByPriority(!sortByPriority)}>
            {sortByPriority ? "Show Default Order" : "Sort by Priority"}
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white shadow-sm px-3 py-2 rounded-lg border">
          <BsSearch size={18} className="text-gray-500" />
          <input
            className="w-full outline-none text-sm text-gray-800 placeholder-gray-400"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
          />
        </div>
      </div>

      {/* Todo Items */}
      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) => (
            <TodoItems key={index} todo={todo} index={index} />
          ))
        ) : (
          <li className="text-center text-gray-500 italic py-4">
            List is empty. Add a task.
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
