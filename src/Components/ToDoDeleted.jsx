import React, { useContext } from 'react'
import { TodoContext1 } from '../RouterToDo';
import restoreimg from '../assets/icons8-restore-25.png'
import bin from '../assets/icons8-trash-48.png'
import back from '../assets/icons8-back-50.png'

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function ToDoDeleted() {
  const navigate=useNavigate()
  const [data, setdata,user] = useContext(TodoContext1);
  const pendingdata = data.filter((item) => item.status === "deleted");

 
  const restoretodo=async(id)=>{
    const confirmrestore=window.confirm(" restoring to pending todo.")
    if(confirmrestore){

      try {
        const docreff=doc(db,"todoUser",user.uid,`todos${user.displayName}`,id)
        await updateDoc(docreff,{
          status:"pending"
        })
        const restoredarray=data.map((item)=>{
          if(item.id===id){
              return{...item,status:"pending"}
          }
          return item
    
        })
        setdata(restoredarray)
        
      } catch (error) {
        console.log("error in restoring todo ",error)
      }

   
    }
    

  }
  const handleBack=()=>{
    navigate("/")
  }
  return (
  
    
    <div>
      <div className="binheader">
      <button onClick={handleBack} style={{backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer"}}><img src={back} alt="" /></button>
        <h2>Recycle bin</h2> 
        <img src={bin} alt="" />
      </div>
      <div className="tileGrid loader">
      
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
                  : "black", 
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
    </div>
  );
}

export default ToDoDeleted;
