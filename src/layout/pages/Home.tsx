import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { Link } from 'react-router-dom'
import targetbig from '../../app-assets/targetbig.png';
const Home = () => {
    return (
        <section className='container relative overflow-x-hidden h-screen flex flex-col gap-4 bg-[#036BB0]'>
            <img className='absolute bottom-0' src={targetbig} alt='Target' />
            <LayoutChild className='h-screen items-end pb-8'>
                <Link
                    className='z-10 text-white h-[45px] sm:w-full rounded-lg text-base font-bold w-full px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
                    to='/login' >Masuk {'->'}</Link>
            </LayoutChild>
        </section>
    )
}

export default Home