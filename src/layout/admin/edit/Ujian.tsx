import React from 'react'
import { Layout,LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import { CardText } from '../../../components/ui/Card'
import { Link } from 'react-router-dom'
const Ujian = () => {
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Edit Tentang ujian' />
            <LayoutChild className='flex-col gap-0'>
                <h6 className='text-black/60'>Nama Penembak</h6>
                <h4>Abdiansyah CS</h4>
            </LayoutChild>
            <LayoutChild className='flex-col gap-4 h-[515px] justify-between'>
                <div className='flex-col gap-4'>
                    <section className='flex flex-col gap-2'>
                        <h2>Peserta:</h2>
                        <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    </section>
                </div>
                <CardText>
                    <Link to={'/penguji/kualifikasi_konfirmasi'} className='w-full px-4 py-4 text-white text-center bg-[#036BB0] rounded-lg' type='button'>
                        Simpan
                    </Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Ujian