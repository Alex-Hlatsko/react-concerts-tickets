import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ConcertDetail = () => {
  const { id } = useParams();
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

    // Find an available (not purchased) ticket
    const availableTicketIndex = concert.tickets.findIndex(ticket => !ticket.purchased);

    if (availableTicketIndex !== -1) {
      // Update the ticket in the database
      const ticketToUpdate = concert.tickets[availableTicketIndex];
      const updatedTicket = {
        ...ticketToUpdate,
        purchased: true,
        first_name: formData.firstName,
        last_name: formData.lastName,
      };

      // Update the ticket in the database
      await updateDoc(doc(db, 'concerts', id), {
        tickets: [
          ...concert.tickets.slice(0, availableTicketIndex),
          updatedTicket,
          ...concert.tickets.slice(availableTicketIndex + 1),
        ],
      });

      // Refresh the concert data to reflect the changes
      setConcert((prevConcert) => ({
        ...prevConcert,
        tickets: [
          ...prevConcert.tickets.slice(0, availableTicketIndex),
          updatedTicket,
          ...prevConcert.tickets.slice(availableTicketIndex + 1),
        ],
      }));

      // Clear the form data
      setFormData({ firstName: '', lastName: '' });
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
