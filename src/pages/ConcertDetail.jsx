import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ConcertDetail = () => {
  const { id } = useParams(); // Получаем параметр id из URL
  const [concert, setConcert] = useState(null);

  useEffect(() => {
    const fetchConcertData = async () => {
      try {
        const concertDoc = await getDoc(doc(db, 'concerts', id)); // Запрашиваем концерт по id
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
  }, [id]); // Запускаем эффект при изменении id

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
    </div>
  );
};

export default ConcertDetail;
