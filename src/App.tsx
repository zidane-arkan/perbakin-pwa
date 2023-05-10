
import Auth from "./layout/routes/Auth";
import Penguji from "./layout/routes/Penguji"
import Detail from "./components/overlay/Detail"
import SuperAdmin from "./layout/routes/SuperAdmin"
import Login from './layout/auth/Login';
import Penembak from './layout/pages/Penembak';
// import KetentuanUmum from './layout/pages/KetentuanUmum';
// import Aturan from './layout/pages/Aturan';
// import TandaTangan from './layout/pages/TandaTangan';
const App = () => {
  return (
    <div className="App">
      {/* <Detail /> */}
      {/* <Penguji /> */}
      <Auth />
      {/* <Penembak /> */}
      {/* <Aturan
        title="Ujian Kualifikasi 20 Meter"
        jarak="8"
        waktu="3"
        sasaran="1"
        tembakMaks='5'
      /> */}
      {/* <TandaTangan /> */}
    </div>
  )
}

export default App
