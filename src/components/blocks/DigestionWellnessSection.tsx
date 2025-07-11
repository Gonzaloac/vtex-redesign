import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { digestionProducts } from '@/data/digestionProducts';

const DigestionWellnessSection: React.FC = () => {
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calcular precio con descuento
  const calculateDiscountedPrice = (price: number, discount?: number) =>
    discount ? +(price * (1 - discount / 100)).toFixed(2) : price;
  
  // Función para manejar la adición al carrito
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: calculateDiscountedPrice(product.price, product.discount),
      image: product.image,
      quantity: 1
    });
  };

  // Función para desplazar el carrusel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          {/* Banner lateral con título de categoría (a la derecha) */}
          <div className="lg:w-1/4 relative rounded-xl overflow-hidden min-h-[300px] lg:min-h-[500px]">
            <Image 
              src="/Categoria-de-impulso-digestion-1.png" 
              alt="Digestión y Bienestar Interno"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Carrusel de productos (a la izquierda) */}
          <div className="lg:w-3/4 relative flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Digestión y Bienestar Interno</h2>
            <p className="text-gray-600 mb-8">Suplementos naturales para mejorar tu salud digestiva</p>
            
            {/* Botones de navegación */}
            <div className="hidden md:block">
              <button 
                onClick={() => scrollCarousel('left')}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-green-600 text-white rounded-full shadow-md p-2 hover:bg-green-700 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft />
              </button>
              
              <button 
                onClick={() => scrollCarousel('right')}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-green-600 text-white rounded-full shadow-md p-2 hover:bg-green-700 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight />
              </button>
            </div>
            
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {digestionProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="min-w-[240px] md:min-w-[220px] max-w-[240px] md:max-w-[220px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 snap-start"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative p-4 h-[180px] flex items-center justify-center">
                      <Image 
                        src={product.image} 
                        alt={product.title}
                        width={150}
                        height={150}
                        className="max-h-full max-w-full object-contain"
                      />
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold px-2.5 py-1 rounded-md shadow-md transform scale-110">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase mb-1">{product.subtitle}</p>
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2 min-h-[2.5rem] hover:text-green-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      {product.discount ? (
                        <> 
                          <p className="text-gray-500 text-xs line-through">S/ {product.price.toFixed(2)}</p>
                          <p className="text-green-600 text-lg font-bold">S/ {(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                        </>
                      ) : (
                        <p className="text-green-600 text-lg font-bold">S/ {product.price.toFixed(2)}</p>
                      )}
                    </div>

                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded transition-colors"
                    >
                      AGREGAR AL CARRITO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigestionWellnessSection;
