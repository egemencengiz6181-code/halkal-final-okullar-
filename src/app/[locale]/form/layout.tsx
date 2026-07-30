import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayıt Formu | Halkalı Final LGS Dershanesi',
  description: 'Halkalı Final LGS Dershanesi kayıt ve bilgi formu.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
