import { AppProps } from 'next/app'
import '../styles/myglobal.css'
export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}