"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const loginSchema = z
  .object({
    username: z.string().min(3, "Tên người dùng quá ngắn"),
    email: z.email("Email không đúng định dạng"),
    password: z.string().min(6, "Mật khẩu quá ngắn"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;

const createUserApi = async (data: LoginFormData) => {
  // Loại bỏ confirmPassword trước khi gửi lên API nếu cần
  const { confirmPassword, ...payload } = data;
  const response = await api.post("/posts", payload);
  return response.data;
};

export default function LoginPage() {
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
    mutationFn: createUserApi,
    onSuccess: (data) => {
      console.log("Server phản hồi:", data);
      toast.success("Thành công!", {
        description: "Bạn đã gửi dữ liệu thành công.",
      });
      reset();
    },
    onError: (error) => {
      console.error("Lỗi rồi:", error);
      toast.error("Đã xảy ra lỗi", {
        description: "Không thể gửi dữ liệu lên server lúc này.",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4">
      {/* Tăng kích thước card bằng cách đổi max-w-md thành max-w-lg */}
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Tạo tài khoản
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Nhập thông tin của bạn để tiếp tục
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Tên người dùng
              </label>
              <Input placeholder="Nhập tên của bạn" {...register("username")} />
              {errors.username && (
                <p className="text-sm font-medium text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
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
                Mật khẩu
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
                Xác nhận mật khẩu
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
                  Đang xử lý...
                </>
              ) : (
                "Đăng ký"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
