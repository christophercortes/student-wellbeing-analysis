import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from '@/components/fonts';

export const metadata: Metadata = {
  title: "Sentiment Analysis",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
