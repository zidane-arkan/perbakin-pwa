import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardPenguji } from '../../components/ui/Card'

const Penguji = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penguji</h3>
                    </span>
                    {/* <CardPenguji penguji={'Penguji 1'} />
                    <CardPenguji penguji={'Penguji 2'} />
                    <CardPenguji penguji={'Penguji 3'} />
                    <CardPenguji penguji={'Penguji 4'} />
                    <CardPenguji penguji={'Penguji 5'} />
                    <CardPenguji penguji={'Penguji 6'} />
                    <CardPenguji penguji={'Penguji 7'} />
                    <CardPenguji penguji={'Penguji 8'} /> */}
                    {props.userPenguji?.map((penguji: any) => {
                        return (
                            <CardPenguji key={penguji.id} id={penguji.id} penguji={penguji.penguji} />
                        )
                    })}
                </LayoutChild>
            </Layout>
        </>
    )
}

export default Penguji