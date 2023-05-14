import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../penguji/Dashboard';
import KetentuanUmum from '../pages/KetentuanUmum';
// Ketentuan
import KualifikasiKetentuan from '../penguji/ketentuan/Kualifikasi';
// Aturan
import Kualifikasi from '../penguji/aturan/Kualifikasi';
import Stage1 from '../penguji/aturan/Stage1';
import Stage2 from '../penguji/aturan/Stage2';
import Stage3 from '../penguji/aturan/Stage3';
import Stage4 from '../penguji/aturan/Stage4';
import Stage5 from '../penguji/aturan/Stage5';
import Stage6 from '../penguji/aturan/Stage6';
// Form
import KualifikasiForm from '../penguji/form/Kualifikasi';
import Stage1Form from '../penguji/form/Stage1';
import Stage2Form from '../penguji/form/Stage2';
import Stage3Form from '../penguji/form/Stage3';
import Stage4Form from '../penguji/form/Stage4';
import Stage5Form from '../penguji/form/Stage5';
import Stage6Form from '../penguji/form/Stage6';
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
                {/* Route Stages Aturan */}
                <Route path='/stage1_aturan' element={<Stage1 />} />
                <Route path='/stage2_aturan' element={<Stage2 />} />
                <Route path='/stage3_aturan' element={<Stage3 />} />
                <Route path='/stage4_aturan' element={<Stage4 />} />
                <Route path='/stage5_aturan' element={<Stage5 />} />
                <Route path='/stage6_aturan' element={<Stage6 />} />
                {/* Route Stages Form */}
                <Route path='/stage1_form' element={<Stage1Form />} />
                <Route path='/stage2_form' element={<Stage2Form />} />
                <Route path='/stage3_form' element={<Stage3Form />} />
                <Route path='/stage4_form' element={<Stage4Form />} />
                <Route path='/stage5_form' element={<Stage5Form />} />
                <Route path='/stage6_form' element={<Stage6Form />} />
                {/* Route Stage Konfirmasi */}
                {/* Route Stage 4 */}
                {/* Route Stage 5 */}
                {/* Route Stage 6 */}
            </Routes>
        </>
    )
}

export default Penguji