import React from 'react'
import imgDetail1 from '../../app-assets/userdetail.png';
import close from '../../app-assets/close.png';
import Modal from './Modal';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { LayoutChild } from '../Layout';


export const Detail = (props: any) => {
    const shooterId = props.id;
    // console.log(props)
    const parsedStage = parseInt(props.stage);
    const stageWithText = isNaN(parsedStage) ? props.stage : `Stage ${parsedStage}`;
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full sm:max-w-md h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.penembak}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>PengProv</h6>
                            <h4>: {props.pengprov}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Asal Klub</h6>
                            <h4>: {props.klub}</h4>
                        </span>
                        {/* <span className='flex justify-between w-full'>
                            <h6>Penguji</h6>
                            <h4>: {props.penguji}</h4>
                        </span> */}
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {stageWithText}
                        </span>
                        {props.stage === '0' ? <Link to={`kualifikasi_ketentuan/${shooterId}`} className='w-full items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Mulai Ujian</Link> : null}
                        <Link to={`/penguji/stage${props.stage}_aturan/${shooterId}`} className='w-full items-center text-center px-4 py-3 border-2 border-solid text-gray-900 bg-transparent rounded-lg' >Lanjut Ujian</Link>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}

export const DetailAdmin = (props: any) => {
    const navigate = useNavigate();
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full sm:max-w-md h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.penembak}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>PengProv</h6>
                            <h4>: {props.pengprov}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Asal Klub</h6>
                            <h4>: {props.klub}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Penguji</h6>
                            <h4>: {props.penguji}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {props.stage}
                        </span>
                        <div className='flex w-full items-center gap-4 justify-between'>
                            <button onClick={() => navigate(-1)} className='w-[55%] items-center text-sm text-center font-semibold px-2 py-3 text-[#FC443E] border border-red-500 bg-transparent rounded-lg' >Hapus Penembak</button>
                            <Link to={'/admin/penembak/editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link>
                            {/* <Link to={'editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link> */}
                        </div>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}

export const DetailPenembakAdminBiasa = (props: any) => {
    const imageUrl = `${import.meta.env.VITE_API_URL}/media/${props.image_path}`;
    const navigate = useNavigate();
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full sm:max-w-md h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imageUrl} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.penembak}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>PengProv</h6>
                            <h4>: {props.pengprov}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Asal Klub</h6>
                            <h4>: {props.klub}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Penguji</h6>
                            <h4>: {props.penguji}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {props.stage}
                        </span>
                        <div className='flex w-full items-center gap-4 justify-between'>
                            <button onClick={() => navigate(-1)} className='w-[55%] items-center text-sm text-center font-semibold px-2 py-3 text-[#FC443E] border border-red-500 bg-transparent rounded-lg' >Hapus Penembak</button>
                            <Link to={`/admin/penembak/editpenembak/${props.id}/${props.scorer_id}`} className='w-[55%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Penembak</Link>
                            {/* <Link to={'editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link> */}
                        </div>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}

export const DetailPenembakAdmin = (props: any) => {
    const imageUrl = `${import.meta.env.VITE_API_URL}/media/${props.image_path}`;
    const navigate = useNavigate();
    console.log(props)
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full sm:max-w-md h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imageUrl} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.penembak}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>PengProv</h6>
                            <h4>: {props.pengprov}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Asal Klub</h6>
                            <h4>: {props.klub}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Penguji</h6>
                            <h4>: {props.penguji}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {props.stage}
                        </span>
                        <div className='flex w-full items-center gap-4 justify-between'>
                            <button onClick={() => navigate(-1)} className='w-[55%] items-center text-sm text-center font-semibold px-2 py-3 text-[#FC443E] border border-red-500 bg-transparent rounded-lg' >Hapus Penembak</button>
                            <Link to={`/superadmin/tabs/admindashboard/editpenembak/${props.id}/${props.scorer_id}`} className='w-[50%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Penembak</Link>
                            {/* <Link to={'editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link> */}
                        </div>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}

export const DetailPengujiAdmin = (props: any) => {
    const navigate = useNavigate();
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full sm:max-w-md h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.name}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>Username</h6>
                            <h4>: {props.username}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {props.stage}
                        </span>
                        <div className='flex w-full items-center gap-4 justify-between'>
                            <button onClick={() => navigate(-1)} className='w-[55%] items-center text-sm text-center font-semibold px-2 py-3 text-[#FC443E] border border-red-500 bg-transparent rounded-lg' >Hapus Penembak</button>
                            <Link to={`/superadmin/tabs/admindashboard/editpenembak/${props.id}`} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Penguji</Link>
                            {/* <Link to={'editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link> */}
                        </div>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}

export const DetailSuperAdmin = (props: any) => {
    const navigate = useNavigate();
    const data = useLocation();

    // const { id } = useParams();
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full sm:max-w-md h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2 className='capitalize'>{props.admin}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>Username</h6>
                            <h4 className='capitalize'>: {props.username}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <div className='flex w-full items-center gap-4 justify-between'>
                            <button onClick={() => navigate(-1)} className='w-[55%] items-center text-sm text-center font-semibold px-2 py-3 text-[#FC443E] border border-red-500 bg-transparent rounded-lg' >Hapus Penembak</button>
                            <Link to={`/superadmin/tabs/admindashboard/editadmin/${props.id}`} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Admin</Link>
                            {/* <Link to={'editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link> */}
                        </div>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}