"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Mail,
  User,
  BadgeCheck,
  VenusAndMars,
  LogOut,
  Pencil,
} from "lucide-react";

const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  gender: z.string(),
  image: z.string(),
});
type userInfor = z.infer<typeof userSchema>;
export default function Profile() {
  const [user, setUser] = useState<userInfor | null>(null);
  const router = useRouter();
  useEffect(() => {
    const rawdata = localStorage.getItem("user");

    if (rawdata) {
      setUser(JSON.parse(rawdata));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/Login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }
  {
    /* RIGHT */
  }
  return (
    <div className="min-h-screen bg-zinc-100 px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
          <p className="mt-2 text-zinc-500">
            Manage your personal information.
          </p>
        </div>

        <Card className="rounded-3xl border-0 shadow-xl">
          <CardContent className="p-10">
            <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
              {/* LEFT */}

              <div className="flex flex-col items-center border-r pr-10">
                <Avatar className="h-32 w-32 shadow-lg">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <h2 className="mt-6 text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="mt-2 text-zinc-500">@{user.username}</p>

                <div className="mt-10 flex w-full flex-col gap-4">
                  <Button className="w-full">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>

              {/* RIGHT */}

              <div>
                <h2 className="mb-8 text-2xl font-semibold">
                  Account Information
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Mail className="h-5 w-5" />
                      <span>Email</span>
                    </div>

                    <div className="rounded-xl border bg-zinc-50 p-4 text-lg">
                      {user.email}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <User className="h-5 w-5" />
                      <span>Username</span>
                    </div>

                    <div className="rounded-xl border bg-zinc-50 p-4 text-lg">
                      {user.username}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <VenusAndMars className="h-5 w-5" />
                      <span>Gender</span>
                    </div>

                    <div className="rounded-xl border bg-zinc-50 p-4 text-lg capitalize">
                      {user.gender}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <BadgeCheck className="h-5 w-5" />
                      <span>User ID</span>
                    </div>

                    <div className="rounded-xl border bg-zinc-50 p-4 text-lg">
                      #{user.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
