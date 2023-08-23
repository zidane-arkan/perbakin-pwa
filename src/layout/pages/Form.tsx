import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import { AxiosError } from 'axios';
import { HeaderWhiteCustom, HeaderWhiteCustomTable } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import { Link, Navigate } from 'react-router-dom';
import { ResponseData } from '../../context/response';
// IMPORT FORM SUPER ADMIN
import Kualifikasi from '../tabel/form/Kualifikasi';
import Stage1 from '../tabel/form/Stage1';
import Stage2 from '../tabel/form/Stage2';
import Stage3 from '../tabel/form/Stage3';
import Stage4 from '../tabel/form/Stage4';
import Stage5 from '../tabel/form/Stage5';
import Stage6 from '../tabel/form/Stage6';
// IMPORT FORM PENGUJI
import KualifikasiSuper from '../tabel/superForm/Kualifikasi';
import Stage1Super from '../tabel/superForm/Stage1';
import Stage2Super from '../tabel/superForm/Stage2';
import Stage3Super from '../tabel/superForm/Stage3';
import Stage4Super from '../tabel/superForm/Stage4';
import Stage5Super from '../tabel/superForm/Stage5';
import Stage6Super from '../tabel/superForm/Stage6';
import { useParams, useNavigate } from 'react-router-dom';

type Penembak = {
    scorer_id: string;
    id: string;
    name: string;
    stage: string;
    club: string;
    province: string;
    scorer: string;
}
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
            {
                props.ujian == 'stage5' &&
                <Stage5 />
            }
            {
                props.ujian == 'stage6' &&
                <Stage6 />
            }
        </>
    );
}
const Form = (props: any) => {
    const navigate = useNavigate();
    const { shooterid } = useParams();
    const [loading, setLoading] = useState(true);
    const [shooter, setShooter] = useState<Penembak>();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const classname = `${props.classname} rounded-3xl`;

    useEffect(() => {
        const fetchInitialShooters = async () => {
            try {
                const response = await api.get(`/scorer/shooter/${shooterid}`);
                const shooter = response.data.data.shooter;
                setShooter(shooter);
                // setInitialFetchDone(true);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchInitialShooters();
    }, []);
    // MODAL HANDLE
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
        <Layout className={'rounded-3xl h-auto gap-8 mt-28 pb-10 pt-[2%] justify-evenly overflow-hidden'}>
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
            <HeaderWhiteCustomTable
                typeIcon='close'
                title={props.title}
                showConfirmationModal={showConfirmationModal}
                handleGoBack={handleGoBack}
                handleConfirmGoBack={handleConfirmGoBack}
                handleCancelGoBack={handleCancelGoBack}
            />
            <LayoutChild className='flex-col gap-0'>
                <h6 className='text-black/60'>Nama Penembak</h6>

                {!loading ? (
                    <h4>{shooter?.name}</h4>

                ) : (
                    <div className="flex mt-2 p-4 text-[.8rem] font-bold w-auto sm:w-[35%] animate-pulse  bg-gray-200 rounded-md">Loading Nama Penembak...</div>
                )}
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

const FormTableSuper = (props: PropsForm) => {
    return (
        <>
            {
                props.ujian == 'kualifikasi' &&
                <KualifikasiSuper />
            }
            {
                props.ujian == 'stage1' &&
                <Stage1Super />
            }
            {
                props.ujian == 'stage2' &&
                <Stage2Super />
            }
            {
                props.ujian == 'stage3' &&
                <Stage3Super />
            }
            {
                props.ujian == 'stage4' &&
                <Stage4Super />
            }
            {
                props.ujian == 'stage5' &&
                <Stage5Super />
            }
            {
                props.ujian == 'stage6' &&
                <Stage6Super />
            }
        </>
    );
}
export const FormSuper = (props: any) => {
    const { examid, scorerid, shooterid } = useParams();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isErrorOverlay, setIsErrorOverlay] = useState(false);
    const [shooter, setShooter] = useState<Penembak>();
    const navigate = useNavigate();

    // console.log(props.ujian)
    // const classname = `${props.classname} rounded-3xl`;
    const handleFinishStage = async (e: React.FormEvent) => {
        e.preventDefault();
        const stageFinish = props.ujian === 'kualifikasi' ? '0' : props.ujian;
        try {
            setIsSaving(true); // Start loading
            const response = await api.patch(
                `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/${stageFinish}`
            );
            console.log(response.data);
            setIsSaving(false); // Stop loading
            navigate(`${props.link}`)
            return {
                message: response.data.message,
                error: false,
                response: [response],
            };
        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
            setIsSaving(false); // Stop loading
            // Show error overlay for 422 status
            navigate(`${props.link}`)
            if (err.response?.status === 422) {
                setIsErrorOverlay(true);
            }
        }

    };

    useEffect(() => {
        const fetchInitialShooters = async () => {
            try {
                const response = await api.get(`/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}`);
                const shooter = response.data.data.shooter;
                setShooter(shooter);
                // setInitialFetchDone(true);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchInitialShooters();
    }, []);

    return (
        <Layout className={'rounded-3xl h-auto gap-8 mt-28 pb-10 pt-[2%] justify-evenly overflow-hidden'}>
            {isSaving ? (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1B79B8]"></div>
                </div>
            ) : null}
            {isErrorOverlay ? (
                <div className="fixed inset-0 bg-red-500 bg-opacity-75 flex flex-col items-center justify-center z-50">
                    <p className="text-white font-semibold text-lg">
                        Tolong Pastikan Try 1 atau Try 2 Sudah diupdate
                    </p>
                    <button
                        className="mt-4 py-2 px-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
                        onClick={() => setIsErrorOverlay(false)}
                    >
                        Tutup
                    </button>
                </div>
            ) : null}
            <HeaderWhiteCustomTable typeIcon='close' title={props.title} />
            <LayoutChild className='flex-col gap-0'>
                <h6 className='text-black/60'>Nama Penembak</h6>

                {!loading ? (
                    <h4>{shooter?.name}</h4>

                ) : (
                    <div className="flex mt-2 p-4 text-[.8rem] font-bold w-auto sm:w-[35%] animate-pulse  bg-gray-200 rounded-md">Loading Nama Penembak...</div>
                )}
            </LayoutChild>
            <LayoutChild className='flex-col h-full gap-4 justify-between'>
                <div className='flex-col gap-4'>
                    <section className='flex flex-col gap-2'>
                        <h2>Peserta:</h2>
                        <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    </section>
                    <FormTableSuper ujian={props.ujian} />
                </div>
                <CardText>
                    <form className='w-full' onSubmit={handleFinishStage}>
                        <button
                            className={`w-full py-4 text-[#fff] border text-center bg-[#036BB0] rounded-lg ${isSaving === undefined ? 'cursor-not-allowed opacity-60' : ''}`}
                            type='submit'
                            disabled={isSaving === undefined}
                        >
                            {isSaving ? 'Menyelesaikan...' : 'Selanjutnya'}
                        </button>
                    </form>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}