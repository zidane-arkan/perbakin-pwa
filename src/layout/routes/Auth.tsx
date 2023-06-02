import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../auth/Login';
// Penguji Routes
import Penguji from './Penguji';
// Admin Routes
import Admin from './Admin';
// Super Admin Routes
import SuperAdmin from './SuperAdmin';

const Auth = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/penguji/*' element={<Penguji />} />
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/superadmin/*' element={<SuperAdmin />} />
        </Routes>
    )
}

export default Auth