import React from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/ui/Card';
import user1 from '../../app-assets/user1.png';
import avatar from '../../app-assets/avatar.png';
import { BgHeader } from '../../components/Header';
const Penembak = () => {
    return (
        <>
            {/* <section className='absolute w-full top-0 flex max-w-full px-10 pt-10 pb-20 bg-blue-600 z-[-1]'>
                1
            </section> */}
            <Layout className={'rounded-3xl mt-28 pt-[10%]'}>
                <BgHeader>
                    <div className='flex items-start justify-between w-full'>
                        <section className='flex flex-col items-start'>
                            <h2>Halo, Penguji</h2>
                            <h5>Nama Penguji 1</h5>
                        </section>
                        <section>
                            <button>
                                <img src={avatar} />
                            </button>
                        </section>
                    </div>
                </BgHeader>
                <Card>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penembak</h3>
                    </span>
                    <div className="flex max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                        <div className="flex items-center w-1/6">
                            <img className='min-w-[65px]' src={user1} />
                        </div>
                        <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                            <h1 className="text-base font-bold text-gray-800">Nama Penembak 1</h1>
                            <p className="text-sm text-gray-600 ">Asal Klub 1</p>
                            <div className="flex justify-between item-center">
                                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded">Stage 2</button>
                            </div>
                        </div>
                        <div className="flex items-center w-1/6">
                            <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                        <div className="flex items-center w-1/6">
                            <img className='min-w-[65px]' src={user1} />
                        </div>
                        <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                            <h1 className="text-base font-bold text-gray-800">Nama Penembak 1</h1>
                            <p className="text-sm text-gray-600 ">Asal Klub 1</p>
                            <div className="flex justify-between item-center">
                                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded">Stage 2</button>
                            </div>
                        </div>
                        <div className="flex items-center w-1/6">
                            <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                        <div className="flex items-center w-1/6">
                            <img className='min-w-[65px]' src={user1} />
                        </div>
                        <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                            <h1 className="text-base font-bold text-gray-800">Nama Penembak 1</h1>
                            <p className="text-sm text-gray-600 ">Asal Klub 1</p>
                            <div className="flex justify-between item-center">
                                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded">Stage 2</button>
                            </div>
                        </div>
                        <div className="flex items-center w-1/6">
                            <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                        <div className="flex items-center w-1/6">
                            <img className='min-w-[65px]' src={user1} />
                        </div>
                        <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                            <h1 className="text-base font-bold text-gray-800">Nama Penembak 1</h1>
                            <p className="text-sm text-gray-600 ">Asal Klub 1</p>
                            <div className="flex justify-between item-center">
                                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded">Stage 2</button>
                            </div>
                        </div>
                        <div className="flex items-center w-1/6">
                            <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                        </div>
                    </div>
                </Card>
            </Layout>
        </>
    )
}

export default Penembak