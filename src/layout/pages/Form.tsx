import React from 'react'
import { HeaderWhiteCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import Kualifikasi from '../tabel/form/Kualifikasi';

type PropsForm = {
    ujian?: string
};
export const JenisTabel: string | any = {
    'kualifikasi': '#FFFFFF',
    'white': '#000000',
    'blur': '#000000',
    'transparent': '#FFFFFF',
};
const FormTable = (props: PropsForm) => {
    return (
        <>
            {
                props.ujian == 'kualifikasi' &&
                <Kualifikasi />
            }
        </>
    );
}
const Form = () => {
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%]'}>
            <HeaderWhiteCustom typeIcon='close' title='Ujian Kualifikasi 20 Meter' />
            <LayoutChild className='flex-col gap-0'>
                <h6 className='text-black/60'>Nama Penembak</h6>
                <h4>Abdiansyah CS</h4>
            </LayoutChild>
            <LayoutChild className='flex-col gap-12'>
                <section className='flex flex-col gap-2'>
                    <h2>Peserta:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                </section>
                <FormTable />
                <CardText>
                    <Link to={'/kualifikasi_konfirmasi'} className='w-full px-4 py-4 text-white text-center bg-[#036BB0] rounded-lg' type='button'>
                        Selanjutnya
                    </Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Form