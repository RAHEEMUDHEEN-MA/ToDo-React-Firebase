import React, { createContext, useState } from "react";
// import ToDodata from "./ToDoData";
import "./Styles/Signinpage.css";
import HomeToDo from "./Components/HomeToDo";
import TodoPending from "./Components/TodoPending";
import ToDotiles from "./Components/ToDotiles";
import ToDoCompleted from "./Components/ToDoCompleted";
import ToDoDeleted from "./Components/ToDoDeleted";
import EditToDo from "./Components/EditToDo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const TodoContext1 = createContext();

function RouterToDo() {
  const storedData = JSON.parse(localStorage.getItem("todoUser"));
  const [data, setdata] = useState(null);
  const [user, setUser] = useState(storedData);

  const provider = new GoogleAuthProvider();
  const signInWithgoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        
        setUser(result.user);
        console.log(result)
        const googleData = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
     
        localStorage.setItem("todoUser", JSON.stringify(googleData)); // stringify the object before storing
      })
      .catch((error) => {
        console.log("error in googgle authentication :", error);
      });
  };

  return (
    <div style={{ backgroundColor: "#092635", padding: "0px 50px" }}>
      {user ? (
        <TodoContext1.Provider value={[data, setdata, user]}>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/signup" element={<></>} /> */}
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
        </TodoContext1.Provider>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width:"100%",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <div
              className="signinmaincontainer"
              style={{
                display: "flex",
                backgroundColor: "",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                id="tickimg"
                height={120}
                src="https://cdn-icons-png.flaticon.com/512/8832/8832108.png"
                alt=""
              />

              <h1
                className="headingH1"
                style={{ color: "white", fontSize: "70px" }}
              >
                ToDo <span className="dot1">.</span>{" "}
                <span className="dot2">.</span>
                <span className="dot3">.</span>
              </h1>
            </div>
            <div
              className="siginContainer"
              style={{
                display: "flex",
              }}
            >
              {" "}
              <button
                className="singInBTN"
                style={{
                  display: "flex",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0a70e6",
                  border: "none",
                  color: "white",
                }}
                onClick={signInWithgoogle}
              >
                <img
                  className="googleICON"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                  style={{
                    backgroundColor: "white",
                    margin: "2px",
                    padding: "10px",
                    borderRadius: "2px",
                  }}
                  alt=""
                  height={25}
                />
                <div style={{ padding: "5px", fontWeight: "500" }}>
                  Sign in with google
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RouterToDo;
export { TodoContext1 };
