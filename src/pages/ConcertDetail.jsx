import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
    <div>
      <h2>{concert.title}</h2>
      <p>{concert.sub_title}</p>
      <div>
        <strong>Stars:</strong> {concert.stars.join(', ')}
      </div>
      <div>
        <strong>Tickets:</strong>
        <ul>
          {concert.tickets.map((ticket, index) => (
            <li key={index}>
              Ticket ID: {ticket.ticketID}, Purchased: {ticket.purchased ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Order Ticket</button>
      </form>
    </div>
  );
};

export default ConcertDetail;
