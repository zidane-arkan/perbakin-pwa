import React from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { Link } from 'react-router-dom'
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
                            <label htmlFor="lokasi" className="block mb-2 text-sm font-bold text-gray-900">Lokasi</label>
                            <input type="text" id="lokasi" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  required />
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className='flex w-full justify-between'>
                                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">Waktu</label>
                                <span>1</span>
                            </div>
                            <div className='flex w-full justify-between items-center gap-2'>
                                <input type="time" id="time" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                                <span className='w-[12px] border border-black/30 rounded-full'></span>
                                <input type="date" id="date" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
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