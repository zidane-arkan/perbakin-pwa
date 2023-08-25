import React, { useEffect, useContext, useState } from 'react'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { Layout, LayoutChild } from '../../components/Layout'
import { HeaderWhiteCustom } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
// Gambar
import arrowdown from '../../app-assets/arrowdown.png'
// react router dom
import { Link } from 'react-router-dom';

interface ResultData {
    id: string;
    name: string;
    scorer?: string;
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
type HasilUjian = {
    no: string
    nama: string
    pengprov: string
    klub: string
    status: string
}

const TabelHasilUjianAll = ({ id }: any) => {
    const superAdminCtx = useContext(AuthContext);
    const [resultData, setResultData] = useState<ResultData[] | any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    // HANDLE DOWNLOAD PDF
    const handleDownloadPdf = () => {
        // Membuat screenshot dari tabel menggunakan html2canvas
        html2canvas(document.querySelector('#tabelHasilUjianAll') as HTMLElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('hasil_ujian.pdf');
        });
    };
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
            const resultData = resultApiData.results.map(result => ({
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
            <form className='flex w-full h-auto items-center justify-between pb-8'>
                <div className="w-[80%] relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#1B79B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input
                        type="text" className="w-full py-3 pl-10 pr-4 shadow-md text-gray-700 bg-white border rounded-full focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        placeholder="Cari Nama"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={handleDownloadPdf} type='button' className="flex items-center justify-center w-[15%] h-full sm:w-auto sm:px-4 sm:py-4 rounded-full bg-[#1B79B8]">
                    <img src={arrowdown} alt='arrow-down' />
                </button>
            </form>
            <div id="tabelHasilUjianAll" className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        {resultData
                            .filter((item: any) =>
                                item.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((item: any) => (
                                <tr key={item.id} className={item.failed ? "bg-[#F3FAFF] text-black" : "bg-white text-black border-blue-400"}>
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
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const HasilUjian = () => {
    // const navigate = useNavigate();
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Hasil Ujian' />
            <LayoutChild className='flex-col gap-4 h-auto'>
                {/* <form className='flex w-full h-auto items-center justify-between'>
                    <div className="w-[80%] relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#1B79B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                        <input type="text" className="w-full py-3 pl-10 pr-4 shadow-md text-gray-700 bg-white border rounded-full focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Cari" />
                    </div>
                    <button onClick={handleDownloadPdf} type='button' className="flex items-center justify-center w-[15%] h-full sm:w-auto sm:px-4 sm:py-4 rounded-full bg-[#1B79B8]">
                        <img src={arrowdown} alt='arrow-down' />
                    </button>
                </form> */}
                <TabelHasilUjianAll />
                <section className='flex w-full justify-between items-start'>
                    <div className='flex flex-col gap-4 items-start'>
                        <span className='flex gap-2 text-[#62DE5F]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#62DE5F]'></div>
                            Lulus
                        </span>
                        {/* <span className='flex gap-2 text-[#E9D528]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#E9D528]'></div>
                            Akan Memulai
                        </span> */}
                    </div>
                    <div className='flex flex-col gap-4 items-start'>
                        <span className='flex gap-2 text-[#FC443E]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#FC443E]'></div>
                            Gagal
                        </span>
                        {/* <span className='flex gap-2 text-[#0047FF]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#0047FF]'></div>
                            Lulus Ujian
                        </span> */}
                    </div>
                </section>
            </LayoutChild>
        </Layout>
    );
}
export default HasilUjian