import React from 'react'
import target from '../app-assets/target.png';
import arrowLeft from '../app-assets/arrowleft.png';
import close from '../app-assets/close.png';
type Props = {
  children?: string | JSX.Element | React.ReactNode
  className?: string
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

export const HeaderBlue = (props: Props) => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-10 pt-14 pb-20 bg-[#036BB0] z-[-1]'>
      {props.children}
    </header>
  )
}

type propsBlueCustom = {
  children?: string | JSX.Element | React.ReactNode
  className?: string
  title: string,
  typeIcon: string
}
const IconType: string | any = {
  'close': close,
  'return': arrowLeft
};

export const HeaderBlueCustom = (props: propsBlueCustom) => {
  return (
    <HeaderBlue>
      <div className='flex flex-row items-center justify-between w-full'>
        <button className='w-[24px] h-[24px]' type='button'>
          <img src={IconType[props.typeIcon]} alt='icon' />
        </button>
        <h2>{props.title}</h2>
        <span></span>
      </div>
    </HeaderBlue>
  );
}