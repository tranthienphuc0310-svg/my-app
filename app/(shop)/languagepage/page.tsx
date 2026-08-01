import { Suspense } from "react";
import LanguagePage from "../../../components/common/Languagechange";
export default function Language() {
  return (
    <>
      <Suspense fallback={<div>isloading</div>}>
        <LanguagePage />
      </Suspense>
    </>
  );
}
