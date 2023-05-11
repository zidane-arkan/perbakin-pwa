import React from 'react'
import { BgHeader } from '../../components/Header'
import avatar from '../../app-assets/avatar.png';
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../admin/Dashboard'
import DashboardAdmin from '../admin/tabs/Admin'
import Penguji from '../admin/tabs/Penguji'
import Penembak from '../admin/tabs/Penembak'
// Tambah
import TambahPenembak from '../admin/tambah/Penembak'
import TambahPenguji from '../admin/tambah/Penguji'
// Edit
import TentangUjian from '../admin/edit/Ujian';
import Profile from '../admin/edit/Profile';
// Detail
import DetailPenguji from '../pages/DetailPenguji';
import HasilUjian from '../admin/HasilUjian'
const Admin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} >
                    <Route path='admindashboard' element={<DashboardAdmin />} />
                    <Route path='penembak' element={<Penembak />} />
                    <Route path='penguji' element={<Penguji />} />
                </Route>
                {/* Route Tambah */}
                <Route path='admindashboard/tambahpenembak' element={<TambahPenembak />} />
                <Route path='admindashboard/tambahpenguji' element={<TambahPenguji />} />
                {/* Route Edit */}
                <Route path='admindashboard/editujian' element={<TentangUjian />} />
                <Route path='admindashboard/editprofile' element={<Profile />} />
                {/* Route Hasil Ujian */}
                <Route path='admindashboard/hasilujian' element={<HasilUjian />} />
                {/* Route Detail Penguji */}
                <Route path='penguji/admindashboard/detailpenguji' element={<DetailPenguji />} />
                {/* Route Stage 4 */}
                {/* Route Stage 5 */}
                {/* Route Stage 6 */}
            </Routes>
        </>
    )
}

export default Admin