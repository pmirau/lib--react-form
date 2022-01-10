import '../styles/globals.css'
import '@pmirau/lib--react-form/dist/main.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
