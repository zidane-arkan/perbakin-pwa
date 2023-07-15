import React, { useState } from 'react'
import user1 from '../../app-assets/user1.png';
import { Link } from 'react-router-dom'
import { Detail, DetailPenembakAdmin, DetailSuperAdmin, DetailPenembakAdminBiasa } from '../overlay/Detail';
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
    const customClass = `${props.className} flex flex-col gap-2 w-[345px] sm:w-[700px] items-start`;
    return (
        <section className={customClass}>
            <h4>{props.title}</h4>
            {props.children}
        </section>
    )
}

export const CardPenguji = (props: any) => {
    
    return (
        <>
            <section className="flex items-center max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px]' src={user1} />
                </div>
                <div className="inline-block w-4/6 pl-6 md:p-4">
                    <h1 className="text-base font-bold text-gray-800">{props.penguji}</h1>
                </div>
                <Link to={`detailpenguji/${props.id}`} state={props.penguji} className="flex items-center w-1/6">
                    <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                </Link>
            </section>
        </>
    );
}

export const CardPenguji2 = (props: any) => {

    return (
        <>
            <section className="flex items-center max-w-md sm:max-w-full sm:w-full overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px] sm:min-w-[80px]' src={user1} />
                </div>
                <div className="inline-block w-4/6 pl-6 md:p-4">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">{props.penguji}</h1>
                </div>
                <Link to={`detailpenguji2/${props.id}`} state={props.penguji} className="flex items-center w-1/6">
                    <button className="px-2 py-1 text-4xl sm:px-4 sm:py-2 text-[#036BB0]">{'>'}</button>
                </Link>
            </section>
        </>
    );
}
export const CardAdmin = (props: any) => {
    const [isCartShown, setIsCardShown] = useState(false);
    const shownCardHandler = () => {
        return setIsCardShown(!isCartShown);
    }
    return (
        <>
            {(isCartShown && true) &&
                <DetailSuperAdmin
                    id={props.id}
                    shownCardHandler={shownCardHandler}
                    admin={props.admin}
                    username={props.admin}
                />
            }
            <section className="flex items-center max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px]' src={user1} />
                </div>
                <div className="inline-block w-4/6 pl-6 md:p-4">
                    <h1 className="text-base font-bold text-gray-800">{props.admin}</h1>
                </div>
                <span className="flex items-center w-1/6">
                    <button onClick={shownCardHandler} className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                </span>
                {/* <span className="flex items-center w-1/6">
                    <button className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                </span> */}
            </section>
        </>
    );
}


export const CardPenembakAdmin = (props: any) => {
    const [isCartShown, setIsCardShown] = useState(false);
    const shownCardHandler = () => {
        return setIsCardShown(!isCartShown);
    }
    console.log(props)
    return (
        <>
            {(isCartShown && true) &&
                <DetailPenembakAdmin
                    scorer_id={props.scorerId}
                    id={props.id}
                    shownCardHandler={shownCardHandler}
                    penembak={props.penembak}
                    klub={props.klub}
                    stage={props.stage}
                    pengprov={props.pengprov}
                    penguji={props.penguji}
                />
            }
            <section className="flex max-w-md overflow-hidden bg-[#F3FAFF] sm:max-w-full sm:w-full rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px] sm:min-w-[80px]' src={user1} />
                </div>
                <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                    <h1 className="text-base font-bold text-gray-800">{props.penembak}</h1>
                    <p className="text-sm text-gray-600 ">{props.klub}</p>
                    <div className="flex justify-between item-start">
                        <button
                            className="px-2 py-1 text-[.65rem] font-bold text-white transition-colors duration-300 transform bg-[#62DE5F] rounded">
                            {props.stage}
                        </button>
                    </div>
                </div>
                <span className="flex items-center w-1/6">
                    <button onClick={shownCardHandler} className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                </span>
            </section>
        </>
    );
}

export const CardPenembakAdminBiasa = (props: any) => {
    const [isCartShown, setIsCardShown] = useState(false);
    const shownCardHandler = () => {
        return setIsCardShown(!isCartShown);
    }
    return (
        <>
            {(isCartShown && true) &&
                <DetailPenembakAdminBiasa
                    scorer_id={props.scorerId}
                    id={props.id}
                    shownCardHandler={shownCardHandler}
                    penembak={props.penembak}
                    klub={props.klub}
                    stage={props.stage}
                    pengprov={props.pengprov}
                    penguji={props.penguji}
                />
            }
            <section className="flex max-w-md overflow-hidden bg-[#F3FAFF] sm:max-w-full sm:w-full rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px] sm:min-w-[80px]' src={user1} />
                </div>
                <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">{props.penembak}</h1>
                    <p className="text-sm sm:text-base text-gray-600 ">{props.klub}</p>
                    <div className="flex justify-between item-start">
                        <button
                            className="px-2 py-1 text-[.65rem] font-bold text-white transition-colors duration-300 transform bg-[#62DE5F] rounded">
                            {props.stage}
                        </button>
                    </div>
                </div>
                <span className="flex items-center w-1/6 ">
                    <button onClick={shownCardHandler} className="px-2 py-1 sm:px-4 sm:py-2 text-4xl text-[#036BB0]">{'>'}</button>
                </span>
            </section>
        </>
    );
}


export const CardPenembakPengujiAdmin = (props: any) => {
    const [isCartShown, setIsCardShown] = useState(false);

    const shownCardHandler = () => {
        return setIsCardShown(!isCartShown);
    }
    return (
        <>
            {(isCartShown && true) &&
                <DetailPenembakAdmin
                    scorer_id={props.id}
                    id={props.scorerId}
                    shownCardHandler={shownCardHandler}
                    penembak={props.penembak}
                    klub={props.klub}
                    stage={props.stage}
                    pengprov={props.pengprov}
                    penguji={props.penguji}
                />
            }
            <section className="flex max-w-md overflow-hidden bg-[#F3FAFF] sm:max-w-full sm:w-full rounded-xl px-3 py-4 gap-4 shadow-custom">
                <div className="flex items-center w-1/6">
                    <img className='min-w-[65px]' src={user1} />
                </div>
                <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                    <h1 className="text-base font-bold text-gray-800">{props.penembak}</h1>
                    <p className="text-sm text-gray-600 ">{props.klub}</p>
                    <div className="flex justify-between item-start">
                        <button
                            className="px-2 py-1 text-[.65rem] font-bold text-white transition-colors duration-300 transform bg-[#62DE5F] rounded">
                            {props.stage}
                        </button>
                    </div>
                </div>
                <span className="flex items-center w-1/6">
                    <button onClick={shownCardHandler} className="px-2 py-1 text-4xl text-[#036BB0]">{'>'}</button>
                </span>
            </section>
        </>
    );
}

export const CardPenembak = (props: any) => {
    const [isCartShown, setIsCardShown] = useState(false);
    const shownCardHandler = () => {
        return setIsCardShown(!isCartShown);
    }
    return (
        <>
            {(isCartShown && true) &&
                <Detail
                    id={props.id}
                    shownCardHandler={shownCardHandler}
                    penembak={props.penembak}
                    klub={props.klub}
                    stage={props.stage}
                    pengprov={props.pengprov}
                    penguji={props.penguji}
                />
            }
            <section className="flex max-w-md overflow-hidden bg-[#F3FAFF] rounded-xl px-3 py-4 gap-4 sm:max-w-full sm:w-full shadow-custom">
                <div className="flex items-center w-1/6 sm:w-1/6">
                    <img className='min-w-[65px] sm:w-[80px]' src={user1} />
                </div>
                <div className="flex flex-col w-4/6 sm:w-4/6 gap-1 pl-6 md:p-4">
                    <h1 className="text-base sm:text-xl font-bold text-gray-800">{props.penembak}</h1>
                    <p className="text-sm sm:text-base text-gray-600 ">{props.klub}</p>
                    <div className="flex justify-between item-start">
                        <button
                            className="px-2 py-1 text-[.65rem] font-bold text-white transition-colors duration-300 transform bg-[#62DE5F] rounded">
                            {props.stage}
                        </button>
                    </div>
                </div>
                <span className="flex items-center w-1/6">
                    <button onClick={shownCardHandler} className="px-2 py-1 sm:px-2 sm:py-1 text-4xl sm:text-[2.5rem] text-[#036BB0]">{'>'}</button>
                </span>
            </section>
        </>
    );
}

