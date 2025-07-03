import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import { useState } from "react";
import { setFilter } from "../redux/actions";
import { BsSearch } from "react-icons/bs";
import './TodoList.css'; // 

const TodoList = () => {
  const [sortByPriority, setSortByPriority] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos
    .filter((todo) =>
      todo.t
