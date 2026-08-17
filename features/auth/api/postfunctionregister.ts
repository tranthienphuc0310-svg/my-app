import { createRegisterSchema } from "../schema/schema";
import { create } from "axios";
import { z } from "zod";

const api = create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const createUserApi = async (
  data: Omit<
    z.infer<ReturnType<typeof createRegisterSchema>>,
    "confirmPassword"
  >,
) => {
  try {
    const response = await api.post("users", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
