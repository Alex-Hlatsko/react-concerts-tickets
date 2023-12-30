import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navigation from '../components/Navigation/Navigation';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      console.log('Review added with ID: ', docRef.id);

      setFormData({ name: '', email: '', message: '' });
      setSuccessMessageVisible(true);

      setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding review: ', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="mt-8 max-w-md mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg">
        <h2 className="text-2xl mb-4">Contact Us</h2>
        <form onSubmit={handleFormSubmit} className="text-white">
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <label className="block mb-2">
            Message:
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-teal-500 text-white px-6 py-2 rounded transition-all duration-300 hover:bg-white hover:text-black"
          >
            Submit Review
          </button>
        </form>
      </div>
      {successMessageVisible && (
          <div className="bg-green-500 text-white p-3 rounded absolute bottom-4 left-4 right-4 text-center">
            Message successfully sent!
          </div>
        )}
    </>
  );
};

export default Contact;
