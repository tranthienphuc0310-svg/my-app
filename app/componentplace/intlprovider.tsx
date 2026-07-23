"use client";

import { useQueryState } from "nuqs";
import { NextIntlClientProvider } from "next-intl";

import enMessages from "@/app/messages/en.json";
import viMessages from "@/app/messages/vi.json";

const messagesMap: Record<string, any> = {
  en: enMessages,
  vi: viMessages,
};

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [lang] = useQueryState("lang", {
    defaultValue: "vi",
  });

  const locale = messagesMap[lang] ? lang : "vi";
  const messages = messagesMap[locale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
