import { Suspense } from "react";
import Registerpage from "../componentplace/register";
export default function AuthPage() {
  return (
    <div className="w-full">
      {/* Gọi component xử lý form và ngôn ngữ vào đây */}
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Registerpage />
      </Suspense>
    </div>
  );
}
