import React, { useState, useRef, useEffect } from 'react'
import { HeaderBlueCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import SignaturePad from 'react-signature-canvas';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';


const TandaTangan = (props: any) => {
    const navigate = useNavigate();
    const sigCanvasPenguji = useRef<SignaturePad>(null);
    const sigCanvasPeserta = useRef<SignaturePad>(null);
    const [stageStatus, setStageStatus] = useState<any>(false);
    const [imageURL, setImageURL] = useState<String | null>(null);
    const [imageURLPeserta, setImageURLPeserta] = useState<String | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const { shooterid } = useParams();

    console.log(props.stageStatus)

    const handleSuccessButton = () => {
        setStageStatus(true);
    };
    const handleGagalButton = () => {
        setStageStatus(false);
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
    }
    const savePeserta = () => {
        if (sigCanvasPeserta.current) {
            const trimmedCanvas = sigCanvasPeserta.current.getTrimmedCanvas();
            if (trimmedCanvas) {
                setImageURLPeserta(trimmedCanvas.toDataURL('image/png'));
            }
        }
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
            // console.log(formData)
            console.log("FormData entries:");
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
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
    // IF STAGE 6
    const finishingShooter = async () => {

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

            const endpoint = `/scorer/shooter/${shooterid}/result/${props.stage}/finish`
            const response = await api.patch(endpoint, formData);
            console.log(response.data);
            navigate(`/penguji/selesai_pengujian/${shooterid}`)
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
    // modal Handle
    const handleGoBack = () => {
        if (showConfirmationModal) {
            navigate(-1);
        } else {
            setShowConfirmationModal(true);
        }
    };

    const handleConfirmGoBack = () => {
        navigate(-1);
    };

    const handleCancelGoBack = () => {
        setShowConfirmationModal(false);
    };

    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pb-8 sm:pb-4 pt-[10%] sm:pt-[7%]'}>
            {showConfirmationModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-8 rounded-lg shadow-md'>
                        <p className='mb-4'>Apakah Anda yakin ingin kembali ke halaman sebelumnya?</p>
                        <div className='flex justify-end'>
                            <button className='mr-4 text-blue-500' onClick={handleCancelGoBack}>
                                Batal
                            </button>
                            <button className='text-red-500' onClick={handleConfirmGoBack}>
                                Ya, Kembali
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <HeaderBlueCustom
                typeIcon='close'
                title={props.title}
                showConfirmationModal={showConfirmationModal}
                handleGoBack={handleGoBack}
                handleConfirmGoBack={handleConfirmGoBack}
                handleCancelGoBack={handleCancelGoBack}
            />
            {props.children}
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
                    {/* <SignaturePad penColor='green'
                        canvasProps={{ width: 800, height: 400, className: 'border-gray-300 rounded-xl border-2' }} /> */}
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
                    {/* <Link to={`${props.link}`} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Selesai Pengujian</Link> */}
                    {/* <button onClick={sendFinishData} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>
                        Selesai Pengujian {props.title}
                    </button> */}
                    {
                        props.stageStatus === '6' ?
                            <button onClick={finishingShooter} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>
                                Selesai Pengujian
                            </button> :
                            <button onClick={sendFinishData} className='w-full text-center px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>
                                Selesai Pengujian {props.title}
                            </button>
                    }
                </CardText>

            </LayoutChild>
        </Layout>
    )
}

export default TandaTangan


{
    /*
{
                    imageURL && (
                        <>
                            <img src={imageURL} alt="signature" className="signature" />
                        </>
                    )
                }
                {
                    imageURLPeserta && (
                        <>
                            <img src={imageURLPeserta} alt="signature" className="signature" />
                        </>
                    )
} 
*/
}