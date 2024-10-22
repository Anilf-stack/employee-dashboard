// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar'; 
import Dashboard from '../components/Dashboard';
import '../components/home.css'; 


const Home = () => {
    return (
        <div className="container-fluid">
        <div className="row">
            {/* Navbar */}
            <div className="col-12">
                <Navbar />
            </div>

            {/* Main Content: Dashboard */}
            <div className="col-12">
                <div className="dashboard-container mt-4">
                    <Dashboard />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Home;
