export type ResponseData<T> = {
  message: string;
  status: number;
  data: T;
};

export type HandlerResponse = {
  message: string;
  error: boolean;
};

// AUTH

export type Role = "super" | "admin" | "scorer";

export type LoginRequest = {
  username: string;
  password: string;
  role: Role;
};

export type LoginSuperResponse = {
  super: {
    id: string;
    user_id: string;
    username: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
};

export type LoginAdminResponse = {
  admin: {
    id: string;
    exam_id: string;
    user_id: string;
    username: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
};

export type LoginScorerResponse = {
  scorer: {
    id: string;
    exam_id: string;
    user_id: string;
    username: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
};

// EXAM
export interface CreateExamResponse {
  id: string;
  name: string;
  location: string;
  organizer: string;
  begin: string;
  finish: string;
}

export interface CreateExamRequest {
  name: string;
  location: string;
  organizer: string;
  begin: string;
  finish: string;
}

// Create Admin
export interface CreateAdminResponse { 
  id: string;
  username: string;
  password: string;
  name: string;
}