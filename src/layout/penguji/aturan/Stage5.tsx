import React from 'react'
import Aturan from '../../pages/Aturan'
const Stage5 = () => {
    return (
        <Aturan
            title="Stage #5"
            jarak="7"
            waktu="6"
            sasaran="1"
            tembakMaks='18'
            link='stage5_form'
            posisiAwal='Berdiri membelakangi sasaran, kedua pergelangan tangan diangkat diatas bahu.'
        >
            <li>Cabut senjata dan tembak 2 kali pada setiap sasaran, kemudian ganti magasin dan tembak 2 kali pada sasaran yang sama.</li>
            <li>Lakukan sebanyak 2 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b>didiskualifikasi</b> dan dinyatakan <b>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage5