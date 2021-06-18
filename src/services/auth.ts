import APIService from "./index";
import { AxiosError } from "axios";

class AuthService extends APIService {


  async register(username: string, password: string, role: "STUDENT" | "TEACHER") {
    try {
      const response = await this.post("/auth/register", {
        username,
        password,
        role,
      });
      return response;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }

  async login(username: string, password: string) {
    try {
      const response = await this.post("/auth/login", { username, password });
      return response;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }
}

export default AuthService;
