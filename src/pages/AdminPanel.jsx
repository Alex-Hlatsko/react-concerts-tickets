import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Navigation from '../components/Navigation/Navigation';

const AdminPanel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsQuery = collection(db, 'reviews');
      const reviewsSnapshot = await getDocs(reviewsQuery);

      const reviewsData = [];
      reviewsSnapshot.forEach((doc) => {
        const { email, message, name, timestamp } = doc.data();
        reviewsData.push({ email, message, name, timestamp });
      });

      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  return (
    <>
      <Navigation />
      <div className="mt-8  mx-auto  text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h2 className="text-2xl mb-4">Admin Panel</h2>

        <div className="mt-6">
          <h3 className="text-xl mb-2">Reviews</h3>
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> {review.email}
                </p>
                <p>
                  <strong>Name:</strong> {review.name}
                </p>
                <p>
                  <strong>Date:</strong> {review.timestamp.toDate().toLocaleString()}
                </p>
                <p>
                  <strong>Message:</strong> {review.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
