import Providers from '@components/Providers';

import DefaultLayout from '@root/components/page/DefaultLayout';
import { Suspense } from 'react';
import DebugGrid from '@components/DebugGrid';
import DefaultActionBar from '@components/page/DefaultActionBar';
import Link from 'next/link';
import Navigation from '@components/Navigation_updated';
import ModalCreateAccount from '@components/modals/ModalCreateAccount';
import ModalTrigger from '@components/ModalTrigger';
import ActionButton from '@components/ActionButton';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className="theme-dark">
        <Providers>
          <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
            <Suspense fallback={<div>Loading...</div>}>
              <br />
              <DebugGrid /> {/* This is the grid that shows the layout of the page */}
              <DefaultActionBar />
              <Navigation
                logo="✶"
                logoRightAligned={true}
                right={
                  <>
                    <ModalTrigger modal={ModalCreateAccount}>
                      <ActionButton>STUDIO</ActionButton>
                    </ModalTrigger>
                    <ModalTrigger modal={ModalCreateAccount}>
                      <ActionButton>MAP</ActionButton>
                    </ModalTrigger>
                    <ModalTrigger modal={ModalCreateAccount}>
                      <ActionButton>ACCOUNT</ActionButton>
                    </ModalTrigger>
                  </>
                }
              />


              {children}
            </Suspense>
          </DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
