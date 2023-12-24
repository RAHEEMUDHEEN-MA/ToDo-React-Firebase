import React, { createContext, useState } from 'react'
// import "./Styles/HomeToDo.css"
import ToDodata from "./ToDoData";
import HomeToDo from './Components/HomeToDo';
import TodoPending from './Components/TodoPending';
import ToDotiles from './Components/ToDotiles';
import ToDoCompleted from './Components/ToDoCompleted';
import ToDoDeleted from './Components/ToDoDeleted';
import EditToDo from './Components/EditToDo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const TodoContext1=createContext();

function RouterToDo() {
    const [data, setdata] = useState(ToDodata);

    return (
      <div style={{backgroundColor:"#092635", padding:"0px 50px"}}>
        <TodoContext1.Provider value={[data,setdata]}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<><HomeToDo/><TodoPending/></>}/>
                    <Route path='/pending' element={<><HomeToDo/><TodoPending/></>}></Route>
                    <Route  path="/all" element={<><HomeToDo/> <ToDotiles/></>} />
                    <Route  path="/completed" element={<><HomeToDo/> <ToDoCompleted/></>} />
                    <Route  path="/deleted" element={<> <ToDoDeleted/></>} />
                    <Route  path="/edit/:todoid" element={<> <EditToDo/></>} />
                </Routes>
            </BrowserRouter>

        </TodoContext1.Provider>
      </div>
    );
}

export default RouterToDo
export {TodoContext1}
