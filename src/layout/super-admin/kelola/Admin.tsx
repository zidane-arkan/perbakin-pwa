import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, LayoutAdmin, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import addUser from '../../../app-assets/adduser.png'
import { CardPenembak, CardAdmin, Card } from '../../../components/ui/Card'
const SuperAdmin = () => {
    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Kelola Admin' />
            <LayoutChild className='relative flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>List Admin :</h3>
                </span>
                <CardAdmin penguji='Admin 1' />
                <CardAdmin penguji='Admin 2' />
                <CardAdmin penguji='Admin 3' />
                <CardAdmin penguji='Admin 4' />
                <NavLink to="/superadmin/tabs/admindashboard/tambahadmin" className="absolute leading-[3.25rem] z-10 right-8 rounded-full bottom-8 w-[60px] h-[60px] justify-center bg-[#1B79B8] text-center focus:text-royal hover:text-royal hover:bg-blue-600" >
                    <img className='inline-block w-[30px] h-[30px]' src={addUser} alt="Add user" />
                </NavLink>
            </LayoutChild>
        </Layout>
    )
}

export default SuperAdmin