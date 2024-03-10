export interface JWTResponse {
  token: string;
  refreshToken: string;
  email?: string;
  roles?: string[];
}
