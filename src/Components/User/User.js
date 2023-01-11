import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const User = () => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        phone: "",
    })
    const { id } = useParams();

    const loadUsers = async () => {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setuser(res.data);
        // console.log(response.data);
    }
    useEffect(() => {
        loadUsers();
    }, [])

    return (
        <>
            <div className='container py-5'>
            <div className='w-50 mx-auto shadow p-5' >
                <h1 className='display-5 text-center'>User id: {id}</h1>
                <ul className='list-group w-auto fw-bold'>
                    <li className='list-group-item'>Name: {user.name}</li>
                    <li className='list-group-item'>Email: {user.email}</li>
                    <li className='list-group-item'>Phone: {user.phone}</li>
                </ul>
                <Link className='btn btn-primary mt-3' to="/home"> <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Back</Link>
            </div>
            </div>
        </>
    )
}

export default User;