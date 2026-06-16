import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دعوة خطوبة محمد وهاجر",
  description: "دعوة رسمية لحضور حفل خطوبة محمد وهاجر - الجمعة 17 يوليو 2026 - Metro Cafe",
  openGraph: {
    title: "دعوة خطوبة محمد وهاجر",
    description: "دعوة رسمية لحضور حفل خطوبة محمد وهاجر",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FAF6F0" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
