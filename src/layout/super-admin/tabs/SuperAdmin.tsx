import React, { useEffect, useState, useContext } from 'react'
import { LayoutChild } from '../../../components/Layout'
import api from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
// import { HandlerResponse } from '../../../context/response';
// import { AxiosError } from 'axios';
// import { ResponseData } from '../../../context/response';
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

interface ResultData {
    id?: string;
    examid?: string;
    shooterid?: string;
    scorerid?: string | null | undefined | any;
    name: string;
    province: string;
    club: string;
    failed: boolean;
    stage: string;
}

interface ApiResponse {
    message: string;
    status: number;
    data: {
        results: ResultData[];
    };
}
interface ShooterData {
    id?: string,
    scorer_id?: string | null | undefined;
    shooterid?: string;
    // Other properties related to shooter
}

interface ShooterApiResponse {
    data: {
        shooters: ShooterData[];
        // Other properties related to shooters
    };
    // Other properties in the API response
}


const TabelHasilUjian = (props: any) => {
    const superAdminCtx = useContext(AuthContext);
    const [resultData, setResultData] = useState<ResultData[] | any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const fetchTableData = async () => {
    //     try {
    //         // Ganti dengan URL API yang sesuai dan shooterid dari prop atau state yang sesuai
    //         const examId = superAdminCtx?.getExamId(); // Memanggil fungsi getExamId untuk mendapatkan examId
    //         const response = await api.get<ApiResponse>(`/super/exam/${examId}/result`);
    //         const apiData = response.data;
    //         const resultData = apiData.data.results.slice(0, 4);
    //         console.log(apiData.data.results);
    //         setResultData(resultData);
    //         setIsLoading(false); // Set isLoading to false after data is fetched and set to state
    //     } catch (error) {
    //         console.error(error);
    //         setIsLoading(false); // If there is an error while fetching data, set isLoading to false to show an error message
    //     }
    // };
    const fetchTableData = async () => {
        try {
            const examId = superAdminCtx?.getExamId();

            const [resultResponse, shooterResponse] = await Promise.all([
                api.get<ApiResponse>(`/super/exam/${examId}/result`),
                api.get<ShooterApiResponse>(`/super/exam/${examId}/shooter`)
            ]);

            const resultApiData = resultResponse.data.data;
            const shooterApiData = shooterResponse.data.data;
            // console.log(shooterApiData)
            // Process result data
            const resultData = resultApiData.results.slice(0, 4).map(result => ({
                ...result,
                examid: examId,
                shooterid: null as string | null,
                scorerid: null as string | null
            }));

            // Process shooter data and merge into resultData
            shooterApiData.shooters.forEach(shooter => {
                const existingResult : any = resultData.find(result => result.id === shooter.id);
                if (existingResult) {
                    existingResult.shooterid = shooter.id;
                    existingResult.scorerid = shooter.scorer_id;
                }
            });
            console.log(resultData)
            setResultData(resultData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchTableData();
    }, []);
    if (isLoading) {
        return (
            <div className='flex flex-col w-full p-4 gap-4 border border-solid border-blue-500 rounded-xl mt-4'>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Mengambil data tabel:</h2>
                <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Menghubungkan dengan database
                    </li>
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Mengubah Bentuk data
                    </li>
                    <li className="flex items-center">
                        <div role="status">
                            <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        Memasukkan Data kedalam Tabel
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <section>
            <div className='flex w-full justify-between items-center sm:mb-6'>
                <h2 className='font-bold'>Hasil Ujian</h2>
                <Link to='hasilujian'>
                    <span className='text-[#1B79B8]' >Lihat Selengkapnya</span>
                </Link>
            </div>
            <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <thead className="text-xs text-black uppercase bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
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
                        {resultData.map((item : any) => (
                            <tr key={item.shooterid} className={item.failed ? "bg-[#F3FAFF] text-black" : "bg-white text-black border-blue-400"}>
                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.stage}
                                </td>
                                <td className="px-6 py-4">
                                    {item.province}
                                </td>
                                <td className="px-6 py-4">
                                    {item.failed ? "Gagal" : "Lulus"} / Stage {item.stage}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/superadmin/tabs/admindashboard/edithasiujian/${item.examid}/${item.scorerid}/${item.shooterid}`} className="font-medium text-green-400 hover:underline" type='button'>
                                        Edit Hasil
                                    </Link>
                                </td>
                            </tr>
                        ))}
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


    const currentYear = new Date().getFullYear();
    const formatDate = (dateRange: string) => {
        return dayjs(dateRange).locale('id').format('D MMMM');
    };
    const fetchData = async () => {
        try {
            // console.log(superAdminCtx?.getExamId())
            const examId = superAdminCtx?.getExamId(); // Memanggil fungsi getExamId untuk mendapatkan examId
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
    useEffect(() => {
        fetchData();
    }, []);



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


    // PERCOBAAN 1

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

    // PERCOBAAN 2
    // const getExamId = async (): Promise<string | null> => {
    //     try {
    //         let latestExamId: string | null = null;
    //         const response = await api.get("/super/exam");
    //         const exams = response.data.data.exams;
    //         if (exams.length > 0) {
    //             const lastExam = exams[exams.length - 1];
    //             latestExamId = lastExam.id;
    //         }
    //         if (superAdminCtx?.getExamId) {
    //             const examId = superAdminCtx.getExamId;
    //             console.log(examId)
    //             return examId ?? latestExamId;
    //         } else {
    //             return latestExamId;
    //         }
    //     } catch (error) {
    //         const err = error as AxiosError<ResponseData<null>>;
    //         console.error("Error:", err);

    //         return null;
    //     }
    // };


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