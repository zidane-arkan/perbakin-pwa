import React from 'react'

type Props = {
    children?: string | JSX.Element | React.ReactNode
    className?: string
}
const Layout = (props: Props) => {
    const classCustom = `${props.className} container h-screen flex flex-col gap-4 pb-[15%] bg-white  `;
    return (
        <div className={classCustom}>
            {props.children}
        </div>
    )
}

export default Layout;