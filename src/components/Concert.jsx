import React from 'react'
import { Link } from 'react-router-dom';


const Concert = ({ concert }) => {
 // Calculate the total number of tickets
 const totalTickets = concert.tickets.length;

 // Calculate the number of available (not purchased) tickets
 const availableTickets = concert.tickets.filter(ticket => !ticket.purchased).length;


  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <Link to={`/concert/${concert.id}`}>
        <h3>{concert.title}</h3>
      </Link>
      <p>{concert.sub_title}</p>
      <div>
        <strong>Stars:</strong> {concert.stars.map((star, index) => <span key={index}>{star}{index !== concert.stars.length - 1 && ', '}</span>)}
      </div>
      <div>
        <strong>Tickets:</strong>
        <ul>
          <li>Total Tickets: {totalTickets}</li>
          <li>Available Tickets: {availableTickets}</li>
        </ul>
      </div>
    </div>
  )
}

export default Concert