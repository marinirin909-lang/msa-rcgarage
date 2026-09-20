import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VOLTRIX - RC Brushless Motor',
  description: 'Siri motor RC brushless berprestasi tinggi VOLTRIX: Spark, Storm, Apex & Black Edition. Power You Can Feel.',
  openGraph: {
    title: 'VOLTRIX - RC Brushless Motor',
    description: 'Siri motor RC brushless berprestasi tinggi VOLTRIX: Spark, Storm, Apex & Black Edition. Power You Can Feel.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#F8F9FA] dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
