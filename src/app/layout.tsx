import { Geist, Geist_Mono, Lobster } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lobsterFont = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Mood Playlist Generator",
  description: "Generate a random YouTube playlist or video based on your mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3998650725257627"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased animate-gradient bg-gradient-to-br from-rose-300 from-[27%] via-sky-500 via-[60%] to-indigo-500 to-[90%]`}
      >
        {children}
      </body>
    </html>
  );
}
