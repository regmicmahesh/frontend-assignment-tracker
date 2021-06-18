import { AxiosError } from "axios";
import APIService from ".";

export class UserService extends APIService {
  async getProfile() {
    try {
      const userProfile = await this.get("/user/profile");
      return userProfile;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }
}
