import React from 'react'
import { BgHeaderProfile } from '../../../components/Header'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
import avatar from '../../../app-assets/avatar.png'
import { useNavigate } from 'react-router-dom'
const Penembak = () => {
    const navigate = useNavigate();
    return (
        <LayoutAdmin className={'rounded-3xl mt-[19rem] pt-[10%]'}>
            <BgHeaderProfile title='Tambah Penembak' jenis='Tambah Foto'>
                <div className='flex items-center justify-between w-full'>
                    <section className='flex flex-col items-start'>
                        <h2>Halo, Admin</h2>
                    </section>
                    <section>
                        <button>
                            <img src={avatar} />
                        </button>
                    </section>
                </div>
            </BgHeaderProfile>
            <LayoutChild className='justify-between'>
                <form className='flex flex-col w-full h-auto justify-between gap-8'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="fullname" className="block mb-2 text-sm font-bold text-gray-900">Nama Lengkap</label>
                            <input type="text" id="fullname" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="pengprov" className="block mb-2 text-sm font-bold text-gray-900">Pengprov</label>
                            <input type="text" id="pengprov" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">Asal Klub</label>
                            <input type="password" id="password" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmpass" className="block mb-2 text-sm font-bold text-gray-900">Penguji</label>
                            <input type="password" id="confirmpass" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </section>
                    <div className='flex flex-col gap-4'>
                        <button onClick={() => navigate(-1)} className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                            Simpan
                        </button>
                    </div>
                </form>
            </LayoutChild>
        </LayoutAdmin>
    )
}

export default Penembak