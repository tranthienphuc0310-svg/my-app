import { Suspense } from "react";
import PostPage from "@/features/product/productshow";
import Loading from "./loading";
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PostPage />
    </Suspense>
  );
}
