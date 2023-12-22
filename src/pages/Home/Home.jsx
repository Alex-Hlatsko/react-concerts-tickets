import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import './style.css'

const Home = () => {
  return (
    <>
      <Navigation/>
      <div className="heading">
        <h1 className=''>Rhythmic Revolution</h1>
        <p>More Than Music: A Concert Adventure Tailored to Enchant, Captivate, and Inspire</p>
        <a href="/concerts">Let's go</a>
      </div>
    </>
  )
}

export default Home