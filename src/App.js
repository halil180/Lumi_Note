import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
const App = () => {
  const [todo, setTodo] = useState(() => {
    return localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
  });
  const [userInput, setUserInput] = useState("");
  const [deleteAllButton, setdeleteAllButton] = useState(true);
  useEffect(() => {
    localStorage.getItem("todo");
    JSON.parse(localStorage.getItem("todo"));
    if (todo.length !== 0) {
      setdeleteAllButton(false);
    }
  }, [todo]);
  const addTodo = () => {
    if (userInput.length == 0) {
      return swal(
        "please fill out the input",
        "please type something!",
        "error"
      );
    }
    if (userInput.length > 53) {
      return swal(
        "Value is too long",
        "a todo can't be longer than 53 char!",
        "error"
      );
    }
    setTodo([
      ...todo,
      { title: userInput, id: uuidv4(), date: new Date().toLocaleString() },
    ]);
    localStorage.setItem(
      "todo",
      JSON.stringify([
        ...todo,
        { title: userInput, id: uuidv4(), date: new Date().toLocaleString() },
      ])
    );
    setdeleteAllButton(false);
  };
  const handleDelete = (pItem) => {
    const filterItem = todo.filter((item) => pItem !== item.id);
    setTodo(filterItem);
    localStorage.setItem("todo", JSON.stringify(filterItem));
    console.log(filterItem);
    if (todo.length == 1) {
      setdeleteAllButton(true);
    }
  };
  const deleteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your todo list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your todo list has been deleted!", {
          icon: "success",
        });
        localStorage.removeItem("todo");
        setTodo([]);
        setdeleteAllButton(true);
      } else {
        swal("Your todo list  is safe!");
      }
    });
  };
  return (
    <div className="App App-header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Lumi Note</h1>
        <a
          className="App-link"
          href="https://play.google.com/store/search?q=pub:lumi_18&c=apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          Other Lumi 18 Products
        </a>
        <div className="col-12 d-flex justify-content-between m-5">
          <button
            disabled={deleteAllButton}
            className="btn btn-danger btn-lg"
            onClick={() => deleteAll()}
          >
            Delete All{" "}
          </button>
          <input
            type="text"
            placeholder="Add todo..."
            className="form-control"
            name=""
            id=""
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                addTodo();
              }
            }}
          />
          <button className="btn btn-primary btn-lg" onClick={() => addTodo()}>
            Add
          </button>
        </div>
        <div
          className="overflow-auto "
          style={{ overflow: "scrolll", height: "100%", width: "100%" }}
        >
          {todo
            .reverse()
            .map((x) => (
              <ul className="list-group" key={x.id}>
                <li className="list-group-item d-flex justify-content-between align-items-center ">
                  {x.title}
                  <button
                    className="badge bg-danger  btn "
                    onClick={() => handleDelete(x.id)}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
                <li>{x.date}</li>
                <br />
              </ul>
            ))
            .reverse()}
        </div>
      </header>
    </div>
  );
};
export default App;