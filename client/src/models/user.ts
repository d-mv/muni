export enum UserKind {
  user = "user",
  muni = "muni"
}

export interface UserSettings {
  language: string;
  help: boolean;
}

// export interface UserType {
//   _id: string;
//   location: string;
//   fName: string;
//   lName: string;
//   email: string;
//   pass: string;
//   type: UserKind;
//   tokens: string[];
//   settings: UserSettings;
//   status: boolean;
//   createdAt: Date;
// }

export interface AuthState {
  status: boolean;
  user: {
    _id: string;
    location: string;
    type: UserKind;
    settings: UserSettings;
  };
}

export const AUTH_EMPTY_STATE = {
  status: false,
  user: {
    _id: "",
    location: "",
    type: UserKind.user,
    settings: { language: "עב", help: true }
  }
};
