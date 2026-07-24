"use client";

import { Suspense } from "react";
import { IntlProvider } from "./intlprovider";

type Props = {
  children: React.ReactNode;
};

export default function ClientProvider({ children }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntlProvider>{children}</IntlProvider>
    </Suspense>
  );
}
