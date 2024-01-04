import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import './style.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center h-screen">
        <div className="heading">
          <h1 className=''>Rhythmic Revolution</h1>
          <p>More Than Music: A Concert Adventure Tailored to Enchant, Captivate, and Inspire</p>
          <Link to="/concerts">Let's go</Link>
        </div>
        <Link className='text-gray-600 mt-8' to="/admin">Admin Panel</Link>
      </div>
    </>
  )
}

export default Home