import { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  //send the form values to db
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/"; //reload page when adding todo
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">postgreSQL Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">add</button>
      </form>
    </>
  );
};

export default InputTodo;
