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
import TambahAdmin from '../super-admin/tambah/Admin';
// Edit Route
import EditProfile from '../super-admin/edit/Profile';
import EditUjian from '../super-admin/edit/Ujian';
import EditPenembak from '../super-admin/edit/Penembak';
import EditAdmin from '../super-admin/edit/Admin';
import EditPenguji from '../super-admin/edit/Penguji';
import { Stage6Super as EditHasilUjian } from '../super-admin/konfirmasi/Stage6Super';
// Form Super
import KualifikasiForm from '../super-admin/form-super/Kualifikasi'
import Stage1Form from '../super-admin/form-super/Stage1';
import Stage2Form from '../super-admin/form-super/Stage2';
import Stage3Form from '../super-admin/form-super/Stage3';
import Stage4Form from '../super-admin/form-super/Stage4';
import Stage5Form from '../super-admin/form-super/Stage5';
import Stage6Form from '../super-admin/form-super/Stage6';
// Route Hasil Ujian
import HasilUjian from '../super-admin/HasilUjian';
import DetailPenguji from '../pages/DetailPenguji';
import KelolaAdmin from '../super-admin/kelola/Admin';
// Route Pilih Ujia
import PilihUjian from '../super-admin/PilihUjian';

const SuperAdmin = () => {
    // const userPenguji = [
    //     { id: '1', penguji: 'Penguji 1' },
    //     { id: '2', penguji: 'Penguji 2' },
    //     { id: '3', penguji: 'Penguji 3' },
    //     { id: '4', penguji: 'Penguji 4' },
    // ];
    return (
        <>
            <Routes>
                {/* <Route path='/' element={<SuperAdminRegist />} /> */}
                <Route path='/' element={<UjianBaru />} />
                <Route path='/pilihujian' element={<PilihUjian />} />
                <Route path='/adminregis' element={<AdminRegis />} />
                <Route path='/tabs' element={<Dashboard />} >
                    <Route path='admindashboard' element={<SuperAdminTab />} />
                    <Route path='penembak' element={<Penembak />} />
                    <Route path='penguji' element={<Penguji />} />
                </Route>
                {/* Route Tambah */}
                <Route path='tabs/admindashboard/tambahpenembak' element={<TambahPenembak />} />
                <Route path='tabs/admindashboard/tambahpenguji' element={<TambahPenguji />} />
                <Route path='tabs/admindashboard/tambahadmin' element={<TambahAdmin />} />
                {/* Route Edit */}
                <Route path='tabs/admindashboard/editprofile' element={<EditProfile />} />
                <Route path='tabs/admindashboard/editujian' element={<EditUjian />} />
                <Route path='tabs/admindashboard/editpenembak/:id/:scorer_id' element={<EditPenembak />} />
                <Route path='tabs/admindashboard/editadmin/:id' element={<EditAdmin />} />
                <Route path='tabs/admindashboard/editpenguji/:id' element={<EditPenguji />} />
                <Route path='tabs/admindashboard/edithasiujian/:examid/:scorerid/:shooterid' element={<EditHasilUjian />} />
                {/* ROUTE STAGE EDIT SUPER */}
                <Route path='tabs/admindashboard/edithasiujian/:examid/:scorerid/:shooterid/kualifikasiform' element={<KualifikasiForm />} />
                <Route path='tabs/admindashboard/edithasiujian/:examid/:scorerid/:shooterid/kualifikasiform/stage1form' element={<Stage1Form />} />
                <Route path='tabs/admindashboard/edithasiujian/:examid/:scorerid/:shooterid/kualifikasiform/stage1form/stage2form' element={<Stage2Form />} />
                <Route path='tabs/admindashboard/edithasiujian/:examid/:scorerid/:shooterid/kualifikasiform/stage1form/stage2form/stage3form' element={<Stage3Form />} />
                <Route path='/stage4_form/:shooterid' element={<Stage4Form />} />
                <Route path='/stage5_form/:shooterid' element={<Stage5Form />} />
                <Route path='/stage6_form/:shooterid' element={<Stage6Form />} />
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