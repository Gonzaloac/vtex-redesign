import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashSaleProps {
  endDate: Date;
}

const FlashSaleSection: React.FC<FlashSaleProps> = ({ endDate }) => {
  const { addToCart, openCart } = useCart();
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
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          {/* Encabezado con título y temporizador en la misma línea */}
          <div className="flex flex-col md:flex-row items-center w-full justify-between mb-4 md:mb-0">
            {/* Logo y título */}
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold mr-2">OFERTAS</h2>
                <h3 className="text-xl font-bold text-yellow-400 mr-2">RELÁMPAGO</h3>
                <div className="inline-block bg-yellow-400 text-green-800 text-xs font-bold px-2 py-1 rounded">
                  ¡POR TIEMPO LIMITADO!
                </div>
              </div>
            </div>
            
            {/* Temporizador */}
            <div className="flex space-x-2">
              <div className="bg-white bg-opacity-20 rounded p-2 text-center min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-xs">Días</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-2 text-center min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs">Horas</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-2 text-center min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs">Minutos</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-2 text-center min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs">Segundos</div>
              </div>
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
                  <div className="p-4">
                    {/* Imagen del producto */}
                    <Link href={`/product/${product.id}`}>
                      <div className="flex justify-center h-48 mb-4">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-full object-contain"
                        />
                      </div>
                    </Link>
                    
                    {/* Marca/Categoría */}
                    <div className="text-xs text-gray-500 uppercase mb-1">{product.subtitle}</div>
                    
                    {/* Título del producto */}
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-base font-medium line-clamp-2 h-12 mb-4">{product.title}</h3>
                    </Link>
                    
                    {/* Precio */}
                    <div className="text-xl font-bold text-green-600 mb-4">S/ {discountedPrice}</div>
                    
                    {/* Botón de agregar al carrito */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                    >
                      Agregar al carrito
                    </button>
                    
                    {/* Opciones de entrega */}
                    <div className="flex mt-3 text-sm">
                      <div className="flex items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Delivery</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Recojo en tienda</span>
                      </div>
                    </div>
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
