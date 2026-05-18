import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "책 관리 시스템",
  description: "BookManagement System",
};

export default async function RootLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="ko">
        <body>
          {children}
        </body>
      </html>
  );
}
