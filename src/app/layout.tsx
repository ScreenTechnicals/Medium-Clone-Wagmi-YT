import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ClientProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stater Template for Rainbowkit and Next Js",
  description:
    "This is a stater template which uses Next Js 14 (app router) with Rainbowkit, Wagm, Viem and Tailwind CSS. We have shown how you can connect to your wallet i.e. metamask wallet, created a smaple todo app example so that you can see how to write and read a smart contract from client side.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>{children}</ClientProvider>
        </body>
      </html>
    </>
  );
}
