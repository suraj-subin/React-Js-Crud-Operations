import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Pages/Home';
import AddUser from './Components/User/AddUser';
import EditUser from './Components/User/EditUser';
import User from './Components/User/User';
import LoginForm from './Components/Login/LoginForm';
import NotFound from './Components/Pages/NotFound';

function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<LoginForm/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path='/user/edit/:id' element={<EditUser />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
