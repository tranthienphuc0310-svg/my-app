"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Tạo schema bằng hàm để nhận diện bản dịch từ next-intl
const createLoginSchema = (t: (key: string) => string) =>
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
const createUserApi = async (
  data: Omit<z.infer<ReturnType<typeof createLoginSchema>>, "confirmPassword">,
) => {
  const response = await api.post("users", data);
  return response.data;
};

export default function Registerpage() {
  const t = useTranslations("Registerpage");
  const Router = useRouter();

  // Khởi tạo schema dựa trên ngôn ngữ hiện tại
  const loginSchema = createLoginSchema(t);
  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const { confirmPassword, ...payload } = data;
      return createUserApi(payload);
    },
    onSuccess: (data) => {
      toast.success(t("successTitle"), {
        description: t("successDesc"),
      });
      reset();
      Router.push("/productpage");
    },
    onError: () => {
      toast.error(t("errorTitle"), {
        description: t("errorDesc"),
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("description")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                {t("username")}
              </label>
              <Input
                placeholder={t("usernamePlaceholder")}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm font-medium text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                {t("email")}
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                {t("password")}
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                {t("confirmPassword")}
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("processing")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
