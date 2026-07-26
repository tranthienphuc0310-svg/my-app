"use client";
import { useQueryState } from "nuqs";

export default function LanguagePage() {
  const [lang, setLang] = useQueryState("lang", {
    defaultValue: "vi",
    throttleMs: 100,
    clearOnDefault: false,
    shallow: false,
  });
  const LanguageOption = [
    { code: "en", label: "English" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "de", label: "German" },
  ];
  return (
    <section>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="border p-2 rounded"
      >
        {/* Duyệt mảng bên trong select để sinh ra các thẻ option */}
        {LanguageOption.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
    </section>
  );
}
