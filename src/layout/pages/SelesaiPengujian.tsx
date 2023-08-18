import React, { useRef, useState } from 'react'
import api from '../../api/api';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { HeaderBlueCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import SignaturePad from 'react-signature-canvas';
import { Link } from 'react-router-dom';
import user1 from "../../app-assets/userbig1.png";

const SelesaiPengujian = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const LoadingModal = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#036BB0]"></div>
                </div>
            </div>
        );
    };

    const sigCanvasPenguji = useRef<SignaturePad>(null);
    const sigCanvasPeserta = useRef<SignaturePad>(null);
    const [stageStatus, setStageStatus] = useState<any>(false);
    const [imageURL, setImageURL] = useState<String | null>(null);
    const [imageURLPeserta, setImageURLPeserta] = useState<String | null>(null);
    const navigate = useNavigate();
    const { shooterid } = useParams();

    console.log(props.stage)

    const handleSuccessButton = () => {
        setIsLoading(true);
        setStageStatus(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    const handleGagalButton = () => {
        setIsLoading(true);
        setStageStatus(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    // RESET TANDA TANGAN
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
    // SIMPAN TANDA TANGAN
    const dataURLtoBlob = (dataURL: String) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    const savePenguji = () => {
        setIsLoading(true);
        if (sigCanvasPenguji.current) {
            const trimmedCanvas = sigCanvasPenguji.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                const dataURL = trimmedCanvas.toDataURL('image/png');

                // Ubah data URL menjadi Blob
                setImageURL(dataURL);
                const blob = dataURLtoBlob(dataURL);
                // Simpan tanda tangan dalam bentuk Blob
                // Misalnya, untuk mengirim ke API sebagai file, Anda dapat menyimpannya dalam state atau melakukan sesuatu dengan Blob ini.
                console.log(blob);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
    const savePeserta = () => {
        setIsLoading(true);
        if (sigCanvasPeserta.current) {
            const trimmedCanvas = sigCanvasPeserta.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                setImageURLPeserta(trimmedCanvas.toDataURL('image/png'));
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
    // API PATCH
    const sendFinishData = async () => {
        try {
            const formData = new FormData();
            formData.append("success", stageStatus.toString())
            if (imageURL) {
                const bloPenguji = dataURLtoBlob(imageURL);
                formData.append("scorer_sign", bloPenguji);
            }
            if (imageURLPeserta) {
                const bloPenembak = dataURLtoBlob(imageURLPeserta);
                formData.append("shooter_sign", bloPenembak);
            }
            // console.log("FormData entries:");
            // for (const [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }
            const endpoint = `/scorer/shooter/${shooterid}/result/${props.stage}/finish`
            const response = await api.patch(endpoint, formData);
            console.log(response.data);
            navigate('/penguji')
            return {
                message: response.data.message,
                error: false,
                response: response,
            };

        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
            return {
                message:
                    "Error: " + err.response?.status + ": " + err.response?.data.message,
                error: true,
            };
        }
    };
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pb-8 pt-[10%]'}>
            {isLoading && <LoadingModal />}
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
                <button onClick={handleSuccessButton} className='py-2 h-[48px] w-[165px] sm:w-1/2 sm:h-[50px] sm:rounded-2xl rounded-xl bg-[#62DE5F]'>Berhasil</button>
                <button onClick={handleGagalButton} className='button-gagal py-2 rounded-xl h-[48px] w-[165px] sm:rounded-2xl sm:w-1/2 sm:h-[50px]'>Gagal</button>
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
                    {/* <Link to={'/penguji/'} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Selesai Pengujian</Link> */}
                    <button onClick={sendFinishData} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>
                        Selesai Pengujian
                    </button>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}
export default SelesaiPengujian

export const SelesaiPengujianSuper = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const LoadingModal = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#036BB0]"></div>
                </div>
            </div>
        );
    };

    const sigCanvasPenguji = useRef<SignaturePad>(null);
    const sigCanvasPeserta = useRef<SignaturePad>(null);
    const [stageStatus, setStageStatus] = useState<any>(false);
    const [imageURL, setImageURL] = useState<String | null>(null);
    const [imageURLPeserta, setImageURLPeserta] = useState<String | null>(null);
    const navigate = useNavigate();
    const { examid, scorerid, shooterid } = useParams();

    console.log(props.stage)

    const handleSuccessButton = () => {
        setIsLoading(true);
        setStageStatus(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    const handleGagalButton = () => {
        setIsLoading(true);
        setStageStatus(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    // RESET TANDA TANGAN
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
    // SIMPAN TANDA TANGAN
    const dataURLtoBlob = (dataURL: String) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    const savePenguji = () => {
        setIsLoading(true);
        if (sigCanvasPenguji.current) {
            const trimmedCanvas = sigCanvasPenguji.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                const dataURL = trimmedCanvas.toDataURL('image/png');

                // Ubah data URL menjadi Blob
                setImageURL(dataURL);
                const blob = dataURLtoBlob(dataURL);
                // Simpan tanda tangan dalam bentuk Blob
                // Misalnya, untuk mengirim ke API sebagai file, Anda dapat menyimpannya dalam state atau melakukan sesuatu dengan Blob ini.
                console.log(blob);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
    const savePeserta = () => {
        setIsLoading(true);
        if (sigCanvasPeserta.current) {
            const trimmedCanvas = sigCanvasPeserta.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                setImageURLPeserta(trimmedCanvas.toDataURL('image/png'));
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
    // API PATCH
    const sendFinishData = async () => {
        try {
            const formData = new FormData();
            formData.append("success", stageStatus.toString())
            if (imageURL) {
                const bloPenguji = dataURLtoBlob(imageURL);
                formData.append("scorer_sign", bloPenguji);
            }
            if (imageURLPeserta) {
                const bloPenembak = dataURLtoBlob(imageURLPeserta);
                formData.append("shooter_sign", bloPenembak);
            }
            // console.log("FormData entries:");
            // for (const [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }
            const endpoint = `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/${props.stage}`
            const response = await api.patch(endpoint, formData);
            // console.log(response.data);
            navigate('/penguji')
            return {
                message: response.data.message,
                error: false,
                response: response,
            };

        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
            return {
                message:
                    "Error: " + err.response?.status + ": " + err.response?.data.message,
                error: true,
            };
        }
    };
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pb-8 pt-[10%]'}>
            {isLoading && <LoadingModal />}
            <HeaderBlueCustom typeIcon='close' title="Hasil Ujian" />
            <LayoutChild>
                <section className='w-full flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            <h4>Nama Lengkap</h4>
                            {/* <h5>{props.penembak}</h5> */}
                            <h5>{props.shooterData.name}</h5>
                        </span>
                        <span>
                            <h4>PengProv</h4>
                            {/* <h5>{props.pengprov}</h5> */}
                            <h5>{props.shooterData.province}</h5>
                        </span>
                        <span>
                            <h4>Klub Menembak</h4>
                            {/* <h5>{props.klub}</h5> */}
                            <h5>{props.shooterData.club}</h5>
                        </span>
                    </div>
                    <div>
                        <img className='w-full h-auto' src={user1} alt='user profile' />
                    </div>
                </section>
            </LayoutChild>
            <LayoutChild className='justify-between gap-6'>
                <button onClick={handleSuccessButton} className='py-2 h-[48px] w-[165px] sm:w-1/2 sm:h-[50px] sm:rounded-2xl rounded-xl bg-[#62DE5F]'>Berhasil</button>
                <button onClick={handleGagalButton} className='button-gagal py-2 rounded-xl h-[48px] w-[165px] sm:rounded-2xl sm:w-1/2 sm:h-[50px]'>Gagal</button>
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
                    {/* <Link to={'/penguji/'} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Selesai Pengujian</Link> */}
                    <button onClick={sendFinishData} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>
                        Selesai Pengujian
                    </button>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

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

