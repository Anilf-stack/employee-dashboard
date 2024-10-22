import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {
    const { user } = useContext(UserContext); // Fetching the logged-in user's data from context

    return (
        <div className="dashboard-container p-4">
            {/* Welcome message */}
            <div className="welcome-message mb-4 d-flex align-items-center">
            <i className="bi bi-person-circle me-2 fs-1"></i>
                <div>
                    <h2>Welcome, {user?.username || 'User'}!</h2>
                    <p>We're glad to see you here.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Profile Overview</h5>
                            <p className="card-text">You have 3 pending tasks.</p>
                            <button className="btn btn-light">Manage Account</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Recent Activity</h5>
                            <p className="card-text">No new notifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
