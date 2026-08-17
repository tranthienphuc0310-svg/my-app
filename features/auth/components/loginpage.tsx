"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "../schema/schema";
import { loginApi } from "../api/postfunctionlogin";
import { createLoginSchema } from "../schema/schema";
import axios from "axios";
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
  baseURL: "https://dummyjson.com/",
});

export default function Loginpage() {
  const router = useRouter();
  const t = useTranslations("LoginPage");
  const loginSchema = createLoginSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: loginApi,

    onSuccess: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(t("successTitle"), {
        description: t("successDesc"),
      });
      router.push("/productpage");
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
            {/* Username */}
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

            {/* Password */}
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

            {/* Submit */}
            <Button
              type="submit"
              className="mt-6 w-full"
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
