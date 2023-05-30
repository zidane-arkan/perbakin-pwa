export type ResponseData<T> = {
  message: string;
  status: number;
  data: T;
};

export type HandlerResponse = {
  message: string;
  error: boolean;
};

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
