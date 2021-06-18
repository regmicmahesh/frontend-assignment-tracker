import { AxiosError } from "axios";
import APIService from ".";

export class TeacherService extends APIService {
  async getStudents() {
    try {
      const res = await this.get("/teacher/student");
      return res;
    } catch (e) {
      const error = e as AxiosError;

      return error.response;
    }
  }

  async changeCode() {
    try {
      const res = await this.post("/teacher/invite", {});
      return res;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }

  async deleteStudent(id: number) {
    try {
      const res = await this.delete(`/teacher/student/${id}`);
      return res;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }

  async getAssignments() {
    try {
      const res = await this.get("/assignment");
      return res;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }

  async deleteAssignment(id: number) {
    try {
      const res = await this.delete(`/assignment/${id}`);
      return res;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }

  async createAssignment(title: string, description: string) {
    try {
      const res = await this.post("/assignment", { title, description });
      return res;
    } catch (e) {
      const error = e as AxiosError;
      return error.response;
    }
  }
}
