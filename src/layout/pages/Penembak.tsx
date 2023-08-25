import React, { useState, useEffect } from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardPenembakAdmin, CardPenembak, CardPenembakAdminBiasa } from '../../components/ui/Card';
import { Link } from 'react-router-dom';

import { BgHeader } from '../../components/Header';
import { ResponseData } from '../../context/response';
import api from '../../api/api';
import { AxiosError } from 'axios';

type Props = {
    classname?: string | any;
    statusAuth?: boolean;
}

type Penembak = {
    scorer_id: string;
    id: string;
    name: string;
    stage: string;
    image_path: string;
    failed?: boolean;
    club: string;
    province: string;
    scorer: string;
}
interface PenembakAdminProps {
    shooters: string[];
}
export const Penembak = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [shooters, setShooters] = useState<Penembak[]>([]);
    const [initialFetchDone, setInitialFetchDone] = useState(false);

    const classname = `${props.classname} rounded-3xl`;

    // useEffect(() => {
    //     const fetchInitialShooters = async () => {
    //         try {
    //             const response = await api.get(`/scorer/shooter`);
    //             const shooters = response.data.data.shooters;
    //             setShooters(shooters);
    //             setInitialFetchDone(true);
    //         } catch (error) {
    //             const err = error as AxiosError<ResponseData<null>>;
    //             console.error("Error:", err);
    //         }
    //         setLoading(false);
    //     };

    //     fetchInitialShooters();
    // }, []);

    // useEffect(() => {
    //     console.log('initial Fect Done!')
    //     // console.log(shooters)
    //     if (initialFetchDone) {
    //         const fetchShooters = async () => {
    //             try {
    //                 const response = await api.get(`/scorer/result`);
    //                 const shooters = response.data.data.results;
    //                 setShooters(shooters);
    //             } catch (error) {
    //                 const err = error as AxiosError<ResponseData<null>>;
    //                 console.error("Error:", err);
    //             }
    //         };
    //         const interval = setInterval(fetchShooters, 5000); // Fetch every 5 seconds, you can adjust the interval as needed

    //         return () => clearInterval(interval);
    //     }
    // }, [initialFetchDone]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shooterResponse = await api.get(`/scorer/shooter`);
                const resultResponse = await api.get(`/scorer/result`);

                const shooterData: Penembak[] = shooterResponse.data.data.shooters;
                const resultData: Penembak[] = resultResponse.data.data.results;
                // console.log(resultData)
                const updatedShooters = shooterData.map(shooter => {
                    const correspondingResult = resultData.find(result => result.id === shooter.id);
                    if (correspondingResult) {
                        return {
                            ...shooter,
                            failed: correspondingResult.failed,
                            stage: correspondingResult.stage
                        };
                    } else {
                        return shooter;
                    }
                });
                // console.log(updatedShooters)
                setShooters(updatedShooters);
                setInitialFetchDone(true);
                setLoading(false);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
                setLoading(false);
            }
        };

        fetchData();

        // const interval = setInterval(fetchData, 5000);
        // return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (initialFetchDone) {
            const fetchResultData = async () => {
                try {
                    const latestShooterId = shooters[shooters.length - 1]?.id;

                    if (latestShooterId) {
                        const resultResponseShooter = await api.get(`/scorer/shooter/${latestShooterId}/result`);
                        console.log(resultResponseShooter);

                        // You can handle the resultResponseShooter here as needed
                    }
                } catch (error) {
                    const err = error as AxiosError<ResponseData<null>>;
                    console.error("Error:", err);
                }
            };
            fetchResultData();
            // const interval = setInterval(fetchResultData, 5000);

            // return () => clearInterval(interval);
        }
    }, [initialFetchDone, shooters]);

    if (loading) {
        return (
            <section className=' flex max-w-full sm:justify-center sm:w-full px-8 pt-60' >
                <div className="relative items-center justify-center block max-w-sm p-6 sm:max-w-xl sm:w-full bg-white border border-gray-100 rounded-lg shadow-md">
                    <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 opacity-50">Harap Tunggu Sebentar, Data Anda sedang dimuat</h5>
                    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </section >
        );
    }

    if (shooters === null || shooters.length === 0) {
        return (
            <section className=' flex max-w-full px-8 pt-60 justify-center' >
                <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                    <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">Data Penembak Belum ada</h5>
                </div>
            </section >
        );
    }

    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4 '>
                    <span className='inline text-left'>
                        <h3 className='text-lg sm:text-xl font-bold'>List Penembak</h3>
                    </span>
                    {shooters.map((shooter: Penembak, index: number) => (
                        <CardPenembak
                            id={shooter.id}
                            key={index}
                            penembak={shooter.name}
                            scorerId={shooter.scorer_id}
                            image_path={shooter.image_path}
                            klub={shooter.club}
                            stage={shooter.stage || 0}
                            statusPenembak={shooter.failed}
                            pengprov={shooter.province}
                            penguji={shooter.scorer}
                        />
                    ))

                    }
                    {/* <CardPenembak penembak="Testing 2" klub="Asal Klub 2" stage={'Gagal'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} /> */}
                    {props.statusAuth && <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='/admin/admindashboard/tambahpenembak'>
                        <span className='font-xl'>Tambah Penembak</span>
                    </Link>}
                </LayoutChild>
            </Layout>
        </>
    )
}
// useEffect Untuk POST User
// useEffect(() => {
//     console.log(shooters)
//     // useEffect ketiga untuk fetch data lain setelah kedua useEffect sebelumnya selesai
//     if (shooters.length > 0) {
//         const fetchShooterResults = async (shooterId: string) => {
//             try {
//                 const response = await api.get(`/scorer/shooter/${shooterId}/result`);
//                 const shooterResults = response.data.data.results;
//                 // Lakukan apa pun yang ingin Anda lakukan dengan data hasil shooter (shooterResults)
//             } catch (error) {
//                 console.error(`Error fetching results for shooter with ID ${shooterId}:`, error);
//             }
//         };

//         // Loop melalui setiap shooter dalam array shooters dan panggil fetchShooterResults untuk masing-masing
//         shooters.forEach((shooter) => {
//             const { id: shooterId } = shooter; // Destructuring to get the shooter_id
//             fetchShooterResults(shooterId);
//         });
//     }
// }, [shooters]);

export const PenembakAdmin: React.FC<PenembakAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4 '>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penembak</h3>
                    </span>
                    {/* <CardPenembakAdmin penembak="Testing 1" klub="Asal Klub 1" stage={'Stage #2'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} /> */}
                    {props.shooters.map((shooter: Penembak, index: string) => (

                        <CardPenembakAdminBiasa
                            id={shooter.id}
                            key={index}
                            penembak={shooter.name}
                            scorerId={shooter.scorer_id}
                            image_path={shooter.image_path}
                            klub={shooter.club}
                            stage={shooter.stage === '0' ? 'Ujian Kualifikasi' : (shooter.stage !== undefined && shooter.stage !== null ? `Stage ${shooter.stage}` : 'Loading...')}
                            pengprov={shooter.province}
                            penguji={shooter.scorer}
                        />
                    ))}
                    {props.statusAuth && <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='/admin/admindashboard/tambahpenembak'>
                        <span className='font-xl'>Tambah Penembak</span>
                    </Link>}
                </LayoutChild>
            </Layout>
        </>
    )
}

export const PenembakSuperAdmin: React.FC<PenembakAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    // console.log(props.stage)
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4 '>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penembak</h3>
                    </span>
                    {/* <CardPenembakAdmin penembak="Testing 1" klub="Asal Klub 1" stage={'Stage #2'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} /> */}
                    {props.shooters && props.shooters.length > 0 ? (
                        props.shooters.map((shooter: Penembak, index: string) => (
                            <CardPenembakAdmin
                                id={shooter.id}
                                scorerId={shooter.scorer_id}
                                key={index}
                                image_path={shooter.image_path}
                                penembak={shooter.name}
                                klub={shooter.club}
                                stage={shooter.stage ? `Stage ${shooter.stage}` : 'Loading...'}
                                pengprov={shooter.province}
                                penguji={shooter.scorer}
                            />
                        ))
                    ) : (
                        <div className="text-center">Anda belum menambahkan penembak</div>
                    )}
                    {props.statusAuth && <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='/admin/admindashboard/tambahpenembak'>
                        <span className='font-xl'>Tambah Penembak</span>
                    </Link>}
                </LayoutChild>
            </Layout>
        </>
    )
}