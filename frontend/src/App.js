import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; 
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './pages/EmployeeList';
import Home from './pages/Home';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';

const App = () => {
    return (
        <UserProvider> 
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/create-employee" element={<CreateEmployee />} />
                    <Route path="/edit-employee/:id" element={<EditEmployee />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;

