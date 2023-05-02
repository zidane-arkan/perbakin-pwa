import React from 'react'

type Props = {
    children?: string | JSX.Element | React.ReactNode
    className?: string
}
export const Layout = (props: Props) => {
    const classCustom = `${props.className} container h-screen flex flex-col gap-4 pb-[15%] bg-white  `;
    return (
        <div className={classCustom}>
            {props.children}
        </div>
    )
}

export const LayoutChild = (props: Props) => {
    const customClass = `${props.className} flex flex-col max-w-full gap-4 px-8`;
    return (
        <section className={customClass}>
            {props.children}
        </section>
    )
}