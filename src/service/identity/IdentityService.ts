import { AxiosError } from 'axios';
import { JWTResponse } from '../../domain/JWTResponse';
import { ServiceResult } from '../../domain/ServiceResult';
import httpClient from '../../utils/http-client';

export class IdentityService {
  async login(
    email: string,
    password: string,
  ): Promise<ServiceResult<JWTResponse>> {
    try {
      const loginInfo = {
        email,
        password,
      };
      const response = await httpClient.post('/login', loginInfo);

      return {
        status: response.status,
        data: response.data as JWTResponse,
      };
    } catch (e) {
      return {
        status: (e as AxiosError).status,
        errorMessage: (e as AxiosError).cause?.message,
      };
    }
  }

  async register(
    email: string,
    password: string,
  ): Promise<ServiceResult<JWTResponse>> {
    try {
      const registerInfo = {
        email,
        password,
      };
      const response = await httpClient.post('/register', registerInfo);
      return {
        status: response.status,
        data: response.data as JWTResponse,
      };
    } catch (e) {
      return {
        status: (e as AxiosError).status,
        errorMessage: (e as AxiosError).cause?.message,
      };
    }
  }
}
