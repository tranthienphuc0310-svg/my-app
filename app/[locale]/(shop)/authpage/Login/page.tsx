import { Suspense } from "react";
import Loginpage from "@/features/auth/logincompo/loginpage";
export default function Login() {
  return (
    <>
      <Suspense fallback={null}>
        <Loginpage />
      </Suspense>
    </>
  );
}
