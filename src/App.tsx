import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Auth from "./layout/routes/Auth";

import { useCookies } from "react-cookie";
import api from "./api/api";

// import Penguji from "./layout/routes/Penguji"
// import { Detail } from "./components/overlay/Detail"
// import SuperAdmin from "./layout/routes/SuperAdmin"
// import Login from './layout/auth/Login';
// import Penembak from './layout/pages/Penembak';
// import KetentuanUmum from './layout/pages/KetentuanUmum';
// import Aturan from './layout/pages/Aturan';
// import TandaTangan from './layout/pages/TandaTangan';
//
const App = () => {
  // const authCtx = useContext(AuthContext);

  const cookie = useCookies(["auth"]);
  const authStatus = cookie[0].auth as string;

  useEffect(() => {
    if (authStatus) {
      api
      .get("/" + authStatus)
      .then((res) => {
          console.log(1)
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          // cookie[1]("auth", "");
        });
    } else {
      console.log("no cookie"); //utk debug
    }
  }, []);

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
  );
};

export default App;
