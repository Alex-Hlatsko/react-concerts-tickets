import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css'

const Concert = ({ concert }) => {
  // Calculate the total number of tickets
  const totalTickets = concert.tickets.length;

  // Calculate the number of available (not purchased) tickets
  const availableTickets = concert.tickets.filter(ticket => !ticket.purchased).length;


  return (
    <Link
      to={`/concert/${concert.id}`}
      className="block mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg transition-all duration-300 transform hover:bg-teal-500 hover:text-black hover:scale-105"
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">
        {concert.title}
      </h3>
      <p className="text-gray-700 mb-4">{concert.sub_title}</p>
      <div>
        <strong className="text-gray-600">Stars:</strong>{" "}
        {concert.stars.map((star, index) => (
          <span key={index}>{star}{index !== concert.stars.length - 1 && ', '}</span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-800 hover:text-gray-900 transition-colors">
          <strong>Total Tickets:</strong> {totalTickets}
        </div>
        <div className="text-lg hover:text-teal-500 transition-colors">
          <strong>Available Tickets:</strong> {availableTickets}
        </div>
      </div>
    </Link>


  )
}

export default Concert