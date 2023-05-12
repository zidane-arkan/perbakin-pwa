import React from 'react'
import { Layout, LayoutAdmin, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import { CardPenembak } from '../../../components/ui/Card'
const SuperAdmin = () => {
    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Kelola Admin' />
            <LayoutChild className='flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>List Admin :</h3>
                </span>
                <CardPenembak penembak="Testing 1" klub="Asal Klub 1" stage={'Stage #2'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                <CardPenembak penembak="Testing 2" klub="Asal Klub 2" stage={'Gagal'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                <CardPenembak penembak="Testing 3" klub="Asal Klub 3" stage={'Stage #3'} pengprov={'Pengprov 1'} penguji={'Penguji 2'} />
            </LayoutChild>
        </Layout>
    )
}

export default SuperAdmin