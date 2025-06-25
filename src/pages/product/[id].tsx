// src/pages/product/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState, useRef, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import { products, Product } from '@/data/products'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

// Componente para mostrar las estrellas de calificación
const RatingStars = ({ rating = 4.5, reviews = 6 }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />)
    }
  }

  return (
    <div className="flex items-center">
      <div className="flex mr-2">{stars}</div>
      <span className="text-sm text-gray-500">{reviews} reseñas</span>
    </div>
  )
}

// Componente de Acordeón
const AccordionItem = ({ title, children, isOpen, toggleAccordion }) => {
  return (
    <div className="border-b border-gray-200">
      <button 
        className="flex justify-between items-center w-full py-4 px-2 text-left font-semibold"
        onClick={toggleAccordion}
      >
        {title}
        <span>
          {isOpen ? <IoChevronUpOutline className="text-xl" /> : <IoChevronDownOutline className="text-xl" />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 px-2">
          {children}
        </div>
      )}
    </div>
  )
}

// Componente para mostrar la información nutricional
const NutritionalInfo = ({ info }) => {
  if (!info) return null;
  
  return (
    <div className="text-sm">
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="col-span-2 font-medium">Tamaño de la porción:</div>
        <div>{info.servingSize}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="col-span-2 font-medium">Porciones por envase:</div>
        <div>{info.servingsPerContainer}</div>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-2">
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 font-medium">Calorías:</div>
          <div>{info.calories}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 font-medium">Proteínas:</div>
          <div>{info.protein}g</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 font-medium">Grasas totales:</div>
          <div>{info.totalFat}g</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 font-medium">Carbohidratos totales:</div>
          <div>{info.totalCarbs}g</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 font-medium">Azúcares:</div>
          <div>{info.sugars}g</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 font-medium">Sodio:</div>
          <div>{info.sodium}mg</div>
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar los ingredientes
const IngredientsList = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;
  
  return (
    <ul className="list-disc pl-5 text-sm">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="mb-1">{ingredient}</li>
      ))}
    </ul>
  );
};

// Función para obtener productos relacionados de forma determinista
const getRelatedProducts = (currentProductId: number, count: number = 4) => {
  // Filtrar el producto actual
  const otherProducts = products.filter(p => p.id !== currentProductId);
  
  // Ordenar por ID para que sea determinista (mismo resultado en servidor y cliente)
  const sortedProducts = [...otherProducts].sort((a, b) => a.id - b.id);
  
  // Tomar los primeros 'count' elementos
  return sortedProducts.slice(0, count);
};

export default function ProductPage({ product }: { product: Product | null }) {
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  
  // Estado para reseñas y formulario
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Carlos M.',
      rating: 5,
      comment: 'Excelente producto, lo uso todos los días y me siento mejor.',
    },
    {
      id: 2,
      name: 'Ana P.',
      rating: 4,
      comment: 'Buena relación calidad-precio, lo recomiendo.',
    },
    {
      id: 3,
      name: 'Luis R.',
      rating: 5,
      comment: 'Llegó rápido y en buen estado, muy satisfecho con mi compra.',
    },
  ])
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  // Crear un array de imágenes a partir de la imagen principal y las adicionales
  const allImages = product?.images 
    ? [product.image, ...product.images] 
    : product?.image 
      ? [product.image] 
      : [];
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  if (!product) {
    return <Layout><p>Producto no encontrado</p></Layout>
  }
  
  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? '' : section);
  };

  const discounted = product.discount
    ? +(product.price * (1 - product.discount/100)).toFixed(2)
    : product.price

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.title,
      price: discounted,
      image: product.image,
      quantity: quantity,
      sku: `SKU-${product.id}`, // Añadimos un SKU para compatibilidad con VTEX
    });
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Función para manejar el swipe en dispositivos móviles
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    document.documentElement.style.setProperty('--touch-start-x', `${touchDown}px`);
  };
  
  const handleTouchMove = (e) => {
    if (!document.documentElement.style.getPropertyValue('--touch-start-x')) return;
    
    const touchDown = parseFloat(document.documentElement.style.getPropertyValue('--touch-start-x'));
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    
    // Si el swipe es significativo (más de 50px)
    if (diff > 50) {
      nextImage();
      document.documentElement.style.removeProperty('--touch-start-x');
    } else if (diff < -50) {
      prevImage();
      document.documentElement.style.removeProperty('--touch-start-x');
    }
  };
  
  const handleTouchEnd = () => {
    document.documentElement.style.removeProperty('--touch-start-x');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewName || !reviewComment) return
    const newReview = {
      id: Date.now(),
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    }
    setReviews([newReview, ...reviews])
    setReviewName('')
    setReviewRating(5)
    setReviewComment('')
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Columna izquierda - Imagen */}
          <div className="md:w-1/2">
            <div className="bg-[#f9f8f5] rounded-lg p-6 relative">
              {/* Vista de escritorio - Formato stack */}
              {!isMobile && (
                <div className="flex flex-col space-y-6">
                  {allImages.map((img, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-2">
                      <img 
                        src={img} 
                        alt={`${product.title} - Imagen ${index + 1}`} 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Vista móvil - Carrusel compacto */}
              {isMobile && (
                <>
                  {/* Carrusel de imágenes para móvil */}
                  <div 
                    className="relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img 
                      src={allImages[currentImageIndex]} 
                      alt={`${product.title} - Imagen ${currentImageIndex + 1}`} 
                      className="w-full h-[300px] object-contain" 
                    />
                    
                    {/* Botones de navegación (solo si hay más de una imagen) */}
                    {allImages.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#16a34a] hover:bg-green-700 text-white rounded-full p-1 -ml-1 focus:outline-none"
                          aria-label="Imagen anterior"
                        >
                          <IoChevronBack size={20} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#16a34a] hover:bg-green-700 text-white rounded-full p-1 -mr-1 focus:outline-none"
                          aria-label="Imagen siguiente"
                        >
                          <IoChevronForward size={20} />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Indicadores de posición para móviles */}
                  {allImages.length > 1 && (
                    <div className="flex justify-center mt-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2 h-2 mx-1 rounded-full ${
                            currentImageIndex === index ? 'bg-[#16a34a]' : 'bg-gray-300'
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Columna derecha - Información */}
          <div className="md:w-1/2">
            <div className={`${!isMobile ? 'sticky top-24 p-6' : ''}`}>
              <div className="mb-2">
                <h4 className="text-sm text-green-600 font-medium">{product.subtitle}</h4>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <RatingStars rating={product.rating} reviews={product.reviews} />
              
              {/* Descripción del producto */}
              <p className="text-gray-700 mt-4 mb-4">{product.description}</p>
              
              <div className="mt-4 mb-4">
                <span className="text-2xl font-bold text-black">
                  S/ {discounted.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="ml-3 text-gray-500 line-through">
                    S/ {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Características del producto */}
              <div className="mt-6 mb-6">
                <h3 className="font-semibold mb-3">Beneficios:</h3>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  {product.features.map((feat, i) => (
                    <li key={i} className="text-gray-700">{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Información adicional */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-[#e6f0eb] rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">🚚</span>
                  <span className="text-sm">Envío rápido<br />24-48 horas</span>
                </div>
                <div className="bg-[#e6f0eb] rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">🔒</span>
                  <span className="text-sm">Pago seguro<br />Múltiples métodos</span>
                </div>
                <div className="bg-[#e6f0eb] rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">✅</span>
                  <span className="text-sm">Garantía<br />30 días</span>
                </div>
              </div>

              {/* Selector de cantidad y botones */}
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-gray-300 rounded-md mr-4">
                  <button 
                    onClick={handleDecrement}
                    className="px-3 py-2 text-lg"
                  >
                    <IoMdRemove />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={handleIncrement}
                    className="px-3 py-2 text-lg"
                  >
                    <IoMdAdd />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="bg-[#16a34a] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md flex-grow flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span>Añadir al carrito</span>
                </button>
              </div>

              <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-md mb-4">
                Comprar ahora
              </button>

              <div className="mt-6 bg-[#e6f0eb] rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <h4 className="font-semibold mb-1">Pruébalo y, si no te gusta, ¡te devolvemos el dinero!</h4>
                  <p className="text-sm">Más del 98% de quienes probaron este producto quedaron muy satisfechos con el sabor y los resultados. ¡Recuérdalo por 30 días!</p>
                </div>
              </div>
              
              {/* Soporte de Pagos */}
              <div className="mt-6 bg-gray-100 rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-4">Soporte de Pagos</h4>
                <img
                  src="/Metodos-de-Pago-Mercado-Pago-1.avif"
                  alt="Métodos de pago"
                  className="mx-auto max-h-12 w-auto"
                />
              </div>

              {/* Acordeón con información adicional */}
              <div className="mt-8 border-t border-gray-200 pt-4">
                <AccordionItem 
                  title="Descripción" 
                  isOpen={activeAccordion === 'description'} 
                  toggleAccordion={() => toggleAccordion('description')}
                >
                  <p className="text-sm">{product.description}</p>
                </AccordionItem>
                
                <AccordionItem 
                  title="Información Nutricional" 
                  isOpen={activeAccordion === 'nutritional'} 
                  toggleAccordion={() => toggleAccordion('nutritional')}
                >
                  {product.nutritionalInfo ? (
                    <NutritionalInfo info={product.nutritionalInfo} />
                  ) : (
                    <p className="text-sm">Información nutricional no disponible para este producto.</p>
                  )}
                </AccordionItem>
                
                <AccordionItem 
                  title="Ingredientes" 
                  isOpen={activeAccordion === 'ingredients'} 
                  toggleAccordion={() => toggleAccordion('ingredients')}
                >
                  {product.ingredients ? (
                    <IngredientsList ingredients={product.ingredients} />
                  ) : (
                    <p className="text-sm">Lista de ingredientes no disponible para este producto.</p>
                  )}
                </AccordionItem>
                
                <AccordionItem 
                  title="Modo de uso recomendado" 
                  isOpen={activeAccordion === 'usage'} 
                  toggleAccordion={() => toggleAccordion('usage')}
                >
                  {product.usageInstructions ? (
                    <p className="text-sm">{product.usageInstructions}</p>
                  ) : (
                    <p className="text-sm">Instrucciones de uso no disponibles para este producto.</p>
                  )}
                </AccordionItem>
                
                <AccordionItem 
                  title="Información adicional" 
                  isOpen={activeAccordion === 'additional'} 
                  toggleAccordion={() => toggleAccordion('additional')}
                >
                  {product.additionalInfo ? (
                    <p className="text-sm">{product.additionalInfo}</p>
                  ) : (
                    <p className="text-sm">Información adicional no disponible para este producto.</p>
                  )}
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección verde divisoria */}
      <div className="w-full bg-green-600 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">¿Necesitas ayuda para elegir?</h3>
              <p className="mt-2">Nuestros especialistas están disponibles para asesorarte</p>
            </div>
            <div>
              <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-md">
                Contactar ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {getRelatedProducts(product?.id || 0).map(relatedProduct => (
            <Link 
              key={relatedProduct.id} 
              href={`/product/${relatedProduct.id}`} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-4 flex items-center justify-center" style={{ height: '200px' }}>
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.title} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              <div className="p-4 border-t">
                <p className="text-sm text-gray-500 mb-1">{relatedProduct.subtitle}</p>
                <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.title}</h3>
                <p className="text-green-600 font-bold text-lg">
                  S/ {relatedProduct.discount 
                    ? (relatedProduct.price * (1 - relatedProduct.discount / 100)).toFixed(2)
                    : relatedProduct.price.toFixed(2)
                  }
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reseñas de clientes */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Reseñas de clientes</h2>

        {/* Formulario para nueva reseña */}
        <form onSubmit={handleReviewSubmit} className="bg-gray-100 rounded-lg p-6 mb-10 space-y-4">
          <h3 className="text-xl font-semibold">Deja tu reseña</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-green-500 focus:border-green-500"
              required
            />
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-green-500 focus:border-green-500"
            >
              {[5,4,3,2,1].map(val => (
                <option key={val} value={val}>{val} estrellas</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Escribe tu comentario..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full h-28 resize-none focus:ring-green-500 focus:border-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Enviar reseña
          </button>
        </form>

        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-3">{review.name}</p>
                {/* Usamos RatingStars para mostrar la calificación */}
                <RatingStars rating={review.rating} reviews={0} />
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: products.map(p => ({ params: { id: p.id.toString() } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ product: Product | null }> = async ({ params }) => {
  const id = params?.id as string
  const product = products.find(p => p.id.toString() === id) || null
  return { props: { product } }
}
