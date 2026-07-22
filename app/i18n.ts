import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Danh sách các ngôn ngữ hỗ trợ
export const locales = ["en", "de", "vi"];

export default getRequestConfig(async () => {
  const locale = "vi"; // Hoặc cấu hình tự động tùy theo cách thiết lập của bạn

  // Kiểm tra tính hợp lệ của locale
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
