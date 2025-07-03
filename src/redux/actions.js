import {
  ADD_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  SET_FILTER,
  UPDATE_SEARCH_TERM,
  SORT_TODOS,
} from "./actionTypes";

export const addTodo = (text, priority = "no") => ({
  type: ADD_TODO,
  payload: { text, priority },
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

export const markCompleted = (id) => ({
  type: MARK_COMPLETED,
  payload: { id },
});

export const markIncomplete = (id) => ({
  type: MARK_INCOMPLETE,
  payload: { id },
});

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};
export const sortTodos = (sortType) => ({
  type: SORT_TODOS,
  payload: { sortType },
});

export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  payload: { searchTerm },
});
