"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguagePage() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "de", label: "German" },
  ];

  return (
    <section>
      <select
        value={locale}
        onChange={(e) =>
          router.replace(pathname, {
            locale: e.target.value,
          })
        }
        className="rounded border p-2"
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}