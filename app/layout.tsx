import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Paytone_One, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const paytone = Paytone_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-paytone",
});

const bodoniModa = Bodoni_Moda({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-bodoni",
});

export const metadata: Metadata = {
  title: "LS Digitaize",
  description: "Brand identity, content systems and creative marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${paytone.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
