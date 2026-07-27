import { Suspense } from "react";
import Loginpage from "../componentplace/login";
export default function Login() {
  return (
    <>
      <Suspense fallback="loading">
        <Loginpage />
      </Suspense>
    </>
  );
}
