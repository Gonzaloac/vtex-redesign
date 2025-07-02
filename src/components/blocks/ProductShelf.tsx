// -----------------------------------------------------------------------------
// 2. components/blocks/ProductShelf.tsx  (con enlaces)
// -----------------------------------------------------------------------------
import React from 'react'
import Link from 'next/link'
import { Truck, Store, ChevronDown, Heart } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'

interface Product {
  id: number
  title: string
  subtitle: string
  price: number
  image: string
  discount?: number
}

const products: Product[] = [
  { id: 1, title: 'Citrato de Magnesio Smart Blends 400gr', subtitle: 'Smartblend', price: 84.9, image: '/Citrato-Recomendado-1.png' },
  { id: 2, title: 'Ashwagandha 60 Caps Vegana', subtitle: 'Herbals & Health', price: 69.9, image: '/161711-1200-auto.png' },
  { id: 3, title: 'Resveratrol BioCenter 100 Caps', subtitle: 'BioCenter', price: 72.9, image: '/REVERATROL-CAP.png' },
  { id: 4, title: 'Fish Oil (Omega-3) 1000mg', subtitle: 'Organa', price: 196, image: '/Fish-Oil-Recomendado-1.png' },
  { id: 5, title: 'Melena de León Mush Organics 60caps', subtitle: 'Mush Organics', price: 75.65, image: '/162494-1200-auto.png', discount: 15 },
  { id: 6, title: 'HGH Releasing Xtralife 120tab', subtitle: 'xtralife', price: 178, image: '/162206-1200-auto.png' },
  { id: 7, title: 'Anxiety (Ashwagandha+Rhodiola) 60caps', subtitle: 'xtralife', price: 99, image: '/162193-1200-auto.png' },
  { id: 8, title: 'Citrato de Magnesio Smart Blends 200gr', subtitle: 'Smartblend', price: 44.9, image: '/162143-1200-auto.png' },
 // { id: 9, title: 'Glicinato de Magnesio 120 caps', subtitle: 'Nature\'s Truth', price: 139.9, image: '/162631-1200-auto.png' },
 // { id: 10, title: 'Co Q-10 Vitamin E & Omega-3', subtitle: 'Mason Naturals', price: 146, image: '/162886-1200-auto.png' },
]

// Calcula el precio con descuento si aplica
const calculateDiscountedPrice = (price: number, discount?: number) =>
  discount ? +(price * (1 - discount / 100)).toFixed(2) : price

export default function ProductShelf() {
  // Estado para controlar cuántos productos mostrar en móvil
  const [showAllMobile, setShowAllMobile] = React.useState(false)
  
  // Determinar cuántos productos mostrar según el estado y el tamaño de pantalla
  const displayedProducts = showAllMobile ? products : products.slice(0, 4)
  
  // Renderizar un producto individual
  const renderProduct = (prod: Product) => {
    const discounted = calculateDiscountedPrice(prod.price, prod.discount)
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
    const productId = prod.id.toString()
    
    const handleWishlistClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (isInWishlist(productId)) {
        removeFromWishlist(productId)
      } else {
        addToWishlist(productId)
      }
    }
    
    return (
      <Link key={prod.id} href={`/product/${prod.id}`} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:border-2 hover:border-green-600 transition-all duration-300 flex flex-col h-full">
        <div className="relative p-2 flex-grow flex items-center justify-center aspect-square">
          <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
          {prod.discount && (
            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md">
              -{prod.discount}%
            </span>
          )}
          {/* Botón de lista de deseos */}
          <button 
            onClick={handleWishlistClick}
            className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow"
            aria-label={isInWishlist(productId) ? "Quitar de lista de deseos" : "Añadir a lista de deseos"}
          >
            <Heart 
              size={18} 
              className={`${isInWishlist(productId) ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
            />
          </button>
        </div>
        <div className="p-3 pt-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-0.5">{prod.subtitle}</p>
            <h3 className="text-sm md:text-lg font-medium line-clamp-3 min-h-[2.75rem] md:min-h-[3.75rem] mb-1 md:mb-2">{prod.title}</h3>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-1.5 mb-2">
              {prod.discount ? (
                <> 
                  <p className="text-gray-500 text-xs line-through">S/ {prod.price.toFixed(2)}</p>
                  <p className="text-green-600 text-base font-bold">S/ {discounted.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-green-600 text-base font-bold mb-2">S/ {prod.price.toFixed(2)}</p>
              )}
            </div>
            
            {/* Íconos de disponibilidad con estilo actualizado */}
            <div className="flex mb-2 text-sm gap-2">
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded shadow-sm">
                <Truck size={16} className="text-green-600 mr-1" />
                <span className="text-xs">Delivery</span>
              </div>
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded shadow-sm">
                <Store size={16} className="text-green-600 mr-1" />
                <span className="text-xs">Recojo en tienda</span>
              </div>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-3 px-4 rounded-md transition-colors">
              Agregar al carrito
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section className="py-16 bg-[#f9f8f5]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">Los más vendidos</h2>
        
        {/* Grid para móvil (2 columnas) y desktop (4 columnas) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {/* Productos para móvil - limitados inicialmente a 4 (2 filas) */}
          <div className="contents md:hidden">
            {displayedProducts.map(renderProduct)}
          </div>
          
          {/* Productos para desktop - mostrar solo 4 (1 fila) */}
          <div className="hidden md:contents">
            {products.slice(0, 4).map(renderProduct)}
          </div>
        </div>
        
        {/* Botón "Mostrar más" solo en móvil y solo si hay más productos para mostrar */}
        {!showAllMobile && products.length > 4 && (
          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAllMobile(true)}
              className="flex items-center gap-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Mostrar más
              <ChevronDown size={18} />
            </button>
          </div>
        )}
        
        {/* Botón "Ver más" para desktop */}
        <div className="mt-8 hidden md:flex justify-center">
          <Link href="/productos">
            <button className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-2 rounded-full transition-colors">
              Ver más
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}