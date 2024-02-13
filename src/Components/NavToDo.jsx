import React from 'react'
import { NavLink } from "react-router-dom";
import "../Styles/NavToDo.css";
import trash from "../assets/icons8-trash-48.png"

function NavToDo() {
  return (
    <div className="navholder1">
      
    <div className="navleft">
      <NavLink activeClassName="activeLinkss" className="linkss" to="/pending">
        Pending
      </NavLink>
      <NavLink activeClassName="activeLinkss" className="linkss" to="/completed">
        Completed
      </NavLink>
      <NavLink activeClassName="activeLinkss" className="linkss" to="/all">
        All
      </NavLink>
    </div>

    <div className="navright">
      <NavLink activeClassName="activeLinkss" to="/deleted">
        <img height={35} className="bin" src={trash} alt="Trash" />
      </NavLink>
    </div>
      
  </div>
  )
}

export default NavToDo
