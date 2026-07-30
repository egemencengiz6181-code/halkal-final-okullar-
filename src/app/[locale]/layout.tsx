import type { Metadata } from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  const origin = 'https://www.halkalifinal.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'LGS Dershanesi',
      'Halkalı Dershanesi',
      'Küçükçekmece LGS',
      'Ortaokul Dershanesi İstanbul',
      '5. Sınıf Dershanesi',
      '6. Sınıf Dershanesi',
      '7. Sınıf Dershanesi',
      '8. Sınıf LGS Hazırlık',
      'LGS Kursu Halkalı',
      'Final LGS',
      'İstanbul Dershanesi',
      'LGS Başarı',
      'LGS Puanı Yükseltme',
    ],
    category: 'education',
    alternates: {
      canonical: `${origin}/${locale}`,
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Halkalı Final LGS Dershanesi',
      title: t('title'),
      description: t('description'),
      url: `${origin}/${locale}`,
      images: [
        {
          url: `${origin}/logos/final logo png.png`,
          width: 1200,
          height: 630,
          alt: 'Halkalı Final LGS Dershanesi',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Halkalı Final',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Halkalı Final LGS Dershanesi",
              "url": "https://www.halkalifinal.com",
              "description": "Küçükçekmece Halkalı'da LGS'ye hazırlık, ortaokul ve lise öğrencilerine özel ders programları.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Halkalı, Küçükçekmece",
                "addressRegion": "İstanbul",
                "addressCountry": "TR"
              },
              "telephone": "+902124953021",
              "sameAs": [
                "https://www.instagram.com/halkali.final.lgs.dershanesi/"
              ]
            })
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative font-sans" suppressHydrationWarning>
        <Providers locale={locale} messages={messages ?? {}}>
            <Navbar />
            <main className="relative z-10 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            {/* Mobil sticky buton — her sayfada görünür, layout seviyesinde */}
            <MobileStickyButton />
        </Providers>
      </body>
    </html>
  );
}
