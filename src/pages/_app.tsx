import '@/styles/globals.css' // 👈 Esta línea importa los estilos de Tailwind
import type { AppProps } from 'next/app'
import CartProvider from '@/context/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}
