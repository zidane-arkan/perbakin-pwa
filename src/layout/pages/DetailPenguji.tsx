import React, { useState, useEffect, useContext } from 'react'
import api from '../../api/api'
import { AuthContext } from '../../context/AuthContext'
import { CardPenembakPengujiAdmin, CardPenembakAdminBiasa } from '../../components/ui/Card'
import { Layout, LayoutChild } from '../../components/Layout'
import { HeaderWhiteCustom } from '../../components/Header'
import { CardText } from '../../components/ui/Card'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { AxiosError } from 'axios'
import { ResponseData } from '../../context/response'

import user2 from '../../app-assets/user2.png';
type Penembak = {
    id: string;
    name: string;
    club: string;
    province: string;
    scorer: string;
}
interface PenembakAdminProps {
    shooters: string[];
}

interface Shooter {
    id: string;
    scorer_id: string;
    scorer: string;
    name: string;
    image_path: string;
    province: string;
    club: string;
    stage?: string; // Add stage as an optional property
}

interface Stage {
    id: string | any;
    name: string;
    province: string;
    club: string;
    failed: boolean;
    stage: string;
}

const DetailPenguji = (props: any) => {
    const superAdminCtx = useContext(AuthContext);
    const [shooters, setShooters] = useState<Penembak[]>([]);
    const [loading, setLoading] = useState(true);
    const getExamId = async (): Promise<string | null> => {
        try {
            const response = await api.get("/super/exam");
            const exams = response.data.data.exams;
            if (exams.length > 0) {
                const lastExam = exams[exams.length - 1];
                const lastExamId = lastExam.id;

                return lastExamId;
            } else {
                return null;
            }
        } catch (error) {
            const err = error as AxiosError<ResponseData<null>>;
            console.error("Error:", err);

            return null;
        }
    };

    const data = useLocation();
    // console.log(data)
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        const fetchShooters = async () => {
            try {
                const examId = superAdminCtx?.getExamId();
                console.log(examId)
                const response = await api.get(`/super/exam/${examId}/scorer/${id}/shooter`);
                const responseScorer = await api.get(`/super/exam/${examId}/scorer`);
                const scorers = responseScorer.data.data.scorers;

                const shooters = response.data.data.shooters.map((shooter: Penembak) => {
                    const scorer = scorers.find((s: any) => s.id === id);
                    const scorerName = scorer ? scorer.name : '';

                    return { ...shooter, scorer: scorerName };
                });
                console.log(response)

                setShooters(shooters);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchShooters();
    }, []);

    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Detail Penguji' />
            <LayoutChild>
                <section className="flex w-full items-center gap-4 ">
                    <div className="flex shadow-md sm:shadow-sm rounded-xl items-center w-1/6">
                        <img className='min-w-[65px] sm:min-w-[80px] ' src={user2} />
                    </div>
                    <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                        <h1 className="text-base font-bold text-gray-800">Nama Lengkap</h1>
                        <p className="text-sm text-gray-600 ">{data.state}</p>
                    </div>
                </section>
            </LayoutChild>
            <LayoutChild className='flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>Penembak Yang Diuji :</h3>
                </span>
                {/* <CardPenembakAdmin penembak="Testing 1" klub="Asal Klub 1" stage={'Stage #2'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} /> */}
                {/* <CardPenembakAdmin penembak="Testing 2" klub="Asal Klub 2" stage={'Gagal'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                <CardPenembakAdmin penembak="Testing 3" klub="Asal Klub 3" stage={'Stage #3'} pengprov={'Pengprov 1'} penguji={'Penguji 2'} /> */}
                {loading &&
                    <section className='flex max-w-full sm:w-full px-8'>
                        <div className="relative items-center block max-w-sm sm:max-w-full sm:w-full p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                            <h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 opacity-50">Data Anda sedang dimuat</h5>
                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </section>

                }
                {!loading &&
                    shooters.map((shooter: Penembak, index: number) => (
                        <CardPenembakPengujiAdmin
                            id={id}
                            scorerId={shooter.id}
                            key={index}
                            penembak={shooter.name}
                            klub={shooter.club}
                            stage={'Stage #1'}
                            pengprov={shooter.province}
                            penguji={shooter.scorer}
                        />
                    ))
                }
            </LayoutChild>
        </Layout>
    )
}

export const DetailPengujiAdmin = (props: any) => {
    const [shooters, setShooters] = useState<Penembak[]>([]);
    const [loading, setLoading] = useState(true);
    const data = useLocation();
    // console.log(data)
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        const fetchShooters = async () => {
            try {
                // const examId = await getExamId();
                const response = await api.get(`/admin/scorer/${id}/shooter`);
                const responseScorer = await api.get(`/admin/scorer`);
                const scorers = responseScorer.data.data.scorers;

                const shooters = response.data.data.shooters.map((shooter: Penembak) => {
                    const scorer = scorers.find((s: any) => s.id === id);
                    const scorerName = scorer ? scorer.name : '';

                    return { ...shooter, scorer: scorerName };
                });
                console.log(response)

                setShooters(shooters);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchShooters();
    }, []);

    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Detail Penguji' />
            <LayoutChild>
                <section className="flex w-full items-center gap-4 ">
                    <div className="flex shadow-md rounded-xl items-center w-1/6">
                        <img className='min-w-[65px] ' src={user2} />
                    </div>
                    <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                        <h1 className="text-base font-bold text-gray-800">Nama Lengkap</h1>
                        <p className="text-sm text-gray-600 ">{data.state}</p>
                    </div>
                </section>
            </LayoutChild>
            <LayoutChild className='flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>Penembak Yang Diuji :</h3>
                </span>
                {loading &&
                    <section className=' flex max-w-full px-8'>
                        <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                            <h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 opacity-50">Data Anda sedang dimuat</h5>
                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </section>

                }
                {!loading &&
                    shooters.map((shooter: Penembak, index: number) => (
                        <CardPenembakAdminBiasa
                            id={id}
                            scorerId={shooter.id}
                            key={index}
                            penembak={shooter.name}
                            klub={shooter.club}
                            stage={'Stage #1'}
                            pengprov={shooter.province}
                            penguji={shooter.scorer}
                        />
                    ))
                }
            </LayoutChild>
        </Layout>
    )
}


export const DetailPengujiAdmin2 = (props: any) => {
    const [shooters, setShooters] = useState<Penembak[] | any>([]);
    const [initialFetchDone, setInitialFetchDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const data = useLocation();
    // console.log(data)
    const { id } = useParams();
    useEffect(() => {
        const fetchShooters = async () => {
            try {
                // const examId = await getExamId();
                const response = await api.get(`/admin/scorer/${id}/shooter`);
                // console.log(response)
                const responseScorer = await api.get(`/admin/scorer`);
                // const getScorerId = await api.get(`/admin/scorer/${id}`)

                const scorers = responseScorer.data.data.scorers;

                const shooters = response.data.data.shooters.map((shooter: Penembak) => {
                    const scorer = scorers.find((s: any) => s.id === id);
                    const scorerName = scorer ? scorer.name : '';

                    return { ...shooter, scorer: scorerName };
                });
                console.log(response)

                setShooters(shooters);
                setInitialFetchDone(true);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchShooters();
    }, []);

    useEffect(() => {
        console.log('initial Fect Done!')
        console.log(initialFetchDone)
        if (initialFetchDone) {
            const fetchShooters = async () => {
                try {
                    // const examId = superAdminCtx?.getExamId();
                    const response = await api.get(`/admin/result`);
                    const shootersStage: Stage[] = response.data.data.results;

                    const updatedShooters = shooters.map((shooter: Shooter) => {
                        const matchingStage = shootersStage.find(stage => stage.id === shooter.id);
                        return {
                            ...shooter,
                            stage: matchingStage ? matchingStage.stage : 'N/A'
                        };
                    });

                    setShooters(updatedShooters);
                } catch (error) {
                    const err = error as AxiosError<ResponseData<null>>;
                    console.error("Error:", err);
                }
            };
            fetchShooters();
            // const interval = setInterval(fetchShooters, 5000); // Fetch every 5 seconds, you can adjust the interval as needed

            // return () => clearInterval(interval);
        }
    }, [initialFetchDone]);
    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Detail Penguji' />
            <LayoutChild>
                <section className="flex w-full items-center gap-4 ">
                    <div className="flex shadow-md rounded-xl sm:shadow-sm items-center w-1/6">
                        <img className='min-w-[65px] sm:min-w-[80px]' src={user2} />
                    </div>
                    <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                        <h1 className="text-base sm:text-lg font-bold text-gray-800">Nama Lengkap</h1>
                        <p className="text-sm sm:text-base text-gray-600 ">{data.state}</p>
                    </div>
                </section>
            </LayoutChild>
            <LayoutChild className='flex-col gap-4 h-[750px] sm:h-auto py-8'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>Penembak Yang Diuji :</h3>
                </span>
                {loading &&
                    <section className='flex w-full max-w-full px-8'>
                        <div className="relative items-center block w-full max-w-full p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                            <h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 opacity-50">Data Anda sedang dimuat</h5>
                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </section>

                }
                {!loading &&
                    shooters.map((shooter: Shooter, index: number) => (
                        <CardPenembakAdminBiasa
                            id={shooter.id}
                            scorerId={id}
                            key={index}
                            penembak={shooter.name}
                            klub={shooter.club}
                            stage={shooter.stage === '0' ? 'Ujian Kualifikasi' : (shooter.stage !== undefined && shooter.stage !== null ? `Stage ${shooter.stage}` : 'Loading...')}
                            pengprov={shooter.province}
                            penguji={shooter.scorer}
                        />
                    ))
                }
            </LayoutChild>
        </Layout>
    )
}

export default DetailPenguji