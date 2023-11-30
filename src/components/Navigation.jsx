import React from 'react'
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  return (
    <>
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/concerts">Concerts</NavLink>
        </li>
        <li>
          <NavLink to="/tickets">Tickets</NavLink>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Navigation