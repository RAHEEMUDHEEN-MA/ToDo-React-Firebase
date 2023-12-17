import React, { useContext } from 'react'
import { TodoContext1 } from '../RouterToDo';
import { Form } from 'react-router-dom';
import restoreimg from '../assets/icons8-restore-25.png'

function ToDoDeleted() {
  const [data, setdata] = useContext(TodoContext1);
  const pendingdata = data.filter((item) => item.status === "deleted");

 
  const restoretodo=(id)=>{
    const confirmrestore=window.confirm(" restoring to pending todo.")
    if(confirmrestore){
      const restoredarray=data.map((item)=>{
        if(item.id==id){
            return{...item,status:"pending"}
        }
        return item
  
      })
      setdata(restoredarray)
    }
    

  }
  return (
    <div className="tileGrid">
      {pendingdata.map((demo) => (
        <div className="tile">
          <div
            className="leftstatusBar"
            style={{
              backgroundColor:
                demo.status === "completed"
                  ? "green"
                  : demo.status === "pending"
                  ? "blue"
                  : demo.status === "deleted"
                  ? "#8a1212"
                  : "black", // Default color or any other color for unrecognized statuses
            }}
          >
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
                  {/* <button onClick={() => done(demo.id)}>
                    <img id="MADBtn" height={19} src={completedImage} alt="" />
                  </button>
                  <Link style={{ padding: "0" }} to={`/edit/${demo.id}`}>
                    <button>
                      <img id="EDITBtn" height={19} src={editimg} alt="" />
                    </button>
                  </Link> */}
                </div>
                <div className="rightoption">
                  <button onClick={() => restoretodo(demo.id)}>
                    <img id="restoreBtn" src={restoreimg} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToDoDeleted;
