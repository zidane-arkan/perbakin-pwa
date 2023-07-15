import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { HeaderBlue } from '../../components/Header'
import { Card } from '../../components/ui/Card'
import user1 from '../../app-assets/userbig1.png';
import arrowleft from '../../app-assets/arrowleft.png';
import { useNavigate, Link } from 'react-router-dom';
const KetentuanUmum = (props: any) => {
    const navigate = useNavigate();
    return (
        <Layout className={'rounded-3xl mt-28 pb-[15%] pt-[10%]'}>
            <HeaderBlue>
                <div className='flex flex-row justify-between items-center w-full '>
                    <button onClick={() => navigate(-1)} type='button'>
                        <img src={arrowleft} alt='arrow-left' />
                    </button>
                    <h2>Memulai Ujian</h2>
                    <span></span>
                </div>
            </HeaderBlue>
            <LayoutChild className='flex-col pb-12'>
                <section className='flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            <h4>Nama Lengkap</h4>
                            <h5>{props.penembak}ak 1</h5>
                        </span>
                        <span>
                            <h4>PengProv</h4>
                            <h5>{props.pengprov}ak 1</h5>
                        </span>
                        <span>
                            <h4>Klub Menembak</h4>
                            <h5>{props.klub}</h5>
                        </span>
                    </div>
                    <div>
                        <img className='w-full h-auto sm:w-[150px]' src={user1} alt='user profile' />
                    </div>
                </section>
                <section className='flex flex-col pt-4 gap-4 w-[345px] sm:w-[700px] items-start'>
                    <h4>Ketentuan Umum</h4>
                    <ol className='flex flex-col gap-2 pl-4 text-black text-base sm:text-lg list-decimal'>
                        <li>Penguji berhak untuk menghentikan peserta dari ujian apabila menganggap perlengkapan peserta tidak memenuhi prosedur keamanan.</li>
                        <li>Minimal 50% tembakan pada setiap sasaran (target) mengenai bidang “A” dan tidak ada tembakan yang tidak mengenai sasaran (miss).</li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                        <li>Jari harus berada di luar pengaman picu pada saat melakukan pergerakkan (perpindahan posisi)/mengganti magasin atau memperbaiki senjata dan arah laras senjata harus selalu mengarah ke downrange. </li>
                        <li>Peserta akan di diskualifikasi apabila melakukan pelanggaran prosedur keamanan dan dinyatakan gagal (tidak lulus) pada Ujian Sertifikasi ini. </li>
                        <li>Hasil Ujian Sertifikasi ini harus dikembalikan kepada Ketua Tim Penatar baik peserta yang lulus maupun gagal sebagai bukti otentik keikutsertaan peserta pada Ujian Sertifikasi ini. </li>
                        <li>Peserta yang tidak lulus pada Ujian Sertifikasi kali ini, dipersilahkan untuk mengikuti jadwal Pengujian Sertifikasi berikutnya. </li>
                    </ol>
                </section>
                <section className='pt-5'>
                    <Link to={`${props.link}`} className='w-full px-4 py-4 text-center text-white bg-[#036BB0] rounded-lg' type='button'>Selanjutnya</Link>
                </section>
            </LayoutChild>
        </Layout>
    )
}

export default KetentuanUmum