import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
const Tabs = () => {
    const Style = styled.section`
        .active{
            color: #1B79B8;
        }
        .box-shadows{
            box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
        }
    `;
    return (
        <Style>
            <section className="box-shadows xl:hidden fixed inset-x-0 bottom-0 z-50 block text-black bg-white shadow-lg border-royal/20 backdrop-blur-lg">
                <div id="tabs" className="flex justify-between px-0 py-4 ">
                    <NavLink to="penguji" className="justify-center inline-block w-full pt-2 pb-2 text-center focus:text-royal hover:text-royal hover:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1 h-7" fill="none" viewBox="0 0 47 47" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.05 39h6.9V26.15H30.1V39h6.85V19.55L24 9.85l-12.95 9.7ZM7.4 42.65V17.7L24 5.3l16.6 12.4v24.95H26.45V29.8H21.6v12.85ZM24 24.4Z"></path>
                        </svg>
                        <span className="block text-xs tab">Dashboard</span>
                    </NavLink>
                    <NavLink to="penembak" className="justify-center inline-block w-full pt-2 pb-1 text-center focus:text-royal hover:text-royal hover:bg-white" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1 h-7 w-7" fill="none" viewBox="0 0 47 47" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M35.4 29.6q-2.4 0-3.975-1.55-1.575-1.55-1.575-3.95 0-2.35 1.55-3.925 1.55-1.575 3.95-1.575 2.35 0 3.9 1.55 1.55 1.55 1.55 3.9 0 2.4-1.525 3.975Q37.75 29.6 35.4 29.6ZM24.75 41.5v-3.3q0-1.5.675-2.65t1.925-1.8q1.85-.85 3.9-1.325t4.1-.475q2.05 0 4.025.475 1.975.475 3.925 1.325 1.2.65 1.925 1.8.725 1.15.725 2.65v3.3ZM19.2 23.35q-3.8 0-6.2-2.4-2.4-2.4-2.4-6.2 0-3.8 2.4-6.2 2.4-2.4 6.2-2.4 3.8 0 6.25 2.375t2.45 6.225q0 3.8-2.45 6.2-2.45 2.4-6.25 2.4Zm0-8.6ZM2.15 41.5v-5.8q0-2.05 1.05-3.725 1.05-1.675 3-2.575 3.45-1.55 6.625-2.325Q16 26.3 19.2 26.3q1.7 0 3.125.175T25.45 27q-.95 1-1.9 1.975-.95.975-1.9 1.975-.5-.05-1.125-.05H19.2q-2.7 0-5.225.475-2.525.475-5.625 1.975-.75.3-1.2 1.05-.45.75-.45 1.5v1.05h14.95v4.55Zm19.5-4.55ZM19.2 18.8q1.75 0 2.925-1.175Q23.3 16.45 23.3 14.75q0-1.75-1.15-2.925Q21 10.65 19.2 10.65q-1.7 0-2.875 1.175T15.15 14.75q0 1.7 1.175 2.875T19.2 18.8Z"></path>
                        </svg>
                        <span className="block text-xs tab">Penembak</span>
                    </NavLink>
                    <NavLink to="penguji" className="justify-center inline-block w-full pt-2 pb-1 text-center focus:text-royal hover:text-royal hover:bg-white" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1 h-7 w-7" fill="none" viewBox="0 0 47 47" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.25 11V6.4h33.6V11Zm.2 30.55v-12.9H4.9V24.1L7.25 14H40.8l2.35 10.1v4.55h-2.6v12.9H36v-12.9h-7.9v12.9Zm4.6-4.55h11.5v-8.35h-11.5ZM9.5 24.1h29.05Zm0 0h29.05l-1.2-5.55h-26.6Z"></path>
                        </svg>
                        <span className="block text-xs tab">Penguji</span>
                    </NavLink>
                </div>
            </section>
        </Style>
    )
}

export default Tabs