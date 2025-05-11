import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-lato-light",
});

export const metadata: Metadata = {
  title: "Travel Planner",
  description: "Calendar and travel planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}