import React from 'react'
import { HeaderBlueCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'

const TandaTangan = () => {
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[10%]'}>
            <HeaderBlueCustom typeIcon='close' title='Ujian Kualifikasi 20 Meter' />
            <LayoutChild className='justify-between'>
                <button className='py-2 h-[48px] w-[165px] rounded-xl bg-[#62DE5F]'>Berhasil</button>
                <button className='button-gagal py-2 rounded-xl h-[48px] w-[165px] bg-[]'>Gagal</button>
            </LayoutChild>
            <LayoutChild className='flex-col'>
                <section className='flex flex-col gap-2'>
                    <h2>Penguji:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                </section>
                <section className='flex flex-col gap-2'>
                    <h2>Peserta:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                </section>
            </LayoutChild>
        </Layout>
    )
}

export default TandaTangan