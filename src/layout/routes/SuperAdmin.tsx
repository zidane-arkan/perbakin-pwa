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
// Tambah Route
import TambahPenembak from '../super-admin/tambah/Penembak';
import TambahPenguji from '../super-admin/tambah/Penguji';
// Edit Route
import EditProfile from '../super-admin/edit/Profile';
import EditUjian from '../super-admin/edit/Ujian';
import EditPenembak from '../super-admin/edit/Penembak';
// Route Hasil Ujian
import HasilUjian from '../super-admin/HasilUjian';
import DetailPenguji from '../pages/DetailPenguji';
import KelolaAdmin from '../super-admin/kelola/Admin';
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
                {/* <Route path='/' element={<SuperAdminRegist />} /> */}
                <Route path='/' element={<UjianBaru />} />
                <Route path='/adminregis' element={<AdminRegis />} />
                <Route path='/tabs' element={<Dashboard />} >
                    <Route path='admindashboard' element={<SuperAdminTab />} />
                    <Route path='penembak' element={<Penembak />} />
                    <Route path='penguji' element={<Penguji userPenguji={userPenguji} />} />
                </Route>
                {/* Route Tambah */}
                <Route path='tabs/admindashboard/tambahpenembak' element={<TambahPenembak />} />
                <Route path='tabs/admindashboard/tambahpenguji' element={<TambahPenguji />} />
                {/* Route Edit */}
                <Route path='tabs/admindashboard/editprofile' element={<EditProfile />} />
                <Route path='tabs/admindashboard/editujian' element={<EditUjian />} />
                <Route path='tabs/penembak/editpenembak' element={<EditPenembak />} />
                {/* Route Hasil Ujian */}
                <Route path='tabs/admindashboard/hasilujian' element={<HasilUjian />} />
                {/* Route Kelola */}
                <Route path='tabs/admindashboard/kelolaadmin' element={<KelolaAdmin />} />
                {/* Detail Penguji */}
                <Route path='tabs/penguji/detailpenguji/:id' element={<DetailPenguji />} />
                {/* Route Stage 4 */}
                {/* Route Stage 5 */}
                {/* Route Stage 6 */}
            </Routes>
        </>
    )
}

export default SuperAdmin