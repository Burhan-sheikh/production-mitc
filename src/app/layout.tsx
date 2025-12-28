import type { Metadata } from 'next';
import { Provider } from '@/app/provider';
import Header from '@/components/Header';
import { FloatingButtons } from '@/components/FloatingButtons';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'MITC - Mateen IT Corp | Laptop Sales & Technical Services',
  description: 'Kashmir\'s Tech Authority Since 2013. Professional laptop sales and technical services in Srinagar.',
  keywords: ['laptop sales', 'technical services', 'Srinagar', 'Kashmir'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'MITC',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-gray-900">
        <Provider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <FloatingButtons />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">MITC</h3>
            <p className="text-gray-600 text-sm">Kashmir's Tech Authority Since 2013</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-600 hover:text-primary-600">Home</a></li>
              <li><a href="/services" className="text-gray-600 hover:text-primary-600">Services</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-primary-600">About</a></li>
              <li><a href="/ratings" className="text-gray-600 hover:text-primary-600">Ratings</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Srinagar, Jammu & Kashmir</p>
              <p>Working Hours: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            &copy; 2024 MITC - Mateen IT Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
