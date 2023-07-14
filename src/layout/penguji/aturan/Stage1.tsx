import React from 'react'
import Aturan from '../../pages/Aturan'
const Stage1 = () => {
    return (
        <Aturan
            title="Stage #1"
            jarak="7"
            waktu="6"
            sasaran="1"
            tembakMaks='18'
            link='stage1_form'
            posisiAwal='Berdiri rileks menghadap sasaran, kedua tangan disamping.'
        >
            <li>Cabut senjata dan tembak 1 kali, kemudian kunci dan sarungkan.</li>
            <li>Lakukan sebanyak 6 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b>didiskualifikasi</b> dan dinyatakan <b>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage1