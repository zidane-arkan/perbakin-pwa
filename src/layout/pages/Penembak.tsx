import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardPenembak } from '../../components/ui/Card';
import user1 from '../../app-assets/user1.png';
import avatar from '../../app-assets/avatar.png';
import { BgHeader } from '../../components/Header';
const Penembak = () => {
    return (
        <>
            <Layout className={'rounded-3xl mt-36 pt-[10%]'}>
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
                <LayoutChild className='flex-col'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penembak</h3>
                    </span>
                    <CardPenembak penembak="Testing 1" klub="Asal Klub 1" />
                    <CardPenembak penembak="Testing 2" klub="Asal Klub 2" />
                    <CardPenembak penembak="Testing 3" klub="Asal Klub 3" />
                    <CardPenembak penembak="Testing 4" klub="Asal Klub 4" />
                    <CardPenembak penembak="Testing 5" klub="Asal Klub 5" />
                    <CardPenembak penembak="Testing 6" klub="Asal Klub 6" />
                </LayoutChild>
            </Layout>
        </>
    )
}

export default Penembak