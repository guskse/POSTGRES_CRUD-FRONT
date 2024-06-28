import { useEffect, useState } from "react";

//edit component
import EditTodo from "./EditTodo";

const ListTodos = () => {
  //todos state
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      //fetch makes a GET request as default
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json(); //parse the data from json format
      //   console.log(jsonData);

      //change the todos state to put the fetched todos in it
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  //every time pages render, fetch the todo list from database
  useEffect(() => {
    getTodos();
  }, []);

  //function to delete todo
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      //take the deleted todo from the todos state
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            return (
              <tr key={index}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
