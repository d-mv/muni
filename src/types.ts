import { ObjectId } from 'bson';

export interface apiResponseTYPE {
  status: boolean;
  message: string;
  code: number;
  payload?: any;
  level?: string;
}
export interface intApiResponseTYPE {
  status: boolean;
  payload?: any;
}

export interface IncPostsListTYPE {
  location: string;
  user: string;
  level: string;
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
  fName: string;
  lName: string;
  avatar: string;
  email: string;
  pass: string;
  posts?: [];
  settings?: {};
  location: string;
}

export interface UserTYPE {
  fName: string;
  lName: string;
  avatar: string;
  email: string;
  pass: string;
  posts?: [];
  settings?: {};
}
export interface IncLoginTYPE {
  email: string;
  pass: string;
  location?: string;
}

export interface IncNewLocationTYPE {
  name: {
    [index: string]: string;
  };
  photo: string;
}
export interface LocationTYPE {
  _id?: ObjectId;
  name: {
    [index: string]: string;
  };
  photo: string;
}

export interface NewUserTYPE {
  _id: ObjectId;
  fName: string;
  lName: string;
  avatar: string;
  email: string;
  pass: string;
  posts: [];
  settings: {};
}

export interface IncUserIdTYPE {
  id: string;
  token: string;
}
