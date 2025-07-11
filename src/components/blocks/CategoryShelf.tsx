import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CategoryProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  discount?: number;
}

interface CategoryShelfProps {
  title: string;
  description?: string;
  backgroundImage: string;
  textColor?: string;
  products: CategoryProduct[];
  showBannerText?: boolean;
}

const CategoryShelf: React.FC<CategoryShelfProps> = ({
  title,
  description,
  backgroundImage,
  textColor = 'text-white',
  products,
  showBannerText = false
}) => {
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Calcular precio con descuento
  const calculateDiscountedPrice = (price: number, discount?: number) =>
    discount ? +(price * (1 - discount / 100)).toFixed(2) : price;
  
  // Función para manejar la adición al carrito
  const handleAddToCart = (product: CategoryProduct) => {
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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Banner lateral con título de categoría */}
          <div className="lg:w-1/4 relative rounded-xl overflow-hidden min-h-[300px] lg:min-h-[500px]">
            <Image 
              src={backgroundImage} 
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {showBannerText && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h2 className={`text-4xl font-bold mb-3 ${textColor}`}>{title}</h2>
                {description && (
                  <p className={`text-lg ${textColor} mb-6`}>{description}</p>
                )}
                <Link 
                  href={`/categorias/${title.toLowerCase().replace(/ y /g, ' ').trim().replace(/\s+/g, '-')}`}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-2 px-6 rounded-lg inline-block w-fit transition-colors"
                >
                  Ver todo
                </Link>
              </div>
            )}
          </div>

          {/* Carrusel de productos */}
          <div className="lg:w-3/4 relative flex flex-col justify-center">
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

            {/* Contenedor del carrusel */}
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => {
                const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
                
                return (
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
                            <p className="text-green-600 text-lg font-bold">S/ {discountedPrice.toFixed(2)}</p>
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShelf;
