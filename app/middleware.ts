import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Cập nhật: Thêm 'vi' vào danh sách các ngôn ngữ được hỗ trợ
  locales: ["en", "de", "vi"],

  // Ngôn ngữ mặc định khi người dùng truy cập không có tiền tố ngôn ngữ
  defaultLocale: "en", // Bạn có thể để mặc định là 'vi' hoặc 'en' tùy nhu cầu
});

export const config = {
  // Cập nhật: Thêm vi vào regex trong matcher để Next.js không bỏ qua đường dẫn tiếng Việt
  matcher: ["/", "/(de|en|vi)/:path*"],
};
