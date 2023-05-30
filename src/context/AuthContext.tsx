import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface authContextInterface {}

export const AuthContext = createContext<authContextInterface | null>(null);

const baseUrl =
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_VERSION
    ? `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`
    : "http://localhost:5000/api/v1";

function AuthProvider(props: { children: JSX.Element }) {
  return <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
