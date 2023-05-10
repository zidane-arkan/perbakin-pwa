import React from 'react'
import { BgHeader } from '../../components/Header'
import avatar from '../../app-assets/avatar.png';
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../admin/Dashboard'
import DashboardAdmin from '../admin/tabs/Admin'
import Penguji from '../admin/tabs/Penguji'
import Penembak from '../admin/tabs/Penembak'
import TambahPenembak from '../admin/tambah/Penembak'
import TambahPenguji from '../admin/tambah/Penguji'

import HasilUjian from '../admin/HasilUjian'
const Admin = () => {
    return (
        <>
            <BgHeader>
                <div className='flex items-center justify-between w-full'>
                    <section className='flex flex-col items-start'>
                        <h2>Halo, Admin</h2>
                    </section>
                    <section>
                        <button>
                            <img src={avatar} />
                        </button>
                    </section>
                </div>
            </BgHeader>
            <Routes>
                <Route path='/' element={<Dashboard />} >
                    <Route path='admindashboard' element={<DashboardAdmin />} />
                    <Route path='penembak' element={<Penembak />} />
                    <Route path='penguji' element={<Penguji />} />
                </Route>
                <Route path='admindashboard/tambahpenembak' element={<TambahPenembak />} />
                <Route path='hasilujian' element={<HasilUjian />} />
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

export default Admin