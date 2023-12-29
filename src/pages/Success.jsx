import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import Navigation from '../components/Navigation/Navigation';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const concertId = queryParams.get('id');
  const ticketId = queryParams.get('ticketID');
  const firstName = queryParams.get('firstName');
  const lastName = queryParams.get('lastName');

  useEffect(() => {
    const pdf = new jsPDF();

    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');

    pdf.setTextColor(255, 255, 255);

    pdf.setFont("helvetica");
    pdf.setFontSize(24);

    pdf.text('Ticket Details', 20, 20);
    pdf.text(`Concert ID: ${concertId}`, 20, 40);
    pdf.text(`Ticket ID: ${ticketId}`, 20, 60);
    pdf.text(`First Name: ${firstName}`, 20, 80);
    pdf.text(`Last Name: ${lastName}`, 20, 100);

    pdf.save('ticket_details.pdf');
  }, [concertId, ticketId, firstName, lastName]);

  return (
    <>
      <Navigation />
      <div className="mt-8 max-w-md mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg">
        <h2 className="text-2xl mb-4">Success! Your Ticket Details:</h2>
        <p>Concert ID: {concertId}</p>
        <p>Ticket ID: {ticketId}</p>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <Link to="/concerts" className="mt-6 bg-teal-500 text-white px-6 py-3 rounded mt-4 inline-block">
          Back to Concerts
        </Link>
      </div>
    </>
  );
};

export default Success;
