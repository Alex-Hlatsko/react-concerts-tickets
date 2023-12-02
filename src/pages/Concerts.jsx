// Concerts.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase/firebase';
import Concert from '../components/Concert'

function Concerts() {
  const [todos, setTodos] = useState();
 
    const fetchPost = async () => {
       
        await getDocs(collection(db, "concerts"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData);                
                console.log(newData);
            })  
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])

  return (
    <div>
      <h2>Concerts Page</h2>
      <h2>Concerts Page</h2>
      {todos && todos.map((concert) => (
        <Concert key={concert.id} concert={concert} />
      ))}
    </div>
  );
}

export default Concerts;
