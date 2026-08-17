import { LoginFormData } from "../schema/schema";
import { create } from "axios";
const api = create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const loginApi = async (data: LoginFormData) => {
  try {
    const response = await api.post("/auth/login", data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
