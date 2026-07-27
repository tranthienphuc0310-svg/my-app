import AuthComponent from "../componentplace/register"; // Đảm bảo đúng đường dẫn tới file auth.tsx
import { Suspense } from "react";
export default function AuthPage() {
  return (
    <div className="w-full">
      {/* Gọi component xử lý form và ngôn ngữ vào đây */}
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <AuthComponent />
      </Suspense>
    </div>
  );
}
