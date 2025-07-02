import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight, Truck, Store, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface FlashSaleProps {
  endDate: Date;
}

const FlashSaleSection: React.FC<FlashSaleProps> = ({ endDate }) => {
  const { addToCart, openCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isActive, setIsActive] = useState(true);

  // Seleccionar productos con descuento para ofertas relámpago
  const flashSaleProducts = products
    .filter(product => product.discount && product.discount > 0)
    .slice(0, 4); // Limitar a 4 productos

  useEffect(() => {
    // Verificar si la fecha de finalización ya pasó
    const now = new Date();
    if (endDate < now) {
      setIsActive(false);
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        setIsActive(false);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  // Función para agregar un producto al carrito
  const handleAddToCart = (product) => {
    const discountedPrice = product.discount 
      ? product.price * (1 - product.discount / 100)
      : product.price;
      
    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: discountedPrice,
      image: product.image,
      quantity: 1,
      subtitle: product.subtitle
    });
    
    // Abrir el carrito después de agregar el producto
    openCart();
  };

  // Funciones para el carrusel en móvil
  const scrollLeft = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
      
      if (currentSlide < flashSaleProducts.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
  };
  
  if (!isActive || flashSaleProducts.length === 0) return null;
  
  return (
    <div className="bg-green-600 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Encabezado con título, temporizador y botón en la misma línea */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Título a la izquierda */}
            <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#98ce92]">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <h2 className="text-3xl md:text-4xl font-bold mr-3">OFERTAS</h2>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#98ce92] mr-3">RELÁMPAGO</h3>
                  <div className="hidden md:inline-block bg-[#98ce92] text-green-800 text-sm font-bold px-3 py-1.5 rounded">
                    ¡POR TIEMPO LIMITADO!
                  </div>
                </div>
                <div className="md:hidden bg-[#98ce92] text-green-800 text-sm font-bold px-3 py-1.5 rounded mt-2 self-start">
                  ¡POR TIEMPO LIMITADO!
                </div>
              </div>
            </div>

            {/* Temporizador en el centro */}
            <div className="flex mb-4 md:mb-0 md:w-1/3 justify-center">
              <div className="flex space-x-2 md:space-x-4">
                <div className="bg-white bg-opacity-20 rounded p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                  <div className="text-xl md:text-3xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm">Días</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                  <div className="text-xl md:text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm">Horas</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                  <div className="text-xl md:text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm">Minutos</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded p-2 md:p-3 text-center min-w-[50px] md:min-w-[60px]">
                  <div className="text-xl md:text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm">Segundos</div>
                </div>
              </div>
            </div>

            {/* Botón "Ver más" a la derecha */}
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link href="/ofertas" className="inline-block bg-white text-green-600 hover:bg-gray-100 font-medium px-4 py-2 rounded-md transition-colors">
                Ver más
              </Link>
            </div>
          </div>
        </div>
        
        {/* Productos en oferta relámpago */}
        <div className="relative">
          {/* Botón izquierdo para móvil */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden flex items-center justify-center"
            aria-label="Producto anterior"
          >
            <ChevronLeft className="w-5 h-5 text-green-600" />
          </button>
          
          {/* Contenedor del carrusel */}
          <div 
            ref={carouselRef} 
            className="flex md:grid md:grid-cols-4 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:overflow-x-visible"
          >
            {flashSaleProducts.map(product => {
              const discountedPrice = product.discount 
                ? (product.price * (1 - product.discount / 100)).toFixed(2)
                : product.price.toFixed(2);
                
              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden text-black hover:shadow-lg transition-shadow flex-shrink-0 w-[85%] md:w-full snap-center mr-4 md:mr-0"
                >
                  <div className="p-3 relative">
                    {/* Botón de lista de deseos */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const productId = product.id.toString();
                        if (isInWishlist(productId)) {
                          removeFromWishlist(productId);
                        } else {
                          addToWishlist(productId);
                        }
                      }}
                      className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow z-10"
                      aria-label={isInWishlist(product.id.toString()) ? "Quitar de lista de deseos" : "Añadir a lista de deseos"}
                    >
                      <Heart 
                        size={18} 
                        className={`${isInWishlist(product.id.toString()) ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
                      />
                    </button>
                    
                    {/* Imagen del producto */}
                    <Link href={`/product/${product.id}`}>
                      <div className="flex justify-center h-40 mb-2">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-full object-contain"
                        />
                      </div>
                    </Link>
                    
                    {/* Marca/Categoría */}
                    <div className="text-xs text-gray-500 uppercase mb-0.5">{product.subtitle}</div>
                    
                    {/* Título del producto */}
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-base font-medium line-clamp-2 h-10 mb-1">{product.title}</h3>
                    </Link>
                    
                    {/* Precio */}
                    <div className="text-xl font-bold text-green-600 mb-2">S/ {discountedPrice}</div>
                    
                    {/* Opciones de entrega */}
                    <div className="flex mb-2 text-sm gap-2">
                      <div className="flex items-center bg-gray-50 px-2 py-1 rounded shadow-sm">
                        <Truck size={16} className="text-green-600 mr-1" />
                        <span>Delivery</span>
                      </div>
                      <div className="flex items-center bg-gray-50 px-2 py-1 rounded shadow-sm">
                        <Store size={16} className="text-green-600 mr-1" />
                        <span>Recojo en tienda</span>
                      </div>
                    </div>
                    
                    {/* Botón de agregar al carrito */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors text-lg"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Botón derecho para móvil */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden flex items-center justify-center"
            aria-label="Siguiente producto"
          >
            <ChevronRight className="w-5 h-5 text-green-600" />
          </button>
        </div>
        
        {/* Indicadores de posición para móvil */}
        <div className="flex justify-center mt-4 md:hidden">
          {flashSaleProducts.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full mx-1 ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleSection;
