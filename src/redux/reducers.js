import {
  ADD_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  UPDATE_SEARCH_TERM,
  SORT_TODOS,
  SET_FILTER,
} from "./actionTypes";

const initialState = { todos: [], filter: "ALL", searchTerm: "", sort: "NONE" };

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.payload.text,
            completed: false,
            priority: action.payload.priority,
          },
        ],
      };

    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo, index) => index !== action.payload.id),
        filter: state.filter,
        sort: state.sort,
        searchTerm: state.searchTerm,
      };

    case MARK_COMPLETED:
      return {
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: true } : todo
        ),
        filter: state.filter,
        sort: state.sort,
        searchTerm: state.searchTerm,
      };

    case MARK_INCOMPLETE:
      return {
        todos: state.todos.map((todo, index) =>
          index === action.payload.id ? { ...todo, completed: false } : todo
        ),
        filter: state.filter,
        sort: state.sort,
        searchTerm: state.searchTerm,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload, // Update the filter, not the todos
      };
    case SORT_TODOS: {
      const sortType = action.payload.sortType;
      let sortedTodos = [...state.todos];

      if (sortType === "COMPLETED") {
        sortedTodos = sortedTodos.filter((todo) => todo.completed);
      } else if (sortType === "INCOMPLETE") {
        sortedTodos = sortedTodos.filter((todo) => !todo.completed);
      } else if (sortType === "PRIORITY") {
        const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3, NONE: 4 };
        sortedTodos.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      }

      return { ...state, todos: sortedTodos };
    }

    case UPDATE_SEARCH_TERM:
      return {
        todos: state.todos,
        filter: state.filter,
        searchTerm: action.payload.searchTerm,
      };

    default:
      return state;
  }
};

export default todoReducer;
