import React from 'react'
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

const SuccessReturn = () => {
    return (
        <>
            <Navigation />
            <div className="mt-8 max-w-md mx-auto bg-black bg-opacity-75 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-white border rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Ticket Successfully Returned</h2>
                <Link to="/concerts" className="bg-teal-500 text-white px-6 py-3 rounded inline-block">
                    Back to Concerts
                </Link>
            </div>
        </>
    )
}

export default SuccessReturn