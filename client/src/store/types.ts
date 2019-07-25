export interface apiResponse {
  status: boolean;
  message: string;
  code: number;
  level?: string;
  payload?: any;
}

export interface registerType {
  location: string;
  fName: string;
  lName: string;
  email: string;
  pass: string;
  settings: {
    language: string;
  };
}

export interface indexedObj {
  [index: string]: string;
}
export interface indexedObjAny {
  [index: string]: any;
}

export interface post {
  _id: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  photo: string;
  link: string;
  createdBy: string;
  date: string;
  status: string;
  votes: Array<string>;
  newsId?: string;
  reply: {
    date: string;
    text: string;
    up: string[];
    down: string[];
  };
}


export interface data {
  [index: string]: any;
}
