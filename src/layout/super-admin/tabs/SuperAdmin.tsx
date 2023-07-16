import React, { useEffect, useMemo, useState, useContext } from 'react'
import { LayoutChild } from '../../../components/Layout'
import api from '../../../api/api';
import { HandlerResponse } from '../../../context/response';
import { AuthContext } from '../../../context/AuthContext';
import { AxiosError } from 'axios';
import { ResponseData } from '../../../context/response';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import styled from 'styled-components';
// Gambar
// import avatar from '../../../app-assets/avatar.png';
import targetWhite from '../../../app-assets/targetwhite.png'
import mapPin from '../../../app-assets/map_pin.png'
import clock from '../../../app-assets/clock.png'
import peluruBulat from '../../../app-assets/pelurubulat.png';
import tambahPenguji from '../../../app-assets/tambahpenguji.png'
import kelolaadmin from '../../../app-assets/kelolaadmin.png'
// react router dom
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

type HasilUjian = {
    no: string
    nama: string
    pengprov: string
    klub: string
    status: string
}
// const Styles = styled.div`
//     padding: 1rem 0;
//     overflow : scroll;
//     table {
//         width: 100%;
//         text-align: center;
//         border-spacing: 0;
//         border-right: 2px solid #D5E4F0;
//         border-left: 2px solid #D5E4F0;
//         border-bottom: 2px solid #D5E4F0;
//         border-radius : 12px;
//     tr {
//         :last-child {
//             tr{
//                 border-bottom: 0;
//             }
//             td {
//                 border-bottom: 0;
//             }
//         }
//     }
//     thead{
//         font-size: 1rem;
//         color : white;
//         background-color : #036BB0;
//     }
//     th{
//         font-size: 1rem;
//         margin: 0;
//         padding: 0.5rem;
//         border-bottom: 2px solid #D5E4F0;
//         border-right: 2px solid #D5E4F0;
//         border-left: 2px solid #D5E4F0;
//     }
//     td {
//         font-size: .9rem;
//         margin: 0;
//         padding: 0.3rem;
//         border-bottom: 2px solid #D5E4F0;
//         border-right: 2px solid #D5E4F0;
//         border-left: 2px solid #D5E4F0;
//         z-index: -1;
//     }
//     }

//     .pagination {
//     padding: 0.5rem;
//     }
// `

// const defaultData: HasilUjian[] = [
//     {
//         no: '1',
//         nama: 'linsley',
//         pengprov: 'Sumsel',
//         klub: 'Klub 1',
//         status: 'Stage 2',
//     },
//     {
//         no: '2',
//         nama: 'miller',
//         pengprov: 'Sumsel',
//         klub: 'Klub 2',
//         status: 'Gagal',
//     },
// ];
// const columnHelper = createColumnHelper<HasilUjian>()
// const columns = [
//     columnHelper.accessor('no', {
//         cell: info => info.getValue(),
//         header: () => <span>No</span>,
//     }),
//     columnHelper.accessor('nama', {
//         cell: info => info.getValue(),
//         header: () => <span>Nama</span>,
//     }),
//     columnHelper.accessor('pengprov', {
//         cell: info => info.getValue(),
//         header: () => <span>Pengprov</span>,
//     }),
//     columnHelper.accessor('klub', {
//         cell: info => info.getValue(),
//         header: () => <span>Klub</span>,
//     }),
//     columnHelper.accessor('status', {
//         cell: info => info.getValue(),
//         header: () => <span>Status</span>,
//     }),
// ];

const TabelHasilUjian = () => {
    return (
        <section>
            <div className='flex w-full justify-between items-center'>
                <h2 className='font-bold'>Hasil Ujian</h2>
                <Link to='hasilujian'>
                    <span className='text-[#1B79B8]' >Lihat Selengkapnya</span>
                </Link>
            </div>
            <section className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4 sm:pt-8">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100 ">
                    <thead className="text-xs text-black uppercase bg-white">
                        <tr>
                            <th scope="col" className=" px-6 py-3">
                                Nama Peserta
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Penguji
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tempat Pengujian
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hasil Ujian
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white text-black border-blue-400">
                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                Siti
                            </th>
                            <td className="px-6 py-4">
                                Dani
                            </td>
                            <td className="px-6 py-4">
                                Lapangan Tembak Palembang
                            </td>
                            <td className="px-6 py-4">
                                Lulus
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-green-400 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="bg-[#F3FAFF] text-black">
                            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                Joyo
                            </th>
                            <td className="px-6 py-4">
                                Dani
                            </td>
                            <td className="px-6 py-4">
                                Lapangan Tembak Satu Nusa
                            </td>
                            <td className="px-6 py-4">
                                Gagal
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-green-400 hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    );
}

const SuperAdmin = (props: any) => {
    const superAdminCtx = useContext(AuthContext);
    const [location, setLocation] = useState('');
    const [time, setTime] = useState({
        begin: '',
        finish: ''
    });

    // const getExamId = async (): Promise<string | null> => {
    //     const query =
    //         superAdminCtx &&
    //         superAdminCtx.getExamId(null);
    //     query
    //         ?.then((res) => {
    //             const response: HandlerResponse = {
    //                 message: res !== null ? res : "Exam ID is null",
    //                 error: false,
    //             };
    //             console.log(response.message)
    //             setResponse(response);
    //             if (!response.error) {
    //                 return response.message;
    //             }
    //         })
    //         .catch((err) => {
    //             const errorResponse: HandlerResponse = {
    //                 message: err.message || "An error occurred",
    //                 error: true,
    //             };
    //             setResponse(errorResponse);
    //         });
    // };
    const getExamId = async (): Promise<string | null> => {
        try {
            let latestExamId: string | null = null;
            const response = await api.get("/super/exam");
            const exams = response.data.data.exams;
            if (exams.length > 0) {
                const lastExam = exams[exams.length - 1];
                latestExamId = lastExam.id;
            }

            if (superAdminCtx?.getExamId) {
                const examId = await superAdminCtx.getExamId(null);
                return examId ?? latestExamId;
            } else {
                return latestExamId;
            }
        } catch (error) {
            const err = error as AxiosError<ResponseData<null>>;
            console.error("Error:", err);

            return null;
        }
    };


    const currentYear = new Date().getFullYear();
    const formatDate = (dateRange: string) => {
        return dayjs(dateRange).locale('id').format('D MMMM');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const examId = await getExamId(); // Memanggil fungsi getExamId untuk mendapatkan examId
                console.log(examId);
                if (examId) {
                    const response = await api.get(`/super/exam/${examId}`);
                    const { location, begin, finish } = response.data.data.exam;
                    setLocation(location);
                    setTime({
                        begin: formatDate(begin),
                        finish: formatDate(finish),
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    // try {
    //     const response = await api.get("/super/exam");
    //     console.log(response);
    //     const exams = response.data.data.exams;
    //     if (exams.length > 0) {
    //         const lastExam = exams[exams.length - 1]; // Mengambil data exam terakhir dari array
    //         const lastExamId = lastExam.id;

    //         return lastExamId;
    //     } else {
    //         return null; // Mengembalikan null jika tidak ada data exam dalam array
    //     }
    // } catch (error) {
    //     const err = error as AxiosError<ResponseData<null>>;
    //     console.error("Error:", err);

    //     return null;
    // }

    return (
        <>
            <LayoutChild className='flex-col gap-8'>
                <section className='flex items-center w-full justify-between'>
                    <h2 className='font-bold'>Tentang Ujian</h2>
                    <Link to='editujian'>
                        <span className='text-[#1B79B8]' >Edit Ujian</span>
                    </Link>
                </section>
                <section className='relative shadow-md overflow-hidden flex bg-[#F3FAFF] flex-col gap-4 items-start rounded-xl px-4 py-4'>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={mapPin} />
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold'>Lokasi</h3>
                            <p className='capitalize'>{location}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={clock} />
                        <div>
                            <h3 className='font-bold'>Waktu</h3>
                            <p>{time.begin}-{time.finish} {currentYear}</p>
                        </div>
                    </div>
                    <span className='absolute top-[-3rem] right-[-4rem]'>
                        <img src={targetWhite} />
                    </span>
                </section>
                <section className='flex text-center w-full justify-between items-center gap-6'>
                    <Link className='flex pl-1 bg-white' to='tambahpenembak'>
                        <div className='w-[63px] flex flex-col gap-2 items-center'>
                            <img className='px-2 py-2 rounded-full shadow-md' src={peluruBulat} />
                            <span className='font-xl'>Tambah Penembak</span>
                        </div>
                    </Link>
                    <Link className='flex pl-1 bg-white' to='tambahpenguji'>
                        <div className='w-[63px] flex flex-col gap-2 items-center'>
                            <img className='px-2 py-2 rounded-full shadow-md' src={tambahPenguji} />
                            <span className='font-xl'>Tambah Penguji</span>
                        </div>
                    </Link>
                    <Link className='flex pl-1 bg-white' to='kelolaadmin'>
                        <div className='w-[63px] flex flex-col gap-2 items-center'>
                            <img className='px-2 py-2 rounded-full shadow-md' src={kelolaadmin} />
                            <span className='font-xl'>Kelola admin</span>
                        </div>
                    </Link>
                </section>
                <TabelHasilUjian />
            </LayoutChild>
        </>
    )
}

export default SuperAdmin