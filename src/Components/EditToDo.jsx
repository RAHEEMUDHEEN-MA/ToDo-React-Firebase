import '../Styles/EditToDo.css'
import React, { useContext, useEffect, useState } from 'react'
import { TodoContext1 } from '../RouterToDo';
import { useNavigate, useParams } from 'react-router-dom';
import saveimg from '../assets/icons8-save-60.png'


function EditToDo() {
  const [data, setData] = useContext(TodoContext1);
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
  }, [data, todoid]);

  console.log("selected edit data ", selectedTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    confirm();

   
  };

  const confirm=()=>{
    const confirmation=window.confirm('save changes?');
    if(confirmation){
      const updatedData = data.map((item) =>
      item.id ===todoid ? { ...item, todo: editedTodo } : item
    );

    setData(updatedData);
    history("/");
    }
  }

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