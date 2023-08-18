import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Kualifikasi = () => {
    const { shooterid } = useParams();

    console.log(shooterid); // Output: nilai ID dari URL
    return (
        <Aturan
            name="kualifikasi"
            title="Ujian Kualifikasi 20 Meter"
            jarak="20"
            waktu="30"
            sasaran="1"
            tembakMaks='53'
            link={`kualifikasi_form/${shooterid}`}
            posisiAwal='Berdiri tegak menghadap sasaran, senjata dan magasin berada dalam holster atau diletakkan diatas meja'
        >
            <li>Tembakan percobaan 3 butir.</li>
            <li>Tembakan penilaian 10 butir per seri dan dapat dilakukan maksimal 5 seri.</li>
            <li>Apabila tembakan yang <b className='text-gray-600'>hilang (miss)</b> atau tidak bernilai pada seri maka seri tersebut dianggap gagal dan bernilai <b className='text-gray-600'>nol (0).</b></li>
            <li>DIbutuhkan nilai minimal 210 dari total 3 seri terbaik untuk lulus ujian kualifikasi dan melanjutkan ke Ujian Keterampilan. </li>
            <li>Pelanggaran keamanan/safety akan <b className='text-gray-600'>didiskualifikasi</b> dan dinyatakan <b className='text-gray-600'>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini. </li>
        </Aturan>
    )
}

export default Kualifikasi