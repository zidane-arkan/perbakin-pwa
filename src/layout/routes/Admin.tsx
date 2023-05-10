import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardAdmin from '../admin/tabs/Dashboard'
import Penguji from '../admin/tabs/Penguji'
import Penembak from '../admin/tabs/Penembak'

import HasilUjian from '../admin/HasilUjian'
import { Layout, LayoutChild } from '../../components/Layout'
import { BgHeader } from '../../components/Header'
const Admin = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<DashboardAdmin />} >
                    <Route path='penembak' element={<Penembak />} />
                    <Route path='penguji' element={<Penguji />} />
                </Route>
                <Route path='/hasilujian' element={<HasilUjian />} />
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