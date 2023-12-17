import React, { useContext } from 'react'
import { TodoContext1 } from '../RouterToDo';

function ToDoCompleted() {
  const [data, setdata] = useContext(TodoContext1);
  const pendingdata=data.filter(item => item.status === 'completed');
  console.log(setdata)
  return (
    <div className="tileGrid">
    {pendingdata.map((demo) => (
      <div className="tile">
        <div className="leftstatusBar" style={{
          backgroundColor:"#047d53"
            }} >
          <p>{demo.status}</p>
        </div>
        <div className="mainCont">
          <div className="timeDate">
            <p className="date">{demo.date}</p>
            <p className="time">{demo.time}</p>
          </div>
          <div className="subdiv">
            <p>{demo.todo}</p>

            
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ToDoCompleted
