import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Stage5 = () => {
    const { shooterid } = useParams();
    return (
        <Aturan
            title="Stage #5"
            jarak="10"
            waktu="15"
            waktu2='20 Detik'
            senjataSatu='(Pistol)'
            senjataDua='(Revolver)'
            sasaran="3"
            tembakMaks='12'
            link={`stage5_form/${shooterid}`}
            posisiAwal='Berdiri membelakangi sasaran, kedua pergelangan tangan diangkat diatas bahu.'
        >
            <li>Cabut senjata dan tembak 2 kali pada setiap sasaran, kemudian ganti magasin dan tembak 2 kali pada sasaran yang sama.</li>
            <li>Lakukan sebanyak 2 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b className='text-gray-600'>didiskualifikasi</b> dan dinyatakan <b className='text-gray-600'>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage5