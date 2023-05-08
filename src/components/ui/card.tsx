import React, { useState } from 'react'
import user1 from '../../app-assets/user1.png';
import { Link } from 'react-router-dom'
import Detail from '../overlay/Detail';
type Props = {
    title?: string
    children?: string | JSX.Element | React.ReactNode
    className?: string
}
export const Card = (props: Props) => {
    const customClass = `${props.className} flex max-w-full`;
    return (
        <section className={customClass}>
            {props.children}
        </section>
    )
}

export const CardText = (props: Props) => {
    const customClass = `${props.className} flex flex-col gap-2 w-[345px] items-start`;
    return (
        <section className={customClass}>
            <h4>{props.title}</h4>
            {props.children}
        </section>
    )
}

export const CardPenembak = (props: any) => {

    return (
        <>
            <Detail />
            <section className="flex max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px]' src={user1} />
                </div>
                <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                    <h1 className="text-base font-bold text-gray-800">{props.penembak}</h1>
                    <p className="text-sm text-gray-600 ">{props.klub}</p>
                    <div className="flex justify-between item-center">
                        <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded">Stage 2</button>
                    </div>
                </div>
                <Link to={'/kualifikasi_ketentuan'} className="flex items-center w-1/6">
                    <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                </Link>
            </section>
        </>
    );
}