import React, { useContext, useEffect, useState } from "react";
import addicon from "../assets/icons8-add-40.png";
import { TodoContext1 } from "../RouterToDo";
import NavToDo from "./NavToDo";
import "../Styles/HomeToDo.css";
import { db } from "../Firebase";
import { collection, addDoc,  } from "firebase/firestore";

function HomeToDo() {
  const [data, setdata, user] = useContext(TodoContext1);
  const [atodo, setatodo] = useState("");
  const [adate, setadate] = useState();
  const [atime, setatime] = useState("");
  const [showprofile, setshowprofile] = useState(false);
  useEffect(() => {
    const currentDate = new Date();

    const formattedDate = currentDate.toISOString().slice(0, 10);
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setadate(formattedDate);
    setatime(formattedTime);
    // setastatus("pending");
  }, [atodo]);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const todoCollectionRef = collection(db, "todoUser", user.email, "todos");
  
      await addDoc(todoCollectionRef, {
        date: adate,
        time: atime,
        todo: atodo,
        status: "pending",
      });
      console.log("Document written with ID: ", todoCollectionRef.id);
      setatodo("");
      const newTodoItem = {
        id: todoCollectionRef.id,
        date: adate,
        time: atime,
        todo: atodo,
        status: "pending",
      };
      setdata([...data, newTodoItem]);

      // Clear the input field after adding todo
      setatodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error in adding todo");
    }
  };

  const handleLogout=()=>{
    // history(-10)
    window.location.reload()
    localStorage.setItem("todoUser",null)
  }

  const showProfile = () => {
    setshowprofile(!showprofile)
  };
  const storedData = JSON.parse(localStorage.getItem("todoUser")); 
  console.log("googleData",storedData)

  ///////////////////////////////////

  return (
    <div className="maindiv">
      <div className="headsection">
        <div title={user.displayName} className="proifle">
          <img onClick={showProfile} src={user&&user.photoURL} alt="profile" />
        </div>
        {showprofile?(  <div className="profileTile">
          <div>
            <h5>{user.displayName}</h5>
            <p>{user.email}</p>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>):(<></>)}
      
        <div className="profile-details">
          <p>RAHEEMUDHEEN</p>
          <button>Logout</button>
        </div>

        <img
          height={60}
          src="https://cdn-icons-png.flaticon.com/512/8832/8832108.png"
          alt=""
        />

        <h1 className="heading">ToDo..</h1>
      </div>

      <form onSubmit={addTodo}>
        <input
          onChange={(event) => setatodo(event.target.value)}
          type="text"
          placeholder="ToDo.."
          value={atodo}
        />
        <button id="addimg" type="submit">
          <img height={30} src={addicon} alt="" />
        </button>
      </form>

      <span id="lineh"></span>

      <NavToDo />
    </div>
  );
}

export default HomeToDo;
// zjhjbd
