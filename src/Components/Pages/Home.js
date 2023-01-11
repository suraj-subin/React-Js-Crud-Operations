import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);

    const loadUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setInfo(response.data);
            // console.log(response.data);

        } catch (error) {

        }
    }

    useEffect(() => {
        loadUsers();
    }, [])

    const deleteUser = async (id) => {
        if (window.confirm('Do you want to remove?')) {
            await axios.delete(`http://localhost:5000/users/${id}`);
            loadUsers();
        }
    }
    const userLogout = (e) => {
        e.preventDefault();
        //  localStorage.removeItem("user_login");
        navigate('/')
    }

    return (
        <>
            <h1 style={{ textAlign: "center", paddingTop: '40px' }}>React Js CRUD Operations.</h1>
            <div className='container'>
                <div className='card'>
                    <div className='card-title'>
                        {/* <h2>Employee Listing</h2> */}
                    </div>
                    <div className='card-body'>
                        <div className='Addbtn' >
                            <Link to="/user/add" className='btn btn-success fw-bold'><i className="fa fa-plus" aria-hidden="true"></i> Add User</Link>
                        </div>
                        <div className='LogOutbtn'>
                            <Link onClick={userLogout} className='btn btn-info text-white fw-bold'><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</Link>
                        </div>
                        <table className='table table-bordered'>
                            <thead className='bg-dark text-white'>
                                <tr>
                                    <td className="h6">Id</td>
                                    <td className="h6">FullName</td>
                                    <td className="h6">Email</td>
                                    <td className="h6">Phone Number</td>
                                    <td className="h6">Operation Perform</td>
                                </tr>
                            </thead>
                            <tbody>
                                {info.map((user, index) => (
                                    <tr key={user.id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Link className='btn btn-primary ms-2 fw-bold' to={`/user/${user.id}`}><i className="fa fa-eye" aria-hidden="true"></i> View</Link>
                                            <Link className='btn btn-secondary ms-2 fw-bold' to={`/user/edit/${user.id}`}><i className="fa fa-pencil-square" aria-hidden="true"></i> Edit</Link>
                                            <Link className='btn btn-danger ms-2 fw-bold' onClick={() => deleteUser(user.id)}><i className="fa fa-trash" aria-hidden="true"></i> Remove</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;