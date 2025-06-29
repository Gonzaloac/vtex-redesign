import '@/styles/globals.css' // 👈 Esta línea importa los estilos de Tailwind
import type { AppProps } from 'next/app'
import CartProvider from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Component {...pageProps} />
      </WishlistProvider>
    </CartProvider>
  )
}
