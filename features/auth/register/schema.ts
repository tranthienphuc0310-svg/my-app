import z from "zod";

export const createLoginSchema = (t: (key: string) => string) =>
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

        // Trả về kết quả so sánh (true nếu khớp, false nếu không khớp)
        return data.password === data.confirmPassword;
      },
      {
        message: t("passwordMismatch"),
        path: ["confirmPassword"],
      },
    );
export type Loginformdata= z.infer<ReturnType<typeof createLoginSchema>>