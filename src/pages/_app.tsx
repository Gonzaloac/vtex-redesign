import '@/styles/globals.css';
import { AppProps } from 'next/app';
import CartProvider from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <CartProvider>
        <WishlistProvider>
          <Component {...pageProps} />
        </WishlistProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}