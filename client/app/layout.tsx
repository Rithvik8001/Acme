import type { Metadata } from "next";
import { Geist_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ACME — The Developer Network",
  description:
    "Discover and connect with developers who build things that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${robotoSlab.variable} font-mono antialiased`}
      >
        <div className="max-w-5xl mx-auto border-l border-r border-border min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
