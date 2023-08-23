import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HeaderBlueCustom } from '../../components/Header';
import { Layout, LayoutChild } from '../../components/Layout'
import { Card, CardText } from '../../components/ui/Card'
import arrowLeft from '../../app-assets/arrowleft.png';
import close from '../../app-assets/close.png';
import jarak from '../../app-assets/jarak.png';
import { Link } from 'react-router-dom';
type Props = {
    name?: string;
    children?: string | JSX.Element | React.ReactNode;
    posisiAwal?: string | JSX.Element | React.ReactNode;
    className?: string;
    title: string;
    jarak: string;
    waktu: string;
    waktu2?: string;
    senjataSatu?: string;
    senjataDua?: string;
    sasaran: string;
    tembakMaks: string;
    link: string;
}

const Aturan = (props: Props) => {
    const navigate = useNavigate();
    const sasaran = props.name === 'kualifikasi' ? 'buah Ring Target Pistol' : 'buah Sasaran IPSC';
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
        <Layout className={'rounded-3xl mt-28 mb-[5%] pt-[10%]'}>
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
            <LayoutChild className='flex-col gap-4 justify-between'>
                <section className='flex flex-col gap-4'>
                    <section className='flex justify-between w-full gap-4'>
                        <Card className='w-[180px] sm:w-[50%] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                            <img className='mt-1 w-[20px] h-[20px]' src={jarak} alt='s' />
                            <div>
                                <h6 className='sm:text-base'>Jarak</h6>
                                <p className='text-[12px] sm:text-base'>{props.jarak} Meter</p>
                            </div>
                        </Card>
                        <Card className='w-[180px] sm:w-[50%] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                            <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                            <div>
                                <h6 className='sm:text-base'>Waktu</h6>
                                <p className='text-[12px] sm:text-base'>{props.waktu} Detik {props.senjataSatu}</p>
                                <p className='text-[12px] sm:text-base'>{props.waktu2} {props.senjataDua}</p>
                            </div>
                        </Card>
                    </section>
                    <section className='flex justify-between w-full gap-4'>
                        <Card className='w-[180px] sm:w-[50%] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                            <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                            <div>
                                <h6 className='sm:text-base'>Sasaran</h6>
                                <p className='text-[12px] sm:text-base'>{props.sasaran} {sasaran} </p>
                            </div>
                        </Card>
                        <Card className='w-[180px] sm:w-[50%] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                            <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                            <div>
                                <h6 className='sm:text-base'>Total Tembakan Maksimal</h6>
                                <p className='text-[12px] sm:text-base'>{props.tembakMaks} Butir</p>
                            </div>
                        </Card>
                    </section>
                </section>
                <CardText title='Ketentuan Umum'>
                    {/* <p>Berdiri tegak menghadap sasaran, senjata dan magasin berada dalam holster atau diletakkan diatas meja</p> */}
                    <p>{props.posisiAwal}</p>
                </CardText>
                <CardText title='Prosedur'>
                    <ol className='flex flex-col sm:w-[700px] gap-2 pl-4 text-black list-decimal'>
                        {props.children}
                    </ol>
                </CardText>
                <CardText className="pt-[5%] sm:pt-[10%]" >
                    <Link to={`/penguji/${props.link}`} className='w-full px-4 py-4 text-center text-white bg-[#036BB0] rounded-lg' type='button'>Mulai Pengujian</Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Aturan