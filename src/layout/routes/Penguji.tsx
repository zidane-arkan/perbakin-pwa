import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Detail from '../../components/overlay/Detail';
import Dashboard from '../penguji/Dashboard';


// Aturan
import Kualifikasi from '../penguji/aturan/Kualifikasi';
// Form
import KualifikasiForm from '../penguji/form/Kualifikasi';
// Ketentuan
import KualifikasiKetentuan from '../penguji/ketentuan/Kualifikasi';
// Konfirmasi
import KualifikasiKonfirmasi from '../penguji/konfirmasi/Kualifikasi';
const Penguji = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                {/* Route Kualifikasi */}
                <Route path='/kualifikasi_aturan' element={<Kualifikasi />} />
                <Route path='/kualifikasi_ketentuan' element={<KualifikasiKetentuan />} />
                <Route path='/kualifikasi_form' element={<KualifikasiForm />} />
                <Route path='/kualifikasi_konfirmasi' element={<KualifikasiKonfirmasi />} />
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

export default Penguji