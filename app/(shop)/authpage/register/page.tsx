import { Suspense } from "react";
import Registerpage from "@/features/auth/registerpage";
export default function AuthPage() {
  return (
    <div className="w-full">
      {/* Gọi component xử lý form và ngôn ngữ vào đây */}
      <Suspense fallback={null}>
        <Registerpage />
      </Suspense>
    </div>
  );
}
