import React from 'react';
import {
    Link
} from "react-router-dom";
import './home.css';

function Home() {
    return (
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 navigation p-4'>
                <div className='d-flex flex-row justify-content-center text-center align-items-center'>
                    <Link to="/" className='navItem fw-bold mx-1 p-2'>Home</Link>
                    <Link to="/students" className='navItem fw-bold mx-1 p-2'>Students Archive</Link>
                    <Link to="/teachers" className='navItem fw-bold mx-1 p-2'>Teachers Archive</Link>
                </div>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                <em className='d-flex justify-content-center align-items-center fw-bold fs-italic crud'>CRUD</em>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 link p-4'>
                <div className='d-flex flex-row text-center'>
                    <a href='https://cloud.mongodb.com/v2' className='navItem fw-bold p-2'>Go to MongoDB</a>
                </div>
            </div>
        </div>
    )
}

export default Home