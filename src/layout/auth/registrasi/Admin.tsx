import React from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { Link } from 'react-router-dom'
const Admin = () => {
    return (
        <Layout className={'rounded-3xl mt-20 mb-[5%]'}>
            <LayoutChild className='flex-col'>
                <div className='max-w-full w-full text-center text-[#036BB0]'>
                    <h1 className='pb-2 text-4xl font-extrabold'>Admin</h1>
                    <h4 className='text-sm text-[#6A7682] font-normal'>Silahkan melakukan  registrasi sebagai Admin dan memberikan username password kepada Admin.</h4>
                </div>
                <form className='flex flex-col w-full h-auto justify-between gap-8 pt-14'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="fullname" className="block mb-2 text-sm font-bold text-gray-900">Nama Lengkap</label>
                            <input type="text" id="fullname" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Lengkap Anda" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">Username</label>
                            <input type="email" id="email" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">Password</label>
                            <input type="password" id="password" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmpass" className="block mb-2 text-sm font-bold text-gray-900">Konfirmasi Password</label>
                            <input type="password" id="confirmpass" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-blue-500 border border-gray-600 rounded focus:ring-3 focus:outline-none focus:bg-blue-500 focus:ring-blue-600" required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600">Ingat Saya</label>
                        </div>
                    </section>
                    <div className='flex flex-col gap-4'>
                        <Link to={'/superadmin/tabs/admindashboard'} type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Selanjutnya</Link>
                    </div>
                </form>
            </LayoutChild>
        </Layout>
    )
}

export default Admin