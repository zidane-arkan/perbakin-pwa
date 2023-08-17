import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Stage6 = () => {
    const { shooterid } = useParams();
    return (
        <Aturan
            title="Stage #6"
            jarak="15 dan 10"
            waktu="15"
            sasaran="2"
            tembakMaks='12'
            link={`stage6_form/${shooterid}`}
            posisiAwal='Berdiri rileks menghadap sasaran, kedua tangan disamping.'
        >
            <li>Cabut senjata dan tembak 2 kali posisi “A” (15 meter) pada sasaran Pertama, kemudian ganti magasin sambil bergerak keposisi “B” (10 meter) dan tembakan
                dua kali pada sasaran berikutnya.</li>
            <li>Lakukan sebanyak 3 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b>didiskualifikasi</b> dan dinyatakan <b>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage6