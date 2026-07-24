import { Suspense } from "react";
import PostPage from "../componentplace/usequerycomponent/usequery";
import Loading from "./loading";
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PostPage />
    </Suspense>
  );
}
