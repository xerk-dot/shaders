import Providers from '@components/Providers';
import DefaultLayout from '@root/components/page/DefaultLayout';
import { Suspense } from 'react';
import DebugGrid from '@components/DebugGrid';
import DefaultActionBar from '@components/page/DefaultActionBar';
import Navigation from '@components/Navigation_updated';
import ThemeInitializer from '@components/ThemeInitializer';
import Footer from '@components/Footer';
import Package from '@root/package.json';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ThemeInitializer />
        <Providers>
          <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
            <Suspense fallback={<div>Loading...</div>}>
              <br />
              <DebugGrid />
              <DefaultActionBar />
              <Navigation
                logo="✶"
                logoRightAligned={true}
                right={<></>}
              />
              {children}
              <Footer 
                companyName="Shaders"
                packageVersion={Package.version}
              />
            </Suspense>
          </DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
