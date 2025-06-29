// -----------------------------------------------------------------------------
// components/blocks/BrandsCarousel.tsx
// -----------------------------------------------------------------------------
import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Brand {
  id: number
  name: string
  logo: string
  alt: string
}

const brands: Brand[] = [
  { id: 1, name: 'La Purita', logo: '/lapurita.svg', alt: 'Logo La Purita' },
  { id: 2, name: 'Smart Blends', logo: '/smartblends.webp', alt: 'Logo Smart Blends' },
  { id: 3, name: 'Magnesol', logo: '/magnesol.svg', alt: 'Logo Magnesol' },
  { id: 4, name: "Nature's Truth", logo: '/natures.svg', alt: "Logo Nature's Truth" },
  { id: 5, name: 'Peruvian Beef', logo: '/peruvian.svg', alt: 'Logo Peruvian Beef' },
  { id: 6, name: 'Lab Nutrition', logo: '/lab.svg', alt: 'Logo Lab Nutrition' },
  { id: 7, name: 'Nutri', logo: '/nutri.svg', alt: 'Logo Nutri' },
]

export default function BrandsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Repetir las marcas varias veces para crear un efecto infinito
  const repeatedBrands = [...brands, ...brands, ...brands, ...brands]
  
  // Función para desplazarse a la izquierda
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }
  
  // Función para desplazarse a la derecha
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }
  
  // Detectar cuando el scroll llega cerca de los extremos para simular infinito
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // Si estamos cerca del final, saltar al inicio
      if (scrollLeft + clientWidth >= scrollWidth - 500) {
        // Esperar a que termine la animación y luego saltar sin animación
        setTimeout(() => {
          carouselRef.current!.scrollTo({ left: 500, behavior: 'auto' });
        }, 300);
      }
      
      // Si estamos cerca del inicio, saltar al final
      if (scrollLeft <= 500) {
        // Esperar a que termine la animación y luego saltar sin animación
        setTimeout(() => {
          carouselRef.current!.scrollTo({ 
            left: carouselRef.current!.scrollWidth - clientWidth - 500, 
            behavior: 'auto' 
          });
        }, 300);
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      
      // Iniciar en una posición intermedia para permitir scroll en ambas direcciones
      carousel.scrollLeft = brands.length * 240;
    }
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Nuestras marcas</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Trabajamos con las mejores marcas para ofrecerte productos de calidad que cuidan tu salud y bienestar.
          </p>
        </motion.div>

        <div className="relative">
          {/* Botón izquierdo */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-green-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 hidden md:flex items-center justify-center"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-5 h-5 text-green-600" />
          </button>

          {/* Carrusel */}
          <div className="relative overflow-hidden">
            <motion.div 
              ref={carouselRef}
              className="flex overflow-x-auto py-8 px-2 scrollbar-hide snap-none"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {repeatedBrands.map((brand, index) => (
                <motion.div 
                  key={`${brand.id}-${index}`} 
                  className="flex-shrink-0 w-[240px] mx-1 flex flex-col items-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                >
                  <div className="h-[180px] flex items-center justify-center w-full">
                    <img 
                      src={brand.logo} 
                      alt={brand.alt} 
                      className="max-h-[160px] max-w-full object-contain"
                    />
                  </div>
                  <p className="text-center text-lg font-medium text-gray-700 mt-3">{brand.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Botón derecho */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-green-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 hidden md:flex items-center justify-center"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-5 h-5 text-green-600" />
          </button>
        </div>

        {/* Indicadores móviles */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex space-x-2">
            {[...Array(Math.min(5, brands.length))].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
