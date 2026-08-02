import { Suspense } from "react";
import LanguagePage from "../../../components/common/Languagechange";
export default function Language() {
  return (
    <>
      <Suspense fallback={null}>
        <LanguagePage />
      </Suspense>
    </>
  );
}
