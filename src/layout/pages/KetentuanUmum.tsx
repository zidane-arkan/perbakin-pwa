import React from 'react'
import Layout from '../../components/Layout'
import { Header } from '../../components/Header'
import Card from '../../components/ui/Card'
import user1 from '../../app-assets/userbig1.png';
import arrowleft from '../../app-assets/arrowleft.png';
const KetentuanUmum = () => {
    return (
        <Layout className={'rounded-3xl mt-28 pt-[10%]'}>
            <Header>
                <div className='flex flex-row justify-between w-full '>
                    <button type='button'>{'<'}</button>
                    <h2>Memulai Ujian</h2>
                    <span></span>
                </div>
            </Header>
            <Card>
                <section className='flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            <h4>Nama Lengkap</h4>
                            <h5>Nama Penembak 1</h5>
                        </span>
                        <span>
                            <h4>PengProv</h4>
                            <h5>Nama Penembak 1</h5>
                        </span>
                        <span>
                            <h4>Klub Menembak</h4>
                            <h5>Asal klub 1</h5>
                        </span>
                    </div>
                    <div>
                        <img className='w-full h-auto' src={user1} alt='user profile' />
                    </div>
                </section>
                <section className='flex flex-col gap-4 w-[345px] items-start'>
                    <h4>Ketentuan Umum</h4>
                    <ol className='flex flex-col gap-2 pl-4 text-black list-decimal'>
                        <li>Penguji berhak untuk menghentikan peserta dari ujian apabila menganggap perlengkapan peserta tidak memenuhi prosedur keamanan.</li>
                        <li>Minimal 50% tembakan pada setiap sasaran (target) mengenai bidang “A” dan tidak ada tembakan yang tidak mengenai sasaran (miss).</li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                    </ol>
                </section>
                <section>
                    <button className='w-full px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Selanjutnya</button>
                </section>
            </Card>
        </Layout>
    )
}

export default KetentuanUmum