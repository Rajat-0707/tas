import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import { useState } from "react";
import { setFilter } from "../redux/actions";
import { BsSearch } from "react-icons/bs";
import './TodoList.css'; // ✅ Link the CSS file

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
    <div className="todo-list-container">
      <div className="todo-controls">
        <div className="todo-filters">
          {["ALL", "COMPLETED", "INCOMPLETE"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? "active" : ""}`}
              onClick={() => handleFilterChange(type)}>
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}

          <button
            className="sort-btn"
            onClick={() => setSortByPriority(!sortByPriority)}>
            {sortByPriority ? "Show Default Order" : "Sort by Priority"}
          </button>
        </div>

        <div className="todo-search">
          <BsSearch size={18} className="search-icon" />
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
          />
        </div>
      </div>

      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) => (
            <TodoItems key={index} todo={todo} index={index} />
          ))
        ) : (
          <li className="empty-list-message">List is empty. Add a task.</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
