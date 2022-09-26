// add imports
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} from "../api/apiSlice";

const RenderTodoCard = ({ todo }) => {
  return (
    <div className="todoCard">
      <p>TodoId: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? "true" : "false"}</p>
    </div>
  );
};
const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    //addTodo
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <br />
      <button className="submit">
        Submit <FaPlus />
      </button>
    </form>
  );

  let content;
  // Define conditional content
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (isSuccess) {
    content = todos;
  }
  if (isError) {
    return <p>Error:{error}</p>;
  }
  return (
    <main>
      <h1>Todo List</h1>
      <br />
      {newItemSection}
      <br />
      {todos &&
        content.map((todo) => <RenderTodoCard todo={todo} key={todo.id} />)}
    </main>
  );
};
export default TodoList;
