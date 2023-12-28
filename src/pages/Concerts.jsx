import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase';
import Concert from '../components/Concert/Concert'

import Navigation from '../components/Navigation/Navigation'

function Concerts() {
  const [todos, setTodos] = useState();

  const fetchPost = async () => {

    await getDocs(collection(db, "concerts"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setTodos(newData);
        console.log(newData);
      })
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h2 className="mb-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase">
          Concerts Page:
        </h2>
        {todos && todos.map((concert) => (
          <Concert key={concert.id} concert={concert} />
        ))}
      </div>
    </div>
  );
}

export default Concerts;
