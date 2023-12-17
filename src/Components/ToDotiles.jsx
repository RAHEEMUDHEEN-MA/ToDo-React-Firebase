import React, { useContext } from 'react'
import { TodoContext1 } from '../RouterToDo'
import "../Styles/ToDoDrid.css"

function ToDotiles() {
  const [data,setdata]=useContext(TodoContext1)
  console.log(setdata)
  const alldata=data.filter((item)=>item.status=='pending' ||item.status=='completed')




  return (
    <div className="tileGrid">
    {alldata.map((demo) => (
      <div className="tile" key={demo.id}>
        <div className="leftstatusBar" style={{
              backgroundColor:
                demo.status === 'completed'
                  ? '#047d53'
                  : demo.status === 'pending'
                  ? '#04567D'
                  : demo.status === 'deleted'
                  ? '#8a1212'
                  : 'black',
            }}>
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

export default ToDotiles
