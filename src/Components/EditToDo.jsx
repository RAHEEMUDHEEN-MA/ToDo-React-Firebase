import "../Styles/EditToDo.css";
import React, { useContext, useEffect, useState } from "react";
import { TodoContext1 } from "../RouterToDo";
import { useNavigate, useParams } from "react-router-dom";
import saveimg from "../assets/icons8-save-60.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

function EditToDo() {
  const [data, setData, user] = useContext(TodoContext1);
  const { todoid } = useParams();

  console.log("selected id", todoid);
  const [selectedTodo, setselectedTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const temp = data.find((item) => item.id === todoid);
    if (temp) {
      setselectedTodo(temp);
      setEditedTodo(temp.todo);
    }
  }, [data,todoid]);


  const handleSubmit = (e) => {
    e.preventDefault();
    confirm(todoid);
  };

  const confirm = async (id) => {
    const confirmation = window.confirm("save changes?");
    if (confirmation) {
      try {
        console.log("editing id", id);
        const todoReff = doc(db, "todoUser", user.email, "todos", todoid);
        await updateDoc(todoReff, {
          todo: editedTodo,
        });
        const updatedData = data.map((item) =>
          item.id === todoid ? { ...item, todo: editedTodo } : item
        );
        setData(updatedData);
        history(-1);
      } catch (error) {
        console.log("error in editing todo", error);
      }
    }
  };

  return (
    <div className="editpage">
      {selectedTodo && (
        <div className="edittile">
          <div className="leftstatusBar">
            <p></p>
          </div>
          <div className="mainCont">
            <div className="timeDate">
              <p className="date">{selectedTodo.date}</p>
              <p className="time"></p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="subdiv">
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />

                <div className="options">
                  <div className="leftoption"></div>
                  <div className="rightoption">
                    <button type="submit">
                      <img height={30} src={saveimg} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditToDo;
