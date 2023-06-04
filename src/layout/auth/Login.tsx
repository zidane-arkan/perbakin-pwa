import { useContext, useState } from "react";
import { Layout, LayoutChild } from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HandlerResponse } from "../../context/response";
import api from "../../api/api";

interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  role: HTMLInputElement;
}

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState<[boolean, string]>([false, ""]); //buttonDisabled, stateMessage
  const [response, setResponse] = useState<HandlerResponse>({ message: "", error: false }); //responseMessage, isError

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse({ message: "", error: false });
    setFormState([true, "Loading..."]);

    const elements = e.currentTarget.elements as LoginFormElements;

    const query =
      authCtx &&
      authCtx.login({
        username: elements.username.value,
        password: elements.password.value,
        role: elements.role.value as "super" | "admin" | "scorer",
      });

    query
      ?.then((res) => {
        setResponse(res);
        setFormState([false, ""]);
        if (!res.error) {
          navigate("/superadmin");
        }
      })
      .catch((err) => {
        setResponse(err);
        setFormState([false, ""]);
      });
  };
  return (
    <Layout className={"rounded-3xl mt-20 mb-[5%]"}>
      <LayoutChild className="flex-col">
        <div className="max-w-full text-center text-[#036BB0]">
          <h1 className="pb-2 text-4xl font-extrabold">Log In</h1>
          <h4 className="text-base text-[#6A7682] font-normal">
            Silahkan masukkan username dan password yang telah disediakan oleh admin
          </h4>
        </div>
        <form
          className="flex flex-col w-full h-[70vh] justify-between gap-8 pt-14"
          onSubmit={loginHandler}
        >
          <section>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-900">
                Username
              </label>
              <input
                name="username"
                type="username"
                id="username"
                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="user"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="role" className="block mb-2 text-sm font-bold text-gray-900">
                Tipe:
              </label>
              <select
                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="role"
                name="role"
              >
                <option value="scorer">Penguji</option>
                <option value="admin">Admin</option>
                <option value="super">Super Admin</option>
              </select>
            </div>
          </section>
          {response.message && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="fixed z-0 inset-0 bg-gray-900 opacity-75"></div>
              <div
                className={
                  response.error
                    ? "bg-red-50 z-10 border-2 border-red-300 text-red-700 text-sm rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500 p-2.5"
                    : "bg-gray-50 z-10 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2.5"
                }
              >
                {response.message}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {formState[1] && (
              <div className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                {formState[1]}
              </div>
            )}
            <button
              // to={"/penguji"}
              type="submit"
              className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              disabled={formState[0]}
            >
              Masuk
            </button>
          </div>
        </form>
        <button
          className="text-white mt-4 rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
          onClick={() => {
            api
              .post("/logout")
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Logout
        </button>
      </LayoutChild>
    </Layout>
  );
};

export default Login;
