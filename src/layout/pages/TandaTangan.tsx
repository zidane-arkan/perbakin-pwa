import React, { useState, useRef, useEffect } from 'react'
import { HeaderBlueCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import SignaturePad from 'react-signature-canvas';
import { Link } from 'react-router-dom';



const TandaTangan = (props: any) => {
    const sigCanvasPenguji = useRef<SignaturePad>(null);
    const sigCanvasPeserta = useRef<SignaturePad>(null);
    const [imageURL, setImageURL] = useState<String | null>(null);
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
                setImageURL(trimmedCanvas.toDataURL('image/png'));
            }
        }
    }
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pb-8 pt-[10%]'}>
            <HeaderBlueCustom typeIcon='close' title={props.title} />
            {props.children}
            <LayoutChild className='justify-between gap-6'>
                <button className='py-2 h-[48px] w-[165px] rounded-xl bg-[#62DE5F]'>Berhasil</button>
                <button className='button-gagal py-2 rounded-xl h-[48px] w-[165px] bg-[]'>Gagal</button>
            </LayoutChild>
            <LayoutChild className='flex-col gap-12'>
                <section className='flex flex-col gap-2'>
                    <h2>Penguji:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    <SignaturePad
                        penColor='green'
                        ref={sigCanvasPenguji}
                        canvasProps={{
                            className: "signatureCanvas"
                        }} />
                </section>
                <section className='flex flex-col gap-2'>
                    <h2>Peserta:</h2>
                    <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    {/* <SignaturePad penColor='green'
                        canvasProps={{ width: 800, height: 400, className: 'border-gray-300 rounded-xl border-2' }} /> */}
                    <SignaturePad
                        penColor='green'
                        ref={sigCanvasPeserta}
                        canvasProps={{
                            className: "signatureCanvas"
                        }} />
                </section>
                <CardText>
                    <Link to={`${props.link}`} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Selesai Pengujian</Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default TandaTangan