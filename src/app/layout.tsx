"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Head } from 'next/document';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local'


// export const metadata: Metadata = {
//   title: "Responsive Price Calculator",
//   description: "Cronos Lab Interview task Responsive Price Calculator",
// };

/*Temporary fix. Material UI having problem with SSR*/
export const ThemeLayout = dynamic(() => import('layout/ThemeLayout'), {
  ssr: false,
});

const manropeFont = localFont({
  src: [
    {
      path: '../fonts/Manrope-Regular.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Manrope-Bold.ttf',
      weight: '800',
      style: 'bold',
    },
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ThemeLayout>
      <html lang="en">
        <body className={manropeFont.className}>{children}</body>
      </html>
    </ThemeLayout>
  );
}
