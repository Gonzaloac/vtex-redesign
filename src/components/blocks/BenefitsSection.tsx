// -----------------------------------------------------------------------------
// 7. components/blocks/BenefitsSection.tsx
// -----------------------------------------------------------------------------
import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Benefit {
  id: number
  title: string
  image: string
}

const benefits: Benefit[] = [
  { id: 1, title: 'Sueño y Relajación', image: '/Categoria-de-impulso-sueño-1.png' },
  { id: 2, title: 'Digestión y Bienestar Interno', image: '/Categoria-de-impulso-digestion-1.png' },
  { id: 3, title: 'Energía y Concentración', image: '/Categoria-de-impulso-concentracion-1.png' },
  { id: 4, title: 'Cuidado y Belleza', image: '/Categoria-de-impulso-belleza-1.png' },
]

export default function BenefitsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < benefits.length) {
      const newIndex = Math.max(0, Math.min(index, benefits.length - 1));
      setCurrentIndex(newIndex);
      
      // En móvil, hacer scroll al elemento correspondiente
      if (window.innerWidth < 640) {
        const container = scrollContainerRef.current;
        const itemWidth = container.offsetWidth;
        container.scrollTo({
          left: newIndex * itemWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  return (
    <section className="py-12 bg-[#f9f8f5]">
      <div className="container mx-auto px-4">
        <h2 className="text-[24px] font-bold text-center mb-8 text-gray-800">Te ayudamos a lograr tus objetivos</h2>
        <div className="relative px-8">
          <button 
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full p-2 shadow z-10 text-white"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Anterior categoría"
          >
            <ChevronLeft size={24} />
          </button>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {benefits.map((item, index) => (
              <div 
                key={item.id} 
                className="relative rounded-lg overflow-hidden flex-shrink-0 w-full sm:w-auto snap-center transition-transform hover:scale-[1.02] duration-200 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            ))}
          </div>
          <button 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-green-600 rounded-full p-2 shadow z-10 text-white"
            onClick={handleNext}
            disabled={currentIndex === benefits.length - 1}
            aria-label="Siguiente categoría"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <style jsx>{`
        /* Ocultar scrollbar para Chrome, Safari y Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
