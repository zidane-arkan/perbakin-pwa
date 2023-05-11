import React from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import { CardText } from '../../../components/ui/Card'
import { useNavigate } from 'react-router-dom'
const Ujian = () => {
    const navigate = useNavigate();
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Edit Tentang ujian' />
            <LayoutChild className='flex-col gap-4 h-[750px] justify-between'>
                <form className='flex flex-col w-full h-auto justify-between gap-8'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="lokasi" className="block mb-2 text-sm font-bold text-gray-900">Lokasi</label>
                            <input type="text" id="lokasi" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Sumatera Selatan' required />
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
                        <div className="mb-6">
                            <label htmlFor="penyelenggara" className="block mb-2 text-sm font-bold text-gray-900">Penyelenggara</label>
                            <input type="text" id="penyelenggara" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </section>
                </form>
                <CardText>
                    <button onClick={() => navigate(-1)} className='w-full px-4 py-4 text-white text-center bg-[#036BB0] rounded-lg' type='button'>
                        Simpan
                    </button>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Ujian