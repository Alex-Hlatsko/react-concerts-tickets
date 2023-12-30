import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navigation from '../components/Navigation/Navigation';

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = formData;

      const adminQuery = query(collection(db, 'admin'), where('username', '==', username));
      const adminDocs = await getDocs(adminQuery);

      if (adminDocs.empty) {
        setError('Invalid username or password');
        return;
      }

      const adminData = adminDocs.docs[0].data();

      if (adminData.password !== password) {
        setError('Invalid username or password');
        return;
      }

      navigate('/admin_panel');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="mt-8 max-w-md mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit} className="text-white">
          <label className="block mb-2">
            Username:
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border border-white bg-black bg-opacity-50 focus:outline-none focus:border-teal-500"
            />
          </label>
          <button
            type="submit"
            className="mt-6 bg-teal-500 text-white px-6 py-3 rounded transition-all duration-300 hover:bg-white hover:text-black"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Admin;
