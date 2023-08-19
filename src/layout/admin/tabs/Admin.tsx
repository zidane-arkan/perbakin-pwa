import React, { useEffect, useMemo, useState, useContext } from 'react'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
import api from '../../../api/api';
import { AuthContext } from '../../../context/AuthContext';
// Gambar
// import avatar from '../../../app-assets/avatar.png';
import targetWhite from '../../../app-assets/targetwhite.png'
import mapPin from '../../../app-assets/map_pin.png'
import clock from '../../../app-assets/clock.png'
import peluruBulat from '../../../app-assets/pelurubulat.png';
import tambahPenguji from '../../../app-assets/tambahpenguji.png'
// react router dom
import { Link } from 'react-router-dom';

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
    scorer?: string,
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
    const fetchTableData = async () => {
        try {
            const examId = superAdminCtx?.getExamId();

            const [resultResponse, shooterResponse] = await Promise.all([
                api.get<ApiResponse>(`/admin/result`),
                api.get<ShooterApiResponse>(`/admin/shooter`)
            ]);

            const resultApiData = resultResponse.data.data;
            const shooterApiData = shooterResponse.data.data;
            console.log(shooterApiData)
            // Process result data
            const resultData = resultApiData.results.slice(0, 4).map(result => ({
                ...result,
                examid: examId,
                shooterid: null as string | null,
                scorerid: null as string | null,
                scorer: null as string | null,
            }));

            // Process shooter data and merge into resultData
            shooterApiData.shooters.forEach(shooter => {
                const existingResult: any = resultData.find(result => result.id === shooter.id);
                if (existingResult) {
                    existingResult.scorer = shooter.scorer;
                    existingResult.shooterid = shooter.id;
                    existingResult.scorerid = shooter.scorer_id;
                }
            });
            // console.log(resultData)
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
                        </tr>
                    </thead>
                    <tbody>
                        {resultData.map((item: any) => (
                            <tr key={item.shooterid} className={item.failed ? "bg-[#F3FAFF] text-black" : "bg-white text-black border-blue-400"}>
                                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.scorer}
                                </td>
                                <td className="px-6 py-4">
                                    {item.province}
                                </td>
                                <td className="px-6 py-4">
                                    {item.failed ? "Gagal" : "Lulus"} / Stage {item.stage}
                                </td>
                                {/* <td className="px-6 py-4">
                                    EditHasilUjian Or Stage6Super (/konfirmasi/stage6super)
                                    <Link to={`/superadmin/tabs/admindashboard/edithasiujian/${item.examid}/${item.scorerid}/${item.shooterid}`} className="font-medium text-green-400 hover:underline" type='button'>
                                        Edit Hasil
                                    </Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>

    );
}
const Admin = (props: any) => {
    return (
        <>
            <LayoutChild className='flex-col gap-8'>
                <section className='flex items-center w-full justify-between'>
                    <h2 className='font-bold'>Tentang Ujian</h2>
                    {/* <Link to='editujian'>
                        <span className='text-[#1B79B8]' >Edit Ujian</span>
                    </Link> */}
                </section>
                <section className='relative shadow-md overflow-hidden flex bg-[#F3FAFF] flex-col gap-4 items-start rounded-xl px-4 py-4'>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={mapPin} />
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold'>Lokasi</h3>
                            <p>Sumatera Selatan</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={clock} />
                        <div>
                            <h3 className='font-bold'>Waktu</h3>
                            <p>24 - 25 Mei 2023</p>
                        </div>
                    </div>
                    <span className='absolute top-[-3rem] right-[-4rem]'>
                        <img src={targetWhite} />
                    </span>
                </section>
                <section className='flex items-center gap-6'>
                    <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full sm:w-1/2' to='tambahpenembak'>
                        <div className='flex gap-2 items-center'>
                            <img src={peluruBulat} />
                            <span className='font-xl'>Tambah Penembak</span>
                        </div>
                    </Link>
                    <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full sm:w-1/2' to='tambahpenguji'>
                        <div className='flex gap-2 items-center'>
                            <img src={tambahPenguji} />
                            <span className='font-xl'>Tambah Penguji</span>
                        </div>
                    </Link>
                </section>
                <TabelHasilUjian />
            </LayoutChild>
        </>
    )
}

export default Admin