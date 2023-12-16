import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import localFont from "next/font/local"
import { useEffect } from 'react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux'
import Footer from '@/components/Footer/Footer';

export const creepyFont = localFont({ src: "../font/Creepy.woff" })
export const lunacyFont = localFont({ src: "../font/Lunacy.woff" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={creepyFont.className}>
        <Component {...pageProps} />
        <Footer />
      </main>
    </Provider>
  )
}
