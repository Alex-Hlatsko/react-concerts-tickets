import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navigation from '../components/Navigation/Navigation';

const Tickets = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ticketID: '', firstName: '', lastName: '', concertID: '' });
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { concertID, ticketID, firstName, lastName } = formData;

      const concertDoc = await getDoc(doc(db, 'concerts', concertID));

      if (!concertDoc.exists()) {
        setError('Concert not found');
        return;
      }

      const ticket = concertDoc.data().tickets.find(t => t.ticketID === ticketID);

      if (!ticket) {
        setError('Ticket not found');
        return;
      }

      if (!ticket.purchased) {
        setError('This ticket has already been returned');
        return;
      }

      if (ticket.first_name !== firstName || ticket.last_name !== lastName) {
        setError('Invalid name or last name for this ticket');
        return;
      }

      const updatedTickets = concertDoc.data().tickets.map(t =>
        t.ticketID === ticketID ? { ...t, purchased: false, first_name: '', last_name: '' } : t
      );

      await updateDoc(doc(db, 'concerts', concertID), { tickets: updatedTickets });

      navigate(`/ticket-return-success`);
    } catch (error) {
      console.error('Error returning ticket:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="mt-8 max-w-md mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg">
        <h2 className="text-2xl mb-4">Return Ticket</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit} className="text-white">
          <label className="block mb-2">
            Concert ID:
            <input
              type="text"
              value={formData.concertID}
              onChange={(e) => setFormData({ ...formData, concertID: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <label className="block mb-2">
            Ticket ID:
            <input
              type="text"
              value={formData.ticketID}
              onChange={(e) => setFormData({ ...formData, ticketID: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <button
            type="submit"
            className="mt-6 bg-teal-500 text-white px-6 py-3 rounded transition-all duration-300 hover:bg-white hover:text-black"
          >
            Return Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default Tickets;
