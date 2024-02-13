import "../Styles/ToDoDrid.css";
import React, { useContext, useEffect } from "react";
import { TodoContext1 } from "../RouterToDo";
import { Link } from "react-router-dom";
import completedImage from "../assets/icons8-checkmark-25.png";
import editimg from "../assets/icons8-edit-25 (1).png";
import dltimg from "../assets/icons8-delete-25 (2).png";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";


function TodoPending() {
  const [data, setdata, user] = useContext(TodoContext1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todoCollectionRef = collection(
          db,
          "todoUser",
          user.email,
          "todos"
        );
        const snapshot = await getDocs(todoCollectionRef);
        const todoList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setdata(todoList);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, [user.email, setdata]);

  // const deleteToDo = (id) => {
  //   const confirmation = window.confirm("deleting task!");
  //   if (confirmation) {
  //     const deletedarray = data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, status: "deleted" };
  //       }
  //       return item;
  //     });
  //     setdata(deletedarray);
  //     console.log("final", data);
  //   }
  // };

  const deleteToDo = async (id) => {
    const confirmation = window.confirm("deleting task!");
    if (confirmation) {
      try {
        console.log("iddddddddddddddddddd", id);
        const todoDocReff = doc(db, "todoUser", user.email, "todos", id);
        await updateDoc(todoDocReff, {
          status: "deleted"
        });
        console.log("Todo is Deleted!");

        setdata((prevData) => {
          return prevData.map((item) => {
            if (item.id === id) {
              return { ...item, status: "deleted" };
            } else {
              return item;
            }
          });
        });
      } catch (error) {
        console.log("Error in deleting todo :", error);
      }
    }
  };

  const done = async (id) => {
    try {
      const todoDocRef = doc(db, "todoUser", user.email, "todos", id);
      await updateDoc(todoDocRef, {
        status: "completed"
      });
      console.log("Todo item marked as completed.");

      // Optimistic update: Mark the todo item as completed in the local state immediately
      setdata((prevData) => {
        return prevData.map((item) => {
          if (item.id === id) {
            return { ...item, status: "completed" };
          } else {
            return item;
          }
        });
      });
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      alert("Error marking todo as completed");
    }
  };

  return (
    <div className="tileGrid loader">
      {data &&
        data.map(
          (todo) =>
            todo.status === "pending" && (
              <div className="tile" key={todo.id}>
                <div
                  className="leftstatusBar"
                  style={{ backgroundColor: "#04567D" }}
                >
                  <p>{todo.status}</p>
                </div>
                <div className="mainCont">
                  <div className="timeDate">
                    <p className="date">{todo.date}</p>
                    <p className="time">{todo.time}</p>
                  </div>
                  <div className="subdiv">
                    <p>{todo.todo}</p>

                    <div className="options">
                      <div className="leftoption">
                        <button onClick={() => done(todo.id)}>
                          <img
                            id="MADBtn"
                            height={19}
                            src={completedImage}
                            alt=""
                          />
                        </button>
                        <Link style={{ padding: "0" }} to={`/edit/${todo.id}`}>
                          <button>
                            <img
                              id="EDITBtn"
                              height={19}
                              src={editimg}
                              alt=""
                            />
                          </button>
                        </Link>
                      </div>
                      <div className="rightoption">
                        <button onClick={() => deleteToDo(todo.id)}>
                          <img id="DLTBtn" height={17} src={dltimg} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
}

export default TodoPending;
