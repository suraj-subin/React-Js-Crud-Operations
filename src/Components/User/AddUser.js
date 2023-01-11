import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate()
    const [adduser, setAdduser] = useState({
        name: "",
        email: "",
        phone: "",
    })

    const { name, email, phone } = adduser; // This is Object Destructuring.

    const handleChange = (e) => {
        setAdduser({ ...adduser, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
         await axios.post("http://localhost:5000/users", adduser)
        navigate("/home")
    }
    return (
        <>
            <div className='container py-5' >
                <div className='w-50 mx-auto shadow p-5' >
                    <h2 className='text-center mb-4'>Add a User </h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control form-control-lg '
                                placeholder='Enter your Name'
                                name='name'
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-group mt-2'>
                            <input type="email"
                                className='form-control form-control-lg'
                                placeholder='Enter your email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control form-control-lg'
                                placeholder='Enter your phone number'
                                name='phone'
                                value={phone}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='btn btn-primary mt-2'>Add User</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser;