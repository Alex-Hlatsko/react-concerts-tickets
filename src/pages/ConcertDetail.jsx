import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navigation from '../components/Navigation/Navigation';

const ConcertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Updated line
  const [concert, setConcert] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchConcertData = async () => {
      try {
        const concertDoc = await getDoc(doc(db, 'concerts', id));
        if (concertDoc.exists()) {
          setConcert({ id: concertDoc.id, ...concertDoc.data() });
        } else {
          console.error('Concert not found');
        }
      } catch (error) {
        console.error('Error fetching concert data:', error);
      }
    };

    fetchConcertData();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const availableTicketIndex = concert.tickets.findIndex(ticket => !ticket.purchased);

    if (availableTicketIndex !== -1) {
      const ticketToUpdate = concert.tickets[availableTicketIndex];
      const updatedTicket = {
        ...ticketToUpdate,
        purchased: true,
        first_name: formData.firstName,
        last_name: formData.lastName,
      };

      await updateDoc(doc(db, 'concerts', id), {
        tickets: [
          ...concert.tickets.slice(0, availableTicketIndex),
          updatedTicket,
          ...concert.tickets.slice(availableTicketIndex + 1),
        ],
      });

      setConcert((prevConcert) => ({
        ...prevConcert,
        tickets: [
          ...prevConcert.tickets.slice(0, availableTicketIndex),
          updatedTicket,
          ...prevConcert.tickets.slice(availableTicketIndex + 1),
        ],
      }));

      setFormData({ firstName: '', lastName: '' });

      // Redirect to /success with ticket information in URL parameters
      navigate(`/success?id=${id}&ticketID=${updatedTicket.ticketID}&firstName=${formData.firstName}&lastName=${formData.lastName}`);
    } else {
      console.error('No available tickets');
    }
  };

  if (!concert) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div className="mt-8 max-w-md mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg">
        <h2 className="text-2xl mb-2">{concert.title}</h2>
        <p className="text-gray-300 mb-4">{concert.sub_title}</p>
        <div className="text-gray-300 mb-4">
          <strong>Stars:</strong> {concert.stars.join(', ')}
        </div>
        <form onSubmit={handleFormSubmit} className="text-white">
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
            Order Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default ConcertDetail;
