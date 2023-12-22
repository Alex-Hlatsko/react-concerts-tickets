import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Tickets = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ticketID: '', firstName: '', lastName: '', concertID: '' });
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { concertID, ticketID, firstName, lastName } = formData;

      // Получаем документ концерта
      const concertDoc = await getDoc(doc(db, 'concerts', concertID));

      if (!concertDoc.exists()) {
        setError('Concert not found');
        return;
      }

      // Получаем билет из концерта
      const ticket = concertDoc.data().tickets.find(t => t.ticketID === ticketID);

      if (!ticket) {
        setError('Ticket not found');
        return;
      }

      // Проверяем, что билет еще не был возвращен
      if (!ticket.purchased) {
        setError('This ticket has already been returned');
        return;
      }

      // Проверяем соответствие имени и фамилии
      if (ticket.first_name !== firstName || ticket.last_name !== lastName) {
        setError('Invalid name or last name for this ticket');
        return;
      }

      // Обновляем билет в концерте
      const updatedTickets = concertDoc.data().tickets.map(t =>
        t.ticketID === ticketID ? { ...t, purchased: false, first_name: '', last_name: '' } : t
      );

      await updateDoc(doc(db, 'concerts', concertID), { tickets: updatedTickets });

      // Перенаправляем пользователя
      navigate(`/ticket-return-success`);
    } catch (error) {
      console.error('Error returning ticket:', error);
    }
  };

  return (
    <div>
      <h2>Return Ticket</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Concert ID:
          <input
            type="text"
            value={formData.concertID}
            onChange={(e) => setFormData({ ...formData, concertID: e.target.value })}
          />
        </label>
        <br />
        <label>
          Ticket ID:
          <input
            type="text"
            value={formData.ticketID}
            onChange={(e) => setFormData({ ...formData, ticketID: e.target.value })}
          />
        </label>
        <br />
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
        <button type="submit">Return Ticket</button>
      </form>
    </div>
  );
};

export default Tickets;
