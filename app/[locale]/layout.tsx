import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bettery Ration — Здоровое питание с доставкой",
    template: "%s | Bettery Ration",
  },
  description:
    "Bettery Ration — сервис здорового питания. Свежие, сбалансированные блюда с доставкой к вашему столу.",
  keywords: [
    "здоровое питание",
    "доставка еды",
    "bettery",
    "рацион",
    "диетическое питание",
    "Ташкент",
  ],
  openGraph: {
    type: "website",
    title: "Bettery Ration",
    description: "Заряд здоровой энергии в каждой тарелке",
    siteName: "Bettery Ration",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "'Inter', sans-serif",
          // @ts-expect-error css custom property
          "--font-heading": "'Playfair Display', serif",
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TooltipProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
