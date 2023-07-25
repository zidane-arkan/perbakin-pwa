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
// Edit
import EditProfilePenguji from '../penguji/edit/Profile'
// Konfirmasi
import KualifikasiKonfirmasi from '../penguji/konfirmasi/Kualifikasi';
import Stage1Konfirmasi from '../penguji/konfirmasi/Stage1';
import Stage2Konfirmasi from '../penguji/konfirmasi/Stage2';
import Stage3Konfirmasi from '../penguji/konfirmasi/Stage3';
import Stage4Konfirmasi from '../penguji/konfirmasi/Stage4';
import Stage5Konfirmasi from '../penguji/konfirmasi/Stage5';
import Stage6Konfirmasi from '../penguji/konfirmasi/Stage6';
// Selesai Pengujian
import SelesaiPengujian from '../pages/SelesaiPengujian';
const Penguji = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/kualifikasi_ketentuan/:shooterid' element={<KualifikasiKetentuan />} />
                {/* Edit */}
                <Route path='/penguji/editprofile' element={<EditProfilePenguji />} />
                {/* Route Kualifikasi */}
                <Route path='/kualifikasi_aturan/:shooterid' element={<Kualifikasi />} />
                <Route path='/kualifikasi_form/:shooterid' element={<KualifikasiForm />} />
                <Route path='/kualifikasi_konfirmasi/:shooterid' element={<KualifikasiKonfirmasi />} />
                {/* Route Stages Aturan */}
                <Route path='/stage1_aturan/:shooterid' element={<Stage1 />} />
                <Route path='/stage2_aturan/:shooterid' element={<Stage2 />} />
                <Route path='/stage3_aturan/:shooterid' element={<Stage3 />} />
                <Route path='/stage4_aturan/:shooterid' element={<Stage4 />} />
                <Route path='/stage5_aturan' element={<Stage5 />} />
                <Route path='/stage6_aturan/:shooterid' element={<Stage6 />} />
                {/* Route Stages Form */}
                <Route path='/stage1_form/:shooterid' element={<Stage1Form />} />
                <Route path='/stage2_form/:shooterid' element={<Stage2Form />} />
                <Route path='/stage3_form/:shooterid' element={<Stage3Form />} />
                <Route path='/stage4_form/:shooterid' element={<Stage4Form />} />
                <Route path='/stage5_form' element={<Stage5Form />} />
                <Route path='/stage6_form' element={<Stage6Form />} />
                {/* Route Stage Konfirmasi */}
                <Route path='/stage1_konfirmasi/:shooterid' element={<Stage1Konfirmasi />} />
                <Route path='/stage2_konfirmasi/:shooterid' element={<Stage2Konfirmasi />} />
                <Route path='/stage3_konfirmasi/:shooterid' element={<Stage3Konfirmasi />} />
                <Route path='/stage4_konfirmasi' element={<Stage4Konfirmasi />} />
                <Route path='/stage5_konfirmasi' element={<Stage5Konfirmasi />} />
                <Route path='/stage6_konfirmasi' element={<Stage6Konfirmasi />} />
                {/* Route Selesai */}
                <Route path='/selesai_pengujian' element={<SelesaiPengujian />} />
            </Routes>
        </>
    )
}

export default Penguji
