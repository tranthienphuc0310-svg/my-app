import { Suspense } from "react";
import PostPage from "../componentplace/usequerycomponent/usequery";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostPage />
    </Suspense>
  );
}
