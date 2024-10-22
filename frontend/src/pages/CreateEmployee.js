import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/CreateEmployee.css'; 

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        image: null 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            course: prevState.course.includes(value)
                ? prevState.course.filter(course => course !== value)
                : [...prevState.course, value]
        }));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] }); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:5001/api/employees', {
                method: 'POST',
                body: data,
            });

            console.log('Response Status:', response.status);
            console.log('Response:', await response.text()); 

            if (response.ok) {
                navigate('/employees');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to create employee.');
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('An error occurred while creating the employee.');
        }
    };
    const handleClose = () => {
        navigate('/employees'); // This will navigate to the employee list page when closed
    };

    return (
        <div className="create-employee-container position-relative">
             <button className="btn-close position-absolute top-0 end-0 mt-3 me-3" onClick={handleClose}></button>
            <h2 className="text-center mb-4 custom-heading">Create Employee</h2>
            <form className="create-employee-form" onSubmit={handleSubmit}>
                <input className="form-input" name="name" placeholder="Name" onChange={handleChange} required />
                <input className="form-input" name="email" placeholder="Email" type="email" onChange={handleChange} required />
                <input className="form-input" name="mobileNo" placeholder="Mobile No" onChange={handleChange} required />
                <input className="form-input" name="designation" placeholder="Designation" onChange={handleChange} required />
                
                <div className="gender-group">
                    <span className="gender-label">Gender:</span>
                    <label className="gender-item">Male
                        <input className="form-radio" type="radio" name="gender" value="Male" onChange={handleChange} required />
                    </label>
                    <label className="gender-item">Female
                        <input className="form-radio" type="radio" name="gender" value="Female" onChange={handleChange} required />
                    </label>
                </div>
                
                <div className="course-group">
                <span className="course-label">Course:</span>
                <label className="course-item">CSE
                    <input className="form-checkbox" type="checkbox" value="Course 1" onChange={handleCourseChange} />
                </label>
                <label className="course-item">IT
                   <input className="form-checkbox" type="checkbox" value="Course 2" onChange={handleCourseChange} />
                </label>
                <label className="course-item">ECE
                    <input className="form-checkbox" type="checkbox" value="Course 3" onChange={handleCourseChange}/>
                </label>
                </div>
                
                <input className="form-file" type="file" name="image" onChange={handleFileChange} required />
                
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
