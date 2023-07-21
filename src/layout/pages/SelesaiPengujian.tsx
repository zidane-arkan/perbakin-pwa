import React, { useRef, useState } from 'react'
import { HeaderBlueCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import SignaturePad from 'react-signature-canvas';
import { Link } from 'react-router-dom';
import user1 from "../../app-assets/userbig1.png";

const SelesaiPengujian = (props: any) => {
    const sigCanvasPenguji = useRef<SignaturePad>(null);
    const sigCanvasPeserta = useRef<SignaturePad>(null);
    const [imageURL, setImageURL] = useState<String | null>(null);
    const [imageURLPeserta, setImageURLPeserta] = useState<String | null>(null);
    const resetSigPenguji = () => {
        if (sigCanvasPenguji.current !== null) {
            return sigCanvasPenguji.current.clear();
        }
    }
    const resetSigPeserta = () => {
        if (sigCanvasPeserta.current !== null) {
            return sigCanvasPeserta.current.clear();
        }
    }
    const savePenguji = () => {
        if (sigCanvasPenguji.current) {
            const trimmedCanvas = sigCanvasPenguji.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                setImageURL(trimmedCanvas.toDataURL('image/png'));
            }
        }
    }
    const savePeserta = () => {
        if (sigCanvasPeserta.current) {
            const trimmedCanvas = sigCanvasPeserta.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                setImageURLPeserta(trimmedCanvas.toDataURL('image/png'));
            }
        }
    }
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
                    <div className='flex flex-col gap-2 w-full'>
                        <SignaturePad
                            penColor='green'
                            ref={sigCanvasPenguji}
                            canvasProps={{
                                className: "signatureCanvas"
                            }} />
                        <div className='flex w-full gap-4 sm:gap-8'>
                            <button onClick={savePenguji} className='text-white py-2 h-[48px] w-[165px] sm:w-1/2 sm:h-[50px] sm:rounded-2xl rounded-xl bg-[#62DE5F]'>Simpan</button>
                            <button onClick={resetSigPenguji} className='button-gagal py-2 rounded-xl h-[48px] w-[165px] sm:rounded-2xl sm:w-1/2 sm:h-[50px]'>Reset</button>
                        </div>
                    </div>
                </section>
                <section className='flex flex-col gap-2'>
                    <h2>Peserta:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    <div className='flex flex-col gap-2 w-full'>
                        <SignaturePad
                            penColor='green'
                            ref={sigCanvasPeserta}
                            canvasProps={{
                                className: "signatureCanvas"
                            }} />
                        <div className='flex w-full gap-4 sm:gap-8'>
                            <button onClick={savePeserta} className='text-white py-2 h-[48px] w-[165px] sm:w-1/2 sm:h-[50px] sm:rounded-2xl rounded-xl bg-[#62DE5F]'>Simpan</button>
                            <button onClick={resetSigPeserta} className='button-gagal py-2 rounded-xl h-[48px] w-[165px] sm:rounded-2xl sm:w-1/2 sm:h-[50px]'>Reset</button>
                        </div>
                    </div>
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

