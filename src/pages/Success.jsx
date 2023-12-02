import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const concertId = queryParams.get('id');
  const ticketId = queryParams.get('ticketID');
  const firstName = queryParams.get('firstName');
  const lastName = queryParams.get('lastName');

  return (
    <div>
      <h2>Success! Your Ticket Details:</h2>
      <p>Concert ID: {concertId}</p>
      <p>Ticket ID: {ticketId}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
    </div>
  );
};

export default Success;