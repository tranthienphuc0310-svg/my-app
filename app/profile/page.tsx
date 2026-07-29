import { Suspense } from "react";
import Profile from "../componentplace/profile";
export default function Profilepage() {
  return (
    <>
      <Suspense fallback="isloading">
        <Profile />
      </Suspense>
    </>
  );
}
