import React from 'react'
import Layout from '../../components/Layout'
const Login = () => {
    return (
        <>
            <Layout className={'pt-[20%]'}>
                <div className='max-w-full text-center text-[#036BB0]'>
                    <h1 className='pb-2 text-4xl font-extrabold'>Log In</h1>
                    <h4 className='text-base text-[#6A7682] font-normal'>Silahkan masukkan username dan password yang telah disediakan oleh admin</h4>
                </div>
                <form className='flex flex-col justify-between w-full h-screen pt-14'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">Username</label>
                            <input type="email" id="email" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">Password</label>
                            <input type="password" id="password" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-blue-500 border border-gray-600 rounded focus:ring-3 focus:outline-none focus:bg-blue-500 focus:ring-blue-600" required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600">Ingat Saya</label>
                        </div>
                   </section>
                    <div className='flex flex-col gap-4'>
                        <button type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Masuk</button>
                        <button type="submit" className="text-[#036BB0] border-2 border-[#036BB0] font-bold rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center bg-transparent hover:bg-blue-700 focus:ring-blue-800">Ujian Baru</button>
                    </div>
                </form>
            </Layout>
        </>
    )
}

export default Login