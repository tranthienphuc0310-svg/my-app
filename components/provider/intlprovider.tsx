"use client";

import { useQueryState } from "nuqs";
import { NextIntlClientProvider } from "next-intl";

import enMessages from "@/app/messages/en.json";
import viMessages from "@/app/messages/vi.json";
import deMessages from "@/app/messages/de.json";
const messagesMap = {
  en: enMessages,
  vi: viMessages,
  de: deMessages,
} as const;

type Locale = keyof typeof messagesMap;

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [lang] = useQueryState("lang", {
    defaultValue: "vi",
    clearOnDefault: false,
    shallow: true,
  });

  const locale: Locale = lang && lang in messagesMap ? (lang as Locale) : "vi";

  const messages = messagesMap[locale];
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
