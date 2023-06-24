export type ResponseData<T> = {
  message: string;
  status: number;
  data: T;
};

export type HandlerResponse = {
  message: string;
  error: boolean;
  response?: string | any;
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
export type Exam = {
 
};
export interface CreateExamResponse {
  exam: {
    ID: string;
    SuperID: string;
    Name: string;
    Location: string;
    Organizer: string;
    Begin: string;
    Finish: string;
  }
}

export interface GetExamsResponse {
  exams: [{
    id: string;
    name: string;
    location: string;
    organizer: string;
    begin: string;
    finish: string;
  }]
}

// EXAM
export interface CreateExamRequest {
  SuperID: string | null;
  Name: string;
  Location: string;
  Organizer: string;
  Begin: string;
  Finish: string;
}

export interface UpdateExamRequest {
  examId: string | null;
  Name: string;
  Location: string;
  Organizer: string;
  Begin: string;
  Finish: string;
}

// Create Scorer
export interface CreateScorerRequest { 
  id?: string;
  examId: string | null;
  username: string;
  password: string;
  name: string;
}

// Create Admin
export interface CreateAdminResponse { 
  id?: string;
  examId: string | null;
  username: string;
  password: string;
  name: string;
}

// Create Shooter
export interface CreateShooterResponse { 
  id?: string;
  examId?: string | null;
  scorer_id?: string | null;
  name: string;
  province: string;
  club: string;
  image_path?: string | null;
}


export interface UpdateShooterRequest { 
  id?: string;
  examId?: string | null;
  scorer_id?: string | null;
  shooterId?: string | null;
  name: string;
  province: string;
  club: string;
  image_path?: string | null;
}
