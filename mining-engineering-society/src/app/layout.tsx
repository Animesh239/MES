import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarSwitcher from "@/components/layout/navbarSwitcher/NavbarSwitcher";
import Footer from "@/components/layout/footer/footer";
import {
  Bebas_Neue,
  Orbitron,
  Rajdhani,
  Raleway,
  Playfair_Display,
  Lato,
  Roboto
} from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const bebas = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-Bebas_Neue",
});

const pd = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-Playfair_Display"
});

const roboto = Roboto({
  weight: ["100", "400", "500", "700", "300", "900"],
  subsets: ["latin"],
  variable: "--font-Roboto"
});

const lato = Lato({
  weight: ["400", "700", "900", "100", "300"],
  subsets: ["latin"],
  variable: "--font-Lato"
});
const raleway = Raleway({
  weight: ["400", "500", "700", "600"],
  subsets: ["latin"],
  variable: "--font-Raleway",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-Orbitron",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-Rajdhani",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MES NIT Rourkela",
  description: "Mining Engineering Society, NIT Rourkela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${roboto.variable} ${lato.variable} ${pd.variable} ${raleway.variable} ${bebas.variable} ${rajdhani.variable} ${orbitron.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NavbarSwitcher />
        {children}
        <Footer />
      </body>
    </html>
  );
}
