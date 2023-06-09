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

    useEffect(() => {
        const fetchShooters = async () => {
            try {
                // const examId = await getExamId();
                const response = await api.get(`/scorer/shooter`);
                const shooters = response.data.data.shooters;
                setShooters(shooters);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchShooters();
    }, []);
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4 '>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penembak</h3>
                    </span>
                    {loading &&
                        < section className=' flex max-w-full px-8' >
                            <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                                <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 opacity-50">Harap Tunggu Sebentar, Data Anda sedang dimuat</h5>
                                <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </section >
                    }
                    {!loading &&
                        shooters.map((shooter: Penembak, index: number) => (
                            <CardPenembak
                                id={shooter.id}
                                key={index}
                                penembak={shooter.name}
                                scorerId={shooter.scorer_id}
                                klub={shooter.club}
                                stage={'Stage #2'}
                                pengprov={shooter.province}
                                penguji={shooter.scorer}
                            />
                        ))

                    }
                    {/* <CardPenembak penembak="Testing 2" klub="Asal Klub 2" stage={'Gagal'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} /> */}
                    {/* <CardPenembak penembak="Testing 3" klub="Asal Klub 3" stage={'Ujian Klasifikasi 20 Meter'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 4" klub="Asal Klub 4" stage={'Stage #4'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 5" klub="Asal Klub 5" stage={'Stage #5'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 6" klub="Asal Klub 6" stage={'Stage #6'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 7" klub="Asal Klub 6" stage={'Stage #6'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} /> */}
                    {props.statusAuth && <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='/admin/admindashboard/tambahpenembak'>
                        <span className='font-xl'>Tambah Penembak</span>
                    </Link>}
                </LayoutChild>
            </Layout>
        </>
    )
}
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
                            klub={shooter.club}
                            stage={'Stage #2'}
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
    console.log(props)
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
                                penembak={shooter.name}
                                klub={shooter.club}
                                stage={'Stage #1'}
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