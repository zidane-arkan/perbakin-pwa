import React from 'react'
import { Layout, LayoutAdmin, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import { CardPenembak, CardAdmin, Card } from '../../../components/ui/Card'
const SuperAdmin = () => {
    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Kelola Admin' />
            <LayoutChild className='flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>List Admin :</h3>
                </span>
                <CardAdmin penguji='Admin 1' />
                <CardAdmin penguji='Admin 2' />
                <CardAdmin penguji='Admin 3' />
                <CardAdmin penguji='Admin 4' />
            </LayoutChild>
        </Layout>
    )
}

export default SuperAdmin