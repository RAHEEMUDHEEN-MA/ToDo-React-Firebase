import React, { useContext, useEffect, useState } from "react";
import { lastObjectId } from "../ToDoData";
import addicon from "../assets/icons8-add-40.png";
import { TodoContext1 } from "../RouterToDo";
import NavToDo from "./NavToDo";
import "../Styles/HomeToDo.css";

function HomeToDo() {
  // console.log("data from props: ",userdata)

  const [data, setdata, user] = useContext(TodoContext1);
  console.log("data from context: ", user);
  // const [userdata, setuserdata] = useState(user)
  const [atodo, setatodo] = useState("");

  const [adate, setadate] = useState();
  const [atime, setatime] = useState("");
  const [astatus, setastatus] = useState("");
  const [lastid, setLastId] = useState(lastObjectId);

  // const [userdata, setuserdata] = useState()
  // console.log(localStorage.getItem('todoUser'))

  useEffect(() => {
    const currentDate = new Date();

    const formattedDate = currentDate.toISOString().slice(0, 10);
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setadate(formattedDate);
    setatime(formattedTime);
    setastatus("pending");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newToDo = {
      id: lastid + 1,
      date: adate,
      time: atime,
      todo: atodo,
      status: astatus,
    };

    setdata([...data, newToDo]);
    setatodo("");
    setLastId((prevId) => prevId + 1);
    console.log("new todo", newToDo);
    console.log("added", data);
  };

  return (
    <div className="maindiv">
      <div className="headsection">
        <div title={user.displayName} className="proifle">
          <img src={user.photoUrl} alt="profile" />
          {/* <img
            src="https://lh3.googleusercontent.com/a/ACg8ocJGIydD0vRgB0_2VEkh5pP_fBwxlOkTU4dB0MdnSNTL9Dut=s96-c"
            alt=""
          /> */}
        </div>
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

      <form onSubmit={handleSubmit}>
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
