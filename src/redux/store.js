import { createStore } from "redux";
import todoReducer from "./reducers";

const loadState = () => {
  const serializedState = localStorage.getItem("state");
  return serializedState
    ? JSON.parse(serializedState)
    : { todos: [], filter: "ALL" };
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const store = createStore(todoReducer, loadState());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
