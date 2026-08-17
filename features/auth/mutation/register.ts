import { mutationOptions } from "@tanstack/react-query";
import { createUserApi } from "../api/postfunctionregister";
import { Registerformdata } from "../schema/schema";
export const registerMutationOptions = () =>
  mutationOptions({
    mutationFn: (data: Registerformdata) => {
      const { confirmPassword, ...payload } = data;
      return createUserApi(payload);
    },
  });
