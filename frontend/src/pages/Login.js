import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../components/login.css'; 

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState(''); // For handling server-side error
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(''); 

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token); 
                setUser(result.user);
                alert('Login successful! Redirecting to homepage...');
                navigate('/home');
            } else {
                setServerError(result.message || 'Invalid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setServerError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container"> 
            <div className="custom-login-container">
                <h2 className="custom-login-title">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            className="form-control custom-input-field"
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register('username', {
                                required: 'Username is required',
                            })}
                        />
                        {errors.username && <p className="text-danger">{errors.username.message}</p>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            className="form-control custom-input-field"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                        />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </div>

                    {serverError && <p className="text-danger">{serverError}</p>} {/* Display server error message */}

                    <button
                        className={`btn custom-login-btn ${loading ? 'disabled' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

