import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Detail from '../../components/overlay/Detail';
import Dashboard from '../penguji/Dashboard';
import Login from '../auth/Login';
import SuperAdminRegist from '../auth/registrasi/SuperAdmin';
const SuperAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<SuperAdminRegist />} />
                {/* Route Kualifikasi */}
                {/* Route Stage 1 */}
                {/* Route Stage 2 */}
                {/* Route Stage 3 */}
                {/* Route Stage 4 */}
                {/* Route Stage 5 */}
                {/* Route Stage 6 */}
            </Routes>
        </>
    )
}

export default SuperAdmin