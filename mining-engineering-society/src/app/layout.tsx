import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";
import { Bebas_Neue, Orbitron, Rajdhani, Raleway } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-Bebas_Neue"
});
const raleway = Raleway({
  weight: ["400", "500", "700", "600"],
  subsets: ["latin"],
  variable: "--font-Raleway"
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-Orbitron"
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-Rajdhani"
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "MES NIT Rourkela",
  description: "Mining Engineering Society, NIT Rourkela"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${raleway.variable} ${bebas.variable} ${rajdhani.variable} ${orbitron.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
