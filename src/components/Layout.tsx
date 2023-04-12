import React from 'react'

type Props = {
    children?: string | JSX.Element
}
const Layout = (props: any) => {
    return (
        <div className='container h-screen flex flex-col gap-4 items-center px-8 pt-[20%] pb-[15%] bg-white'>
            {props.children}
        </div>
    )
}

export default Layout;