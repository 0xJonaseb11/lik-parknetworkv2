import './globals.css';
import './theme.min.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import Head from 'next/head';
import Footer from '../components/Layout/Footer';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { Provider as JotaiProvider } from 'jotai';

export const metadata = {
  title: 'WePark | Parking network powered by Lisk ',
  description: 'DePiN Decentralized Parking Management with DAO Rewards"'
};

export default function RootLayout({
  children,
}: any) {
  return (
    <JotaiProvider>
      <SessionProvider>
        <html lang="en" className="h-full bg-gray-50">
          <body className="h-full">
            {/* <Suspense> */}
              <Nav />
            {/* </Suspense> */}
            <main className="page-wrapper">
              {children}
              <Footer />
            </main>
            <Analytics />

            {/* <Script src="https://silicon.createx.studio/assets/vendor/swiper/swiper-bundle.min.js"></Script>
          <Script src="https://silicon.createx.studio/assets/js/theme.min.js"></Script> */}
            <Script src="https://silicon.createx.studio/assets/vendor/jarallax/dist/jarallax.min.js" strategy='afterInteractive'></Script>
            {/* <Script src="https://silicon.createx.studio/assets/vendor/swiper/swiper-bundle.min.js"></Script> */}
            <Script src="https://silicon.createx.studio/assets/vendor/lightgallery/lightgallery.min.js"></Script>
            <Script src="https://silicon.createx.studio/assets/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js"></Script>
            <Script src="https://silicon.createx.studio/assets/vendor/lightgallery/plugins/zoom/lg-zoom.min.js"></Script>
            <Script src="https://silicon.createx.studio/assets/vendor/lightgallery/plugins/video/lg-video.min.js"></Script>
            <Script src="https://silicon.createx.studio/assets/vendor/lightgallery/plugins/thumbnail/lg-thumbnail.min.js"></Script>

            <Script src="https://silicon.createx.studio/assets/js/theme.min.js" strategy='afterInteractive'></Script>
          </body>
        </html>
      </SessionProvider>
    </JotaiProvider>
  );
}
