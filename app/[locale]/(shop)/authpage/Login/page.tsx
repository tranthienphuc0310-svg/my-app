import { Suspense } from "react";
import Loginpage from "@/features/auth/loginpage";
export default function Login() {
  return (
    <>
      <Suspense fallback={null}>
        <Loginpage />
      </Suspense>
    </>
  );
}
