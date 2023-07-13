import React from 'react'
import { HeaderWhiteCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import Kualifikasi from '../tabel/form/Kualifikasi';
import Stage1 from '../tabel/form/Stage1';
import Stage2 from '../tabel/form/Stage2';
import Stage3 from '../tabel/form/Stage3';
import Stage4 from '../tabel/form/Stage4';
// import Stage5 from '../tabel/form/Stage5';
// import Stage6 from '../tabel/form/Stage6';

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
            {
                props.ujian == 'stage1' &&
                <Stage1 />
            }
            {
                props.ujian == 'stage2' &&
                <Stage2 />
            }
            {
                props.ujian == 'stage3' &&
                <Stage3 />
            }
            {
                props.ujian == 'stage4' &&
                <Stage4 />
            }
            {/* {
                props.ujian == 'stage2' &&
                <Stage5 />
            } */}
            {/* {
                props.ujian == 'stage2' &&
                <Stage6 />
            } */}
        </>
    );
}
const Form = (props: any) => {
    return (
        <Layout className={'rounded-3xl h-auto gap-8 mt-28 pb-10 pt-[2%] justify-evenly overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='close' title={props.title} />
            <LayoutChild className='flex-col gap-0'>
                <h6 className='text-black/60'>Nama Penembak</h6>
                <h4>Abdiansyah CS</h4>
            </LayoutChild>
            <LayoutChild className='flex-col h-full gap-4 justify-between'>
                <div className='flex-col gap-4'>
                    <section className='flex flex-col gap-2'>
                        <h2>Peserta:</h2>
                        <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    </section>
                    <FormTable ujian={props.ujian} />
                </div>
                <CardText>
                    <Link to={`${props.link}`} className='w-full px-4 py-4 text-white text-center bg-[#036BB0] rounded-lg' type='button'>
                        Selanjutnya
                    </Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Form