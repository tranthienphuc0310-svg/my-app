import { Suspense } from "react";
import Loginpage from "@/features/auth/loginpage";
export default function Login() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Loginpage />
      </Suspense>
    </>
  );
}
