// src/pages/wishlist.tsx
import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import { useWishlist } from '@/context/WishlistContext'
import { products } from '@/data/products'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [wishlistProducts, setWishlistProducts] = useState([])
  
  // Obtener los productos completos de la lista de deseos
  useEffect(() => {
    const productsInWishlist = products.filter(product => 
      wishlist.includes(product.id.toString())
    )
    setWishlistProducts(productsInWishlist)
  }, [wishlist])
  
  // Función para añadir al carrito
  const handleAddToCart = (product) => {
    const discountedPrice = product.discount 
      ? +(product.price * (1 - product.discount/100)).toFixed(2)
      : product.price
      
    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: discountedPrice,
      image: product.image,
      quantity: 1,
      sku: `SKU-${product.id}`,
    })
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mi Lista de Deseos</h1>
        
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 4.471 3.269 6.715 5.636 8.25C10.69 18.061 12 19.2 12 19.2s1.31-1.139 3.364-2.7C17.731 14.965 21 12.721 21 8.25z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Tu lista de deseos está vacía</h2>
            <p className="text-gray-600 mb-6">Añade productos a tu lista de deseos para guardarlos para más tarde</p>
            <Link href="/" className="bg-[#16a34a] hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="p-4 flex items-center justify-center h-48">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                  </Link>
                  <button 
                    onClick={() => removeFromWishlist(product.id.toString())}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all"
                    aria-label="Quitar de favoritos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.893 7.929 7.929 0 01-2.365-5.273c0-3.183 2.58-5.766 5.762-5.766 1.56 0 3.05.645 4.13 1.78 1.08-1.135 2.57-1.78 4.13-1.78 3.183 0 5.762 2.583 5.762 5.766 0 1.936-.87 3.778-2.365 5.273a15.247 15.247 0 01-5.201 3.893l-.022.012-.007.003-.002.001a.75.75 0 01-.704 0l-.002-.001z" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4 border-t flex-grow">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-green-600 transition-colors line-clamp-2">{product.title}</h3>
                  </Link>
                  <p className="text-green-600 font-bold text-lg mb-4">
                    S/ {product.discount 
                      ? (product.price * (1 - product.discount/100)).toFixed(2)
                      : product.price.toFixed(2)
                    }
                    {product.discount && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        S/ {product.price.toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
                
                <div className="p-4 pt-0">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#16a34a] hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Añadir al carrito</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
