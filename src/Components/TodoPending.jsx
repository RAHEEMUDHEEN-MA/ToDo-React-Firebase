import "../Styles/ToDoDrid.css"
import React, { useContext } from 'react'
import { TodoContext1 } from '../RouterToDo';
import { Link } from 'react-router-dom';
import completedImage from '../assets/icons8-checkmark-25.png'
import editimg from '../assets/icons8-edit-25 (1).png'
import dltimg from "../assets/icons8-delete-25 (2).png";


function TodoPending() {

  const [data, setdata] = useContext(TodoContext1);
  const pendingdata = data.filter((item) => item.status === "pending");

  const deleteToDo = (id) => {
    const confirmation=window.confirm('deleting task!')
    if(confirmation){
      const deletedarray = data.map((item) => {
        if (item.id === id) {
          return { ...item, status: "deleted" };
        }
        return item;
      });
      setdata(deletedarray);
    console.log("final", data);
    }
    
    
  };


  const done = (id) => {
    const donearray = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: "completed" };
      }
      return item;
    });
    setdata(donearray);
  };
  return (
    <div className="tileGrid">
    {pendingdata.map((demo) => (
      <div className="tile" key={demo.id}>
        <div className="leftstatusBar" style={{ backgroundColor: "#04567D" }}>
          <p>{demo.status}</p>
        </div>
        <div className="mainCont">
          <div className="timeDate">
            <p className="date">{demo.date}</p>
            <p className="time">{demo.time}</p>
          </div>
          <div className="subdiv">
            <p>{demo.todo}</p>

            <div className="options">
              <div className="leftoption">
                <button onClick={() => done(demo.id)}>
                  <img id="MADBtn" height={19} src={completedImage} alt="" />
                </button>
                <Link style={{ padding: "0" }} to={`/edit/${demo.id}`}>
                  <button>
                    <img id="EDITBtn" height={19} src={editimg} alt="" />
                  </button>
                </Link>
              </div>
              <div className="rightoption">
                <button onClick={() => deleteToDo(demo.id)}>
                  <img id="DLTBtn" height={17} src={dltimg} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default TodoPending
