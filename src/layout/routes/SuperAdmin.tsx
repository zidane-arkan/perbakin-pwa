import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SuperAdminRegist from '../auth/registrasi/SuperAdmin';
import UjianBaru from '../auth/registrasi/UjianBaru';
import AdminRegis from '../auth/registrasi/Admin';
const SuperAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<SuperAdminRegist />} />
                <Route path='/ujianbaru' element={<UjianBaru />} />
                <Route path='/adminregis' element={<AdminRegis />} />
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