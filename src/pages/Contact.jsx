import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Добавляем отзыв в коллекцию "reviews"
      const docRef = await addDoc(collection(db, 'reviews'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      console.log('Review added with ID: ', docRef.id);

      // Очищаем форму после успешного добавления
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error adding review: ', error);
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Contact;
