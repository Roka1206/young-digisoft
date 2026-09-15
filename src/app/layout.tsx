import type { Metadata } from "next";
import { Alata, Roboto_Slab } from "next/font/google";
import "./globals.css";

const alata = Alata({
  variable: "--font-alata",
  subsets: ["latin"],
  weight: "400",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Young Digisoft",
  description: "Landing page de Young Digisoft",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${alata.variable} ${robotoSlab.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
