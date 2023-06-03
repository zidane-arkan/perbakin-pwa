import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";
import api from "../api/api";

import {
  ResponseData,
  Role,
  LoginRequest,
  LoginSuperResponse,
  LoginAdminResponse,
  LoginScorerResponse,
  CreateExamRequest,
  CreateExamResponse,
  HandlerResponse,
} from "./response";

type UserData = {
  id: string;
  name: string;
  role: Role;
};

interface authContextInterface {
  userData: UserData | null;
  login: ({ username, password, role }: LoginRequest) => Promise<HandlerResponse>;
  createExam: (examData: CreateExamRequest) => Promise<HandlerResponse>;
}

export const AuthContext = createContext<authContextInterface | null>(null);

function AuthProvider(props: { children: JSX.Element }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const login = async ({ username, password, role }: LoginRequest): Promise<HandlerResponse> => {
    let response;

    try {
      switch (role) {
        case "super":
          response = await api.post<ResponseData<LoginSuperResponse>>("/super/login", {
            username,
            password,
          });

          setUserData({
            id: response.data.data.super.id,
            name: response.data.data.super.name,
            role: "super",
          });

          break;

        case "admin":
          response = await api.post<ResponseData<LoginAdminResponse>>("/admin/login", {
            username,
            password,
          });

          setUserData({
            id: response.data.data.admin.id,
            name: response.data.data.admin.name,
            role: "admin",
          });

          break;

        case "scorer":
          response = await api.post<ResponseData<LoginScorerResponse>>("/scorer/login", {
            username,
            password,
          });

          setUserData({
            id: response.data.data.scorer.id,
            name: response.data.data.scorer.name,
            role: "admin",
          });

          break;
      }
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }

    return { message: response.data.message, error: false };
  };
  const createExam = async (examData: CreateExamRequest): Promise<HandlerResponse> => {
    try {
      const response = await api.post<ResponseData<CreateExamResponse>>("/super/exam", examData);
      console.log(response)
      return { message: response.data.message, error: false };
    }
    catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        login,
        createExam,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
