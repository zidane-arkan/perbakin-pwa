import React from 'react'
import { HeaderBlueCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import SignatureCanvas from 'react-signature-canvas';
import { Link } from 'react-router-dom';
import user1 from "../../app-assets/userbig1.png";

const SelesaiPengujian = (props: any) => {
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pb-8 pt-[10%]'}>
            <HeaderBlueCustom typeIcon='close' title="Selesai Pengujian" />
            <LayoutChild>
                <section className='w-full flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            <h4>Nama Lengkap</h4>
                            {/* <h5>{props.penembak}</h5> */}
                            <h5>Abdiansyah CS</h5>
                        </span>
                        <span>
                            <h4>PengProv</h4>
                            {/* <h5>{props.pengprov}</h5> */}
                            <h5>Sumatera Selatan</h5>
                        </span>
                        <span>
                            <h4>Klub Menembak</h4>
                            {/* <h5>{props.klub}</h5> */}
                            <h5>PSS</h5>
                        </span>
                    </div>
                    <div>
                        <img className='w-full h-auto' src={user1} alt='user profile' />
                    </div>
                </section>
            </LayoutChild>
            <LayoutChild className='justify-between gap-6'>
                <button className='py-2 h-[48px] w-[165px] rounded-xl bg-[#62DE5F]'>Berhasil</button>
                <button className='button-gagal py-2 rounded-xl h-[48px] w-[165px] bg-[]'>Gagal</button>
            </LayoutChild>
            <LayoutChild className='flex-col gap-12'>
                <section className='flex flex-col gap-2'>
                    <h2>Penguji:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    <SignatureCanvas penColor='green'
                        canvasProps={{ width: 800, height: 400, className: 'border-gray-300 rounded-xl border-2' }} />
                </section>
                <section className='flex flex-col gap-2'>
                    <h2>Peserta:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    <SignatureCanvas penColor='green'
                        canvasProps={{ width: 800, height: 400, className: 'border-gray-300 rounded-xl border-2' }} />
                </section>
                <CardText>
                    <Link to={'/penguji/'} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Selesai Pengujian</Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}


export default SelesaiPengujian

// const SelesaiPengujian = (props: any) => {
//     return (
//         <TandaTangan title='Selesai Pengujian' link={'/penguji/'}>
//             <LayoutChild>
//                 <section className='w-full flex flex-row items-center justify-between gap-4'>
//                     <div className='flex flex-col gap-2'>
//                         <span>
//                             <h4>Nama Lengkap</h4>
//                             {/* <h5>{props.penembak}</h5> */}
//                             <h5>Abdiansyah CS</h5>
//                         </span>
//                         <span>
//                             <h4>PengProv</h4>
//                             {/* <h5>{props.pengprov}</h5> */}
//                             <h5>Sumatera Selatan</h5>
//                         </span>
//                         <span>
//                             <h4>Klub Menembak</h4>
//                             {/* <h5>{props.klub}</h5> */}
//                             <h5>PSS</h5>
//                         </span>
//                     </div>
//                     <div>
//                         <img className='w-full h-auto' src={user1} alt='user profile' />
//                     </div>
//                 </section>
//             </LayoutChild>
//         </TandaTangan>
//     )
// }

