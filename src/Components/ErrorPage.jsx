import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center", height:"100vh", width:"100%"}}>
      <h1 style={{color:"red"}}>404 page not found go to home</h1>
     <Link to={"/"}>home</Link>
    </div>
  )
}

export default ErrorPage
