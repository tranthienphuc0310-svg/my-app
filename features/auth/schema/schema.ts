import z from "zod";
// reguster schema
export const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z.string().min(3, t("usernameMin")),
      email: z.email(t("emailInvalid")),
      password: z.string().min(6, t("passwordMin")),
      confirmPassword: z.string(),
    })
    .refine(
      async (data) => {
        // Tạo một khoảng trễ (timeout) 1 giây trước khi kiểm tra
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return data.password === data.confirmPassword;
      },
      {
        message: t("passwordMismatch"),
        path: ["confirmPassword"],
      },
    );
export type Registerformdata = z.infer<ReturnType<typeof createRegisterSchema>>;

// login SchemaA
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(3, t("usernameMin")),
    password: z.string().min(6, t("passwordMin")),
  });
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
