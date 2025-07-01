// -----------------------------------------------------------------------------
// 2. components/blocks/ProductShelf.tsx  (con enlaces)
// -----------------------------------------------------------------------------
import React, { useState } from 'react'
import Link from 'next/link'
import { Truck, Store, ChevronDown } from 'lucide-react'

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
  const [showAllMobile, setShowAllMobile] = useState(false)
  
  // Determinar cuántos productos mostrar según el estado y el tamaño de pantalla
  const displayedProducts = showAllMobile ? products : products.slice(0, 4)
  
  // Renderizar un producto individual
  const renderProduct = (prod: Product) => {
    const discounted = calculateDiscountedPrice(prod.price, prod.discount)
    return (
      <Link key={prod.id} href={`/product/${prod.id}`} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:border-2 hover:border-green-600 transition-all duration-300 flex flex-col h-full">
        <div className="relative p-2 md:p-3 flex-grow flex items-center justify-center aspect-square">
          <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
          {prod.discount && (
            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs md:text-sm font-semibold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-md">
              -{prod.discount}%
            </span>
          )}
        </div>
        <div className="p-3 md:p-5 pt-1 md:pt-2 flex flex-col justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-500 uppercase mb-0.5 md:mb-1.5">{prod.subtitle}</p>
            <h3 className="text-sm md:text-lg font-semibold mb-1.5 md:mb-2.5 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">{prod.title}</h3>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-1.5 md:gap-2.5 mb-2 md:mb-3.5">
              {prod.discount ? (
                <> 
                  <p className="text-gray-500 text-xs md:text-sm line-through">S/ {prod.price.toFixed(2)}</p>
                  <p className="text-green-600 text-base md:text-xl font-bold">S/ {discounted.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-green-600 text-base md:text-xl font-bold mb-2 md:mb-3.5">S/ {prod.price.toFixed(2)}</p>
              )}
            </div>
            
            {/* Íconos de disponibilidad - compacto en móvil, original en desktop */}
            <div className="md:hidden flex items-center text-xs text-gray-600 mb-2">
              <Truck size={12} className="text-green-600 mr-0.5" />
              <span>Delivery</span>
              <span className="mx-1">·</span>
              <Store size={12} className="text-green-600 mr-0.5" />
              <span>Recojo</span>
            </div>
            
            {/* Versión desktop con el estilo original */}
            <div className="hidden md:flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-md">
                <Truck size={16} className="text-green-600" />
                <span className="text-xs font-medium">Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-md">
                <Store size={16} className="text-green-600" />
                <span className="text-xs font-medium">Recojo en tienda</span>
              </div>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs md:text-base font-semibold py-1.5 md:py-2.5 rounded-md transition-colors">
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
          
          {/* Productos para desktop - siempre mostrar todos */}
          <div className="hidden md:contents">
            {products.slice(0, 8).map(renderProduct)}
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
      </div>
    </section>
  )
}