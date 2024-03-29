import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardPenguji, CardPenguji2 } from '../../components/ui/Card'

type Props = {
    classname?: string | any;
    statusAuth?: boolean;
}

type Scorer = {
    name: string;
    image_path: string;
    id: string;
}
interface PengujiAdminProps {
    scorers: string[];
}
// PENGUJI SUPER ADMIN
const Penguji: React.FC<PengujiAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penguji</h3>
                    </span>
                    {/* <CardPenguji penguji={'Penguji 1'} />
                    <CardPenguji penguji={'Penguji 2'} /> */}
                    {/* {props.scorers.map((scorer: Scorer, index: string) => (
                        <CardPenguji
                            key={index}
                            id={scorer.id}
                            penguji={scorer.name}
                        />
                    ))} */}
                    {props.scorers && props.scorers.length > 0 ? (
                        props.scorers.map((scorer: Scorer, index: string) => (
                            <CardPenguji
                                key={index}
                                image_path={scorer.image_path}
                                id={scorer.id}
                                penguji={scorer.name}
                            />
                        ))
                    ) : (
                        <div className="text-center">Anda belum menambahkan Penguji</div>
                    )}
                    {/* {props.userPenguji?.map((penguji: any) => {
                        return (
                            <CardPenguji key={penguji.id} id={penguji.id} penguji={penguji.penguji} />
                        )
                    })} */}
                </LayoutChild>
            </Layout>
        </>
    )
}

export const PengujiAdmin: React.FC<PengujiAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    console.log(props)
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penguji</h3>
                    </span>
                    {/* <CardPenguji penguji={'Penguji 1'} />
                    <CardPenguji penguji={'Penguji 2'} /> */}
                    {props.scorers.map((scorer: Scorer, index: string) => (
                        <CardPenguji
                            key={index}
                            id={scorer.id}
                            penguji={scorer.name}
                        />
                    ))}
                    {/* {props.userPenguji?.map((penguji: any) => {
                        return (
                            <CardPenguji key={penguji.id} id={penguji.id} penguji={penguji.penguji} />
                        )
                    })} */}
                </LayoutChild>
            </Layout>
        </>
    )
}

export const PengujiAdmin2: React.FC<PengujiAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    console.log(props)
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penguji</h3>
                    </span>
                    {/* <CardPenguji penguji={'Penguji 1'} />
                    <CardPenguji penguji={'Penguji 2'} /> */}
                    {/* {props.scorers.map((scorer: Scorer, index: string) => (
                       
                    ))} */}
                    {props.scorers && props.scorers.length > 0 ? (
                        props.scorers.map((scorer: Scorer, index: string) => (
                            <CardPenguji2
                                key={index}
                                image_path={scorer.image_path}
                                id={scorer.id}
                                penguji={scorer.name}
                            />
                        ))
                    ) : (
                        <section className='flex justify-center'>
                            <div className="items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                                <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">Data Penguji Belum ada</h5>
                            </div>
                        </section>
                    )}
                    {/* {props.userPenguji?.map((penguji: any) => {
                        return (
                            <CardPenguji key={penguji.id} id={penguji.id} penguji={penguji.penguji} />
                        )
                    })} */}
                </LayoutChild>
            </Layout>
        </>
    )
}

export default Penguji