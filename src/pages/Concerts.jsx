// Concerts.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase/firebase';

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
    </div>
  );
}

export default Concerts;
