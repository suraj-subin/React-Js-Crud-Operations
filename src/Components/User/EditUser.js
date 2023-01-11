import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    //  console.log(id);
    const [edituser, setEdituser] = useState({
        name: "",
        email: "",
        phone: "",
    })

    const { name, email, phone } = edituser; // This is Object Destructuring.

    const handleChange = (e) => {
        setEdituser({ ...edituser, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/users/${id}`, edituser);
        navigate("/home")
    }
    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:5000/users/${id}`)
        setEdituser(result.data);
        console.log(result.data);

    }
    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <>
            <div className='container py-5'>
                <div className='w-50  mx-auto shadow p-5' >
                    <h2 className='text-center mb-4'>Add a User </h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control form-control-lg'
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
                        <button className='btn btn-warning mt-2'>Update User</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser;