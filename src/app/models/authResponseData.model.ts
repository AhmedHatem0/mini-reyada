export interface AuthResponseData {
    email: string;
    localId: string;
    idToken: string;
    expiresIn: string;
    refreshToken: string;
    registered?: boolean;
  }