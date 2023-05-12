import React from 'react'
import { HeaderBlueCustom } from '../../components/Header';
import { Layout, LayoutChild } from '../../components/Layout'
import { Card, CardText } from '../../components/ui/Card'
import arrowLeft from '../../app-assets/arrowleft.png';
import close from '../../app-assets/close.png';
import jarak from '../../app-assets/jarak.png';
import { Link } from 'react-router-dom';
type Props = {
    children?: string | JSX.Element | React.ReactNode
    className?: string,
    title: string,
    jarak: string,
    waktu: string,
    sasaran: string,
    tembakMaks: string,
    link: string;
}

const Aturan = (props: Props) => {
    return (
        <Layout className={'rounded-3xl mt-28 mb-[5%] pt-[10%]'}>
            <HeaderBlueCustom typeIcon='close' title={props.title} />
            <LayoutChild className='flex-col'>
                <section className='flex justify-between w-full gap-4'>
                    <Card className='w-[180px] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} alt='s' />
                        <div>
                            <h6>Jarak</h6>
                            <p className='text-[12px]'>{props.jarak} Meter</p>
                        </div>
                    </Card>
                    <Card className='w-[180px] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Waktu</h6>
                            <p className='text-[12px]'>{props.waktu} Detik</p>
                        </div>
                    </Card>
                </section>
                <section className='flex justify-between w-full gap-4'>
                    <Card className='w-[180px] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Sasaran</h6>
                            <p className='text-[12px]'>{props.sasaran} Buah Sasaran IPSC</p>
                        </div>
                    </Card>
                    <Card className='w-[180px] pr-2 pl-2 py-4 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Total Tembakan Maksimal</h6>
                            <p className='text-[12px]'>{props.tembakMaks} Butir</p>
                        </div>
                    </Card>
                </section>
                <CardText title='Ketentuan Umum'>
                    <p>Berdiri tegak menghadap sasaran, senjata dan magasin berada dalam holster atau diletakkan diatas meja</p>
                </CardText>
                <CardText title='Prosedur'>
                    <ol className='flex flex-col gap-2 pl-4 text-black list-decimal'>
                        <li>Penguji berhak untuk menghentikan peserta dari ujian apabila menganggap perlengkapan peserta tidak memenuhi prosedur keamanan.</li>
                        <li>Minimal 50% tembakan pada setiap sasaran (target) mengenai bidang “A” dan tidak ada tembakan yang tidak mengenai sasaran (miss).</li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                        <li>Jari harus berada di luar pengaman picu pada saat melakukan pergerakkan (perpindahan posisi)/mengganti magasin atau memperbaiki senjata dan arah laras senjata harus selalu mengarah ke downrange. </li>
                    </ol>
                </CardText>
                <CardText>
                    <Link to={`/penguji/${props.link}`} className='w-full px-4 py-4 text-center text-white bg-[#036BB0] rounded-lg' type='button'>Mulai Pengujian</Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Aturan