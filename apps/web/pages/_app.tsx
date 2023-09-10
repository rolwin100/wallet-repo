import type { AppProps } from 'next/app'

import 'antd/dist/reset.css'
import '../styles/global.css'
import AppLayout from '../components/AppLayout'
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
 
export default function PageLayout({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);
 
  return getLayout(<Component {...pageProps} />);
}