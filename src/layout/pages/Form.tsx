import React from 'react'
import { HeaderWhiteCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';

const Form = () => {
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[10%]'}>
            <HeaderWhiteCustom typeIcon='close' title='Ujian Kualifikasi 20 Meter' />
            <LayoutChild className='flex-col gap-4'>
                <h6>Nama Penembak</h6>
                <h4>Abdiansyah CS</h4>
            </LayoutChild>
            <LayoutChild className='flex-col gap-12'>
                <section className='flex flex-col gap-2'>
                    <h2>Peserta:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                </section>
                <CardText>
                    <button className='w-full px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>
                        Selanjutnya
                    </button>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Form