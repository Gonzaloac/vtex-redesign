// -----------------------------------------------------------------------------
// 8. components/blocks/InfoBar.tsx
// -----------------------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import { Truck, Headphones, CreditCard, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface InfoBarProps {
  showFreeShippingBar?: boolean;
}

interface InfoItem {
  id: number
  icon: React.ReactNode
  title: string
  subtitle: string
}

const infoItems: InfoItem[] = [
  { id: 1, icon: <Truck size={40} className="text-white" />, title: 'Envíos', subtitle: 'Delivery a todo el Perú' },
  { id: 2, icon: <Headphones size={40} className="text-white" />, title: 'Atención 9AM/6PM', subtitle: 'Te brindamos soporte en línea' },
  { id: 3, icon: <CreditCard size={40} className="text-white" />, title: '100% Seguridad de Pagos', subtitle: 'Respaldado por Mercado Pago' },
  { id: 4, icon: <Package size={40} className="text-white" />, title: 'Cambios y Devoluciones', subtitle: '48 horas' },
]

// Componente para la barra de progreso de envío gratis
const FreeShippingBar = () => {
  const { subtotal } = useCart();
  const freeShippingThreshold = 220; // Umbral para envío gratis en S/
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  
  return (
    <div className="bg-white py-3 px-4 shadow-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-green-600" />
            {subtotal >= freeShippingThreshold ? (
              <p className="text-sm font-medium">¡Felicidades! Tu pedido tiene <span className="font-bold text-green-600">envío gratis</span></p>
            ) : (
              <p className="text-sm font-medium">
                ¡Solo te falta <span className="font-bold text-green-600">S/ {remaining.toFixed(2)}</span> para un envío gratis!
              </p>
            )}
          </div>
          
          <div className="w-full sm:w-1/2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: '#1ab25a' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InfoBar({ showFreeShippingBar = false }: InfoBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Activar las animaciones cuando el componente se monta
    setIsVisible(true);
    
    // Check if mobile for icon sizing
    setIsMobile(window.innerWidth < 640);
    
    // Add resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Variantes para las animaciones del contenedor
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Retraso entre cada elemento hijo
      },
    },
  };

  // Variantes para las animaciones de cada elemento
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    },
  };

  // Variantes para el icono
  const iconVariants = {
    hover: { 
      scale: 1.1,
      rotate: [0, 5, -5, 0], // Pequeña oscilación
      transition: { 
        duration: 0.5,
        ease: "easeInOut",
        repeat: 0
      } 
    },
  };

  return (
    <>
      {showFreeShippingBar && <FreeShippingBar />}
      <section style={{ backgroundColor: '#1ab25a' }} className="py-10 lg:py-12 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-white text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {infoItems.map(item => (
            <motion.div 
              key={item.id} 
              className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg transition-colors duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                backgroundColor: '#159a4e',
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div 
                variants={iconVariants}
                whileHover="hover"
                className="p-2 md:p-3 rounded-full transition-colors duration-300"
                style={{ backgroundColor: '#1ab25a' }}
              >
                {React.cloneElement(item.icon as React.ReactElement, { size: isMobile ? 30 : 40 })}
              </motion.div>
              <motion.h4 
                className="font-semibold text-[16px] md:text-[18px] leading-snug mt-1 md:mt-2"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {item.title}
              </motion.h4>
              <p className="text-[14px] md:text-[16px] leading-snug font-light">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  )
}