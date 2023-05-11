import React from 'react'
import { useNavigate } from 'react-router-dom';
import target from '../app-assets/target.png';
import arrowLeft from '../app-assets/arrowleft.png';
import targetbgprofile from '../app-assets/targetbgprofile.png'
import pelurubg from '../app-assets/pelurubg.png'
import close from '../app-assets/close.png';

const IconType: string | any = {
  'close': close,
  'return': arrowLeft
};

type Props = {
  children?: string | JSX.Element | React.ReactNode
  className?: string
}
type propsBlueCustom = {
  children?: string | JSX.Element | React.ReactNode
  className?: string
  jenis?: string;
  typeIcon?: string | any
  title: string,
}
type customHeader = {
  isUseBg: boolean;
};
export const BgHeader = (props: Props) => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-10 pt-14 pb-20 bg-[#036BB0] z-[-1]'>
      <span
        style={{ backgroundImage: `url(${target})` }}
        className='absolute left-0'
      ></span>
      {props.children}
    </header>
  )
}

export const BgHeaderProfile = (props: propsBlueCustom) => {
  const navigate = useNavigate();
  return (
    <header className='absolute overflow-hidden w-full top-0 flex text-white max-w-full pt-14 bg-[#036BB0] z-[-1]'>
      <div className='flex flex-col items-center justify-between w-full'>
        <section className='px-10 flex items-center justify-between w-full'>
          <button className='w-[24px] h-[24px]' type='button' onClick={() => navigate(-1)}>
            <img src={IconType['return']} alt='icon' />
          </button>
          <h2>{props.title}</h2>
          <span></span>
       </section>
        <section className='relative w-full pt-8 flex flex-col'>
          <span className='absolute left-[-1rem] top-[1rem]'>
            <img src={pelurubg} />
          </span>
          <div className='flex flex-col gap-4 items-center justify-center z-10'>
              <button className='rounded-full bg-white w-[120px] h-[120px]'></button>
            <button className='text-sm text-white/60'>{props.jenis}</button>
          </div>
          <span className='absolute right-[-2rem] top-[2rem] z-0'>
            <img src={targetbgprofile} />
          </span>
        </section>
        <span className='pb-28'></span>
      </div>
    </header>
  )
}

export const HeaderWhite = (props: Props) => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-8 pt-14 pb-20 bg-[#fff] z-[-1]'>
      {props.children}
    </header>
  )
}

export const HeaderWhiteCustom = (props: propsBlueCustom) => {
  const navigate = useNavigate();
  return (
    <HeaderWhite>
      <div className='flex flex-row items-center justify-between w-full'>
        <button className='w-[24px] h-[24px]' type='button' onClick={() => navigate(-1)}>
          <img src={IconType[props.typeIcon]} alt='icon' />
        </button>
        <h2 className='text-black text-lg'>{props.title}</h2>
        <span></span>
      </div>
    </HeaderWhite>
  );
}

export const HeaderBlue = (props: Props) => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-10 pt-14 pb-20 bg-[#036BB0] z-[-1]'>
      {props.children}
    </header>
  )
}



export const HeaderBlueCustom = (props: propsBlueCustom) => {
  const navigate = useNavigate();
  return (
    <HeaderBlue>
      <div className='flex flex-row items-center justify-between w-full'>
        <button className='w-[24px] h-[24px]' type='button' onClick={() => navigate(-1)}>
          <img src={IconType[props.typeIcon]} alt='icon' />
        </button>
        <h2>{props.title}</h2>
        <span></span>
      </div>
    </HeaderBlue>
  );
}