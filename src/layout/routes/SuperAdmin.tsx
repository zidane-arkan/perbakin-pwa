import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SuperAdminRegist from '../auth/registrasi/SuperAdmin';
import UjianBaru from '../auth/registrasi/UjianBaru';
import AdminRegis from '../auth/registrasi/Admin';
// Tabs Route
import Dashboard from '../super-admin/Dashboard';
import SuperAdminTab from '../super-admin/tabs/SuperAdmin';
import Penembak from '../super-admin/tabs/Penembak';
import Penguji from '../super-admin/tabs/Penguji';

const SuperAdmin = () => {
    const userPenguji = [
        { id: '1', penguji: 'Penguji 1' },
        { id: '2', penguji: 'Penguji 2' },
        { id: '3', penguji: 'Penguji 3' },
        { id: '4', penguji: 'Penguji 4' },
    ];
    return (
        <>
            <Routes>
                <Route path='/' element={<SuperAdminRegist />} />
                <Route path='/ujianbaru' element={<UjianBaru />} />
                <Route path='/adminregis' element={<AdminRegis />} />
                <Route path='/tabs' element={<Dashboard />} >
                    <Route path='admindashboard' element={<SuperAdminTab />} />
                    <Route path='penembak' element={<Penembak />} />
                    <Route path='penguji' element={<Penguji userPenguji={userPenguji} />} />
                </Route>
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