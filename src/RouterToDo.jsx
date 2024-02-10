import React, { createContext, useEffect, useState } from "react";
import ToDodata from "./ToDoData";
import HomeToDo from "./Components/HomeToDo";
import TodoPending from "./Components/TodoPending";
import ToDotiles from "./Components/ToDotiles";
import ToDoCompleted from "./Components/ToDoCompleted";
import ToDoDeleted from "./Components/ToDoDeleted";
import EditToDo from "./Components/EditToDo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./Firebase";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

const TodoContext1 = createContext();

function RouterToDo() {
  const [data, setdata] = useState(ToDodata);
  const [user, setUser] = useState(null); // State to track authenticated user
  console.log(user)


  const provider = new GoogleAuthProvider();
  const signInWithgoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result._tokenResponse);
        localStorage.setItem("todoUser",result._tokenResponse.email)
       
      })
      .catch(
        (error)=>{
            console.log("error in googgle authentication :",error)
        }
      );
  };

  return (
    <div style={{ backgroundColor: "#092635", padding: "0px 50px" }}>
     
     {user?( <TodoContext1.Provider value={[data, setdata, user]}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<></>} />
            <Route
              path="/"
              element={
                <>
                  <HomeToDo />
                  <TodoPending />
                </>
              }
            />
            <Route
              path="/pending"
              element={
                <>
                  <HomeToDo />
                  <TodoPending />
                </>
              }
            ></Route>
            <Route
              path="/all"
              element={
                <>
                  <HomeToDo /> <ToDotiles />
                </>
              }
            />
            <Route
              path="/completed"
              element={
                <>
                  <HomeToDo /> <ToDoCompleted />
                </>
              }
            />
            <Route
              path="/deleted"
              element={
                <>
                  <ToDoDeleted />
                </>
              }
            />
            <Route
              path="/edit/:todoid"
              element={
                <>
                  <EditToDo />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </TodoContext1.Provider>):(
        <div style={{height:"100vh", width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>

            <button onClick={signInWithgoogle}>Signinn with google</button>
        </div>
      )}
     
    </div>
  );
}

export default RouterToDo;
export { TodoContext1 };
