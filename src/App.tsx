
import Login from './layout/auth/Login';
import Penembak from './layout/pages/Penembak';
import KetentuanUmum from './layout/pages/KetentuanUmum';
// import Aturan from './layout/pages/Aturan';
import TandaTangan from './layout/pages/TandaTangan';
const App = () => {
  return (
    <div className="App">
      {/* <Aturan
        title="Ujian Kualifikasi 20 Meter"
        jarak="8"
        waktu="3"
        sasaran="1"
        tembakMaks='5'
      /> */}
      <TandaTangan />
    </div>
  )
}

export default App
