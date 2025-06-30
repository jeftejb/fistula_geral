
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // O seu CSS global do Tailwind

// Carrega a fonte Inter a partir do Google Fonts
const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Fístula Obstétrica: Prevenção, Tratamento e Esperança",
  description: "Uma plataforma dedicada ao combate à fístula obstétrica em Angola, em parceria com o CEML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}