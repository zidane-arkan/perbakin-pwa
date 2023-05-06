import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../penguji/Dashboard';
// Aturan
import Kualifikasi from '../penguji/aturan/Kualifikasi';
// Form
import KualifikasiForm from '../penguji/form/Kualifikasi';
// Ketentuan
import KualifikasiKetentuan from '../penguji/ketentuan/Kualifikasi';
// Konfirmasi
const Penguji = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/kualifikasi_ketentuan' element={<KualifikasiKetentuan />} />
                <Route path='/kualifikasi_aturan' element={<Kualifikasi />} />
                <Route path='/kualifikasi_form' element={<KualifikasiForm />} />
            </Routes>
        </>
    )
}

export default Penguji