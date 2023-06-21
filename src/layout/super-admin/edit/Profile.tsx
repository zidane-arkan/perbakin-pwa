import React from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import { CardText } from '../../../components/ui/Card'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Edit Profile' />
            <LayoutChild className='flex-col gap-4 h-[750px] justify-between'>
                <form className='flex flex-col w-full h-auto justify-between gap-8'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="passlama" className="block mb-2 text-sm font-bold text-gray-900">Password Lama</label>
                            <input type="password" id="passlama" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="passbaru" className="block mb-2 text-sm font-bold text-gray-900">Password baru</label>
                            <input type="password" id="passbaru" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="passconfirm" className="block mb-2 text-sm font-bold text-gray-900">Konfirmasi Password baru</label>
                            <input type="password" id="passconfirm" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
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

export default Profile