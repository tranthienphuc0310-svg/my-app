import { mutationOptions } from "@tanstack/react-query";
import { createUserApi } from "./postfunction";
import { Loginformdata } from "./schema";
export const registerMutationOptions = () =>
  mutationOptions({
    mutationFn: (data: Loginformdata) => {
      const { confirmPassword, ...payload } = data;
      return createUserApi(payload);
    },
  });
