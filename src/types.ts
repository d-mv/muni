export interface apiResponseTYPE {
  status: boolean;
  message: string;
  code: number;
  payload?: any;
}

export interface IncPostsListTYPE {
  query: {
    location: string;
    options?: {
      byUser: boolean;
      userId: string;
    };
  };
  token: string;
}
export interface TokenTYPE {
  location: string;
  token: string;
}
export interface IncPostsListToModelTYPE {
  location: string;
  options?: {
    byUser: boolean;
    userId: string;
  };
}

export interface IncUserCreateTYPE {
  query: { name: string; email: string; pass: string } | {};
  token: string | undefined;
}

export interface UserTYPE {
  name: string;
  email: string;
  pass: string;
}
export interface IncLoginTYPE {
  email: string;
  pass: string;
  location?: string;
}

export interface NewUserTYPE {
  name: string;
  email: string;
  pass: string;
  token: string;
  authDate: Date;
}

export interface IncUserIdTYPE {
  id: string;
  token: string;
}
