import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardPenembak } from '../../components/ui/Card';

const Penembak = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4 '>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penembak</h3>
                    </span>
                    <CardPenembak penembak="Testing 1" klub="Asal Klub 1" stage={'Stage #2'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 2" klub="Asal Klub 2" stage={'Gagal'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 3" klub="Asal Klub 3" stage={'Ujian Klasifikasi 20 Meter'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 4" klub="Asal Klub 4" stage={'Stage #4'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 5" klub="Asal Klub 5" stage={'Stage #5'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 6" klub="Asal Klub 6" stage={'Stage #6'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                    <CardPenembak penembak="Testing 6" klub="Asal Klub 6" stage={'Stage #6'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                </LayoutChild>
            </Layout>
        </>
    )
}

export default Penembak