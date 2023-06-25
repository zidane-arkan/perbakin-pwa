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
  UpdateExamRequest,
  CreateExamRequest,
  CreateExamResponse,
  CreateAdminResponse,
  UpdateAdminResponse,
  HandlerResponse,
  CreateScorerRequest,
  CreateShooterResponse,
  UpdateShooterRequest
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
  updateExam: (examData: UpdateExamRequest) => Promise<HandlerResponse>;
  createAdmin: (adminData: {
    examId: string | null;
    name: string;
    username: string;
    password: string;
  }) => Promise<HandlerResponse>;
  updateAdmin: (adminData: UpdateAdminResponse) => Promise<HandlerResponse>;
  createScorer: (scorerData: CreateScorerRequest) => Promise<HandlerResponse>;
  createShooter: (shooterData: CreateShooterResponse) => Promise<HandlerResponse>;
  updateShooter: (shooterData: UpdateShooterRequest) => Promise<HandlerResponse>;
  // ADMIN AUTH
  createScorerAdmin: (scorerData: CreateScorerRequest) => Promise<HandlerResponse>;
  createShooterAdmin: (shooterData: CreateShooterResponse) => Promise<HandlerResponse>;
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
            role: "scorer",
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

  // const getSuperId = async (): Promise<string | null> => {
  //   try {
  //     const response = await api.get<ResponseData<LoginSuperResponse>>("/super");
  //     console.log(response);

  //     return response.data.data.super.id;
  //   } catch (error) {
  //     const err = error as AxiosError<ResponseData<null>>;
  //     console.error("Error:", err);

  //     return null;
  //   }
  // };

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

  const updateExam = async (examData: UpdateExamRequest): Promise<HandlerResponse> => {
    try {
      const response = await api.put<ResponseData<UpdateExamRequest>>(`/super/exam/${examData.examId}`, {
        "name": examData.Name,
        "location": examData.Location,
        "organizer": examData.Organizer,
        "begin": examData.Begin,
        "finish": examData.Finish
      });
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

  const createAdmin = async (adminData: {
    username: string;
    password: string;
    name: string;
    examId: string | null;
  }): Promise<HandlerResponse> => {
    try {
      const response = await api.post<ResponseData<CreateAdminResponse>>(`/super/exam/${adminData.examId}/admin`, {
        username: adminData.username,
        name: adminData.name,
        password: adminData.password
      });
      console.log(response);
      return { message: response.data.message, error: false };

      // const adminId = response.data.data.id;
      // const adminExamResponse = await api.get<ResponseData<any>>(
      //   `/super/exam/${adminData.examId}/admin/${adminId}`
      // );
      // console.log(adminExamResponse);
      // return {
      //   message: response.data.message,
      //   error: false,
      // };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  };
  const updateAdmin = async (adminData: UpdateAdminResponse): Promise<HandlerResponse> => {
    console.log(adminData);
    const formData = {
      username: adminData.username,
      name: adminData.name,
      password: adminData.password
    };

    try {
      const response = await api.put<ResponseData<UpdateAdminResponse>>(`/super/exam/${adminData.examId}/admin/${adminData.admin_id}`, formData);
      console.log(response);
      return { message: response.data.message, error: false, response: response };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  }

  const createScorer = async (scorerData: CreateScorerRequest): Promise<HandlerResponse> => {
    try {
      const response = await api.post<ResponseData<CreateScorerRequest>>(`/super/exam/${scorerData.examId}/scorer`, {
        name: scorerData.name,
        username: scorerData.username,
        password: scorerData.password,
      });
      console.log(response);
      return { message: response.data.message, error: false, response: response };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  };

  const createShooter = async (shooterData: CreateShooterResponse): Promise<HandlerResponse> => {
    console.log(shooterData);
    const formData = new FormData();
    if (shooterData.examId) {
      formData.append("examId", shooterData.examId);
    }
    if (shooterData.scorer_id) {
      formData.append("scorer_id", shooterData.scorer_id);
    }
    formData.append("name", shooterData.name);
    formData.append("province", shooterData.province);
    formData.append("club", shooterData.club);
    if (shooterData.image_path) {
      formData.append("image", shooterData.image_path);
    }
    try {
      const response = await api.post<ResponseData<CreateShooterResponse>>(`/super/exam/${shooterData.examId}/scorer/${shooterData.scorer_id}/shooter`, formData);
      console.log(response);
      return { message: response.data.message, error: false, response: response };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  }

  const updateShooter = async (shooterData: UpdateShooterRequest): Promise<HandlerResponse> => {
    console.log(shooterData);
    const formData = {
      scorer_id: shooterData.scorer_id,
      name: shooterData.name,
      province: shooterData.province,
      club : shooterData.club
    };
    // const formData = new FormData;
    // console.log(formData)
    // if (shooterData.scorer_id) {
    //   formData.append("scorer_id", shooterData.scorer_id);
    // }
    // formData.append("name", shooterData.name);
    // formData.append("province", shooterData.province);
    // formData.append("club", shooterData.club);
    try {
      const response = await api.put<ResponseData<UpdateShooterRequest>>(`/super/exam/${shooterData.examId}/scorer/${shooterData.oriScorerId}/shooter/${shooterData.shooterId}`, formData);
      console.log(response);
      return { message: response.data.message, error: false, response: response };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  }

  // ADMIN

  const createScorerAdmin = async (scorerData: CreateScorerRequest): Promise<HandlerResponse> => {
    try {
      const response = await api.post<ResponseData<CreateScorerRequest>>(`/admin/scorer`, {
        name: scorerData.name,
        username: scorerData.username,
        password: scorerData.password,
      });
      console.log(response);
      return { message: response.data.message, error: false, response: response };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  };

  const createShooterAdmin = async (shooterData: CreateShooterResponse): Promise<HandlerResponse> => {
    console.log(shooterData);
    const formData = new FormData();
    if (shooterData.examId) {
      formData.append("examId", shooterData.examId);
    }
    if (shooterData.scorer_id) {
      formData.append("examId", shooterData.scorer_id);
    }
    formData.append("name", shooterData.name);
    formData.append("province", shooterData.province);
    formData.append("club", shooterData.club);
    if (shooterData.image_path) {
      formData.append("image", shooterData.image_path);
    }
    try {
      const response = await api.post<ResponseData<CreateShooterResponse>>(`/admin/scorer/${shooterData.scorer_id}/shooter`, formData);
      console.log(response);
      return { message: response.data.message, error: false, response: response };
    } catch (error) {
      const err = error as AxiosError<ResponseData<null>>;

      return {
        message: "error " + err.response?.status + ": " + err.response?.data.message,
        error: true,
      };
    }
  }
  return (
    <AuthContext.Provider
      value={{
        userData,
        login,
        createExam,
        updateExam,
        createAdmin,
        updateAdmin,
        createScorer,
        createShooter,
        updateShooter,
        createScorerAdmin,
        createShooterAdmin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
