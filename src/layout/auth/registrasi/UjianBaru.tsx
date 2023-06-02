import React from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { Link } from 'react-router-dom'
import calenderExtraSmall from '../../../app-assets/calender_extrasmall.png';
const UjianBaru = () => {
    return (
        <Layout className={'rounded-3xl mt-20 mb-[5%]'}>
            <LayoutChild className='flex-col'>
                <div className='max-w-full text-center text-[#036BB0]'>
                    <h1 className='pb-2 text-4xl font-extrabold'>Ujian Baru</h1>
                    <h4 className='text-base text-[#6A7682] font-normal'>Silahkan melakukan pengisian data untuk memulai ujian baru.</h4>
                </div>
                <form className='flex flex-col w-full h-auto justify-between gap-8 pt-14'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="nama" className="block mb-2 text-sm font-bold text-gray-900">Nama</label>
                            <input name='nama' type="text" id="nama" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="lokasi" className="block mb-2 text-sm font-bold text-gray-900">Lokasi</label>
                            <input name='lokasi' type="text" id="lokasi" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="organizer" className="block mb-2 text-sm font-bold text-gray-900">Organizer</label>
                            <input name='organizer' type="text" id="organizer" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="flex gap-2 flex-col mb-4">
                            <div className='flex w-full justify-between'>
                                <label htmlFor="waktu" className="block text-sm font-bold text-gray-900">Waktu</label>
                                <img className='w-[23px] h-[24px]' src={calenderExtraSmall} alt='Calender-Small' />
                            </div>
                            <div className='flex w-full justify-between items-center gap-2'>
                                <input type="date" id="date-awal" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                <span className='w-[12px] border border-black/30 rounded-full'></span>
                                <input type="date" id="date-akhir" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                        </div>
                       
                    </section>
                    <div className='flex flex-col gap-4'>
                        <Link to={'/superadmin/adminregis'} type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Selanjutnya</Link>
                    </div>
                </form>
            </LayoutChild>
        </Layout>
    )
}

export default UjianBaru