import { AxiosError } from "axios";
import APIService from ".";

export class StudentService extends APIService {
  async joinTeacher(code: string) {
    try {
      const res = await this.post("/student/join", { code });
      return res;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }
}
