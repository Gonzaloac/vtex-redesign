import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideProps {
  title: string
  subtitle: string
  image: string
  mobileImage?: string
  ctaText: string
  ctaLink: string
}

interface Props {
  slides: SlideProps[]
}

// Datos de ejemplo para los slides (esto se puede mover a un archivo de datos separado)
const defaultSlides: SlideProps[] = [
  {
    title: "",
    subtitle: "",
    image: "/banner-organa.jpg",
    mobileImage: "/banner-organa.jpg",
    ctaText: "",
    ctaLink: ""
  },
  {
    title: "",
    subtitle: "",
    image: "/banner-organa.jpg",
    mobileImage: "/banner-organa.jpg",
    ctaText: "",
    ctaLink: "/categorias/suplementos"
  },
  {
    title: "Alimentos orgánicos",
    subtitle: "Nutrición consciente para tu bienestar",
    image: "/images/hero/hero-3.jpg",
    mobileImage: "/images/hero/hero-3-mobile.jpg",
    ctaText: "Explorar alimentos",
    ctaLink: "/categorias/abarrotes"
  }
]

export default function HeroBanner({ slides = defaultSlides }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Duración de la transición
  }
  
  // Función para retroceder al slide anterior
  const prevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Duración de la transición
  }
  
  // Configurar autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Cambiar slide cada 5 segundos
    
    return () => clearInterval(interval)
  }, [currentSlide])
  
  // Funciones para manejar gestos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Deslizar a la izquierda -> siguiente slide
      nextSlide()
    }
    
    if (touchStart - touchEnd < -50) {
      // Deslizar a la derecha -> slide anterior
      prevSlide()
    }
  }
  
  return (
    <section className="relative w-full overflow-hidden">
      {/* Contenedor del slider */}
      <div 
        className="relative w-full min-h-[400px] md:min-h-[550px] transition-transform duration-500 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        {slides.map((slide, index) => {
          // Determinar qué imagen usar basado en el tamaño de pantalla
          const bgImage = `url(${slide.mobileImage || slide.image})`;
          
          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-start px-6 md:px-10 text-white transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                backgroundImage: bgImage,
              }}
            >
              <style jsx>{`
                @media (min-width: 768px) {
                  div {
                    background-image: url(${slide.image}) !important;
                  }
                }
              `}</style>
              <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-3 md:mb-4">{slide.title}</h1>
                <p className="text-base md:text-lg drop-shadow-lg mb-4 md:mb-6">{slide.subtitle}</p>
           
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Controles de navegación */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Botones de navegación (solo visibles en pantallas medianas y grandes) */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20 hidden md:flex items-center justify-center"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20 hidden md:flex items-center justify-center"
        aria-label="Siguiente slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  )
}