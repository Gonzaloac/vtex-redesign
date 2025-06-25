// 4. components/shared/Header.tsx  – VERSIÓN RESPONSIVE CON HAMBURGUESA
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Headphones,
  Truck,
  ShoppingCart,
  ChevronDown,
  User,
  Menu,
  Search,
  X,
} from 'lucide-react'
import CartButton from '@/components/cart/CartButton'
import CartSidebar from '@/components/cart/CartSidebar'
import MegaMenuVitaminas from '@/components/nav/MegaMenuVitaminas'
import MegaMenuSuplementos from '@/components/nav/MegaMenuSuplementos'
import MegaMenuAbarrotes from '@/components/nav/MegaMenuAbarrotes'
import MegaMenuFrescos from '@/components/nav/MegaMenuFrescos'
import MegaMenuCongelados from '@/components/nav/MegaMenuCongelados'
import MegaMenuCuidadoPersonal from '@/components/nav/MegaMenuCuidadoPersonal'
import { products } from '@/data/products'

const NAV = [
  'Inicio',
  'Vitaminas',
  'Suplementos',
  'Abarrotes',
  'Refrigerados y congelados',
  'Cuidado Personal',
]

// Elemento especial para promociones que se mostrará con estilo destacado
const PROMO_NAV = 'Promociones'

// Utilidad para crear slugs consistentes (ej. "Refrigerados y congelados" -> "refrigerados-congelados")
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/ y /g, ' ')
    .trim()
    .replace(/\s+/g, '-')

export default function Header() {
  const [q, setQ] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Cerrar resultados de búsqueda al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Buscar productos mientras el usuario escribe
  useEffect(() => {
    if (q.trim().length >= 2) {
      const query = q.toLowerCase().trim()
      const results = products
        .filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.subtitle.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
        .slice(0, 5) // Limitar a 5 resultados para no sobrecargar la UI
      
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [q])

  // Agrupar resultados por categoría
  const groupedResults = searchResults.reduce((acc, product) => {
    const category = product.category || 'Otros'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {} as Record<string, typeof products>)

  return (
    <header className="w-full">
      {/* Barra superior */}
      <div className="bg-green-600 text-white text-center py-2">
        <p className="text-[16px] font-medium">Delivery a todo el Perú</p>
      </div>

      {/* Mobile Header: Hamburguesa, Logo, Acciones */}
      <div className="md:hidden bg-white flex items-center justify-between px-4 py-3 shadow-sm">
        <div className="w-10">
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menú">
            <Menu size={24} />
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="flex justify-center">
            <Image src="/logo.svg" alt="Organa" width={120} height={42} />
          </Link>
        </div>
        <div className="w-10 flex items-center gap-4 justify-end">
          <button aria-label="Buscar" onClick={() => setMobileSearchOpen(true)}>
            <Search size={20} />
          </button>
          <button aria-label="Mi cuenta">
            <User size={20} />
          </button>
          <CartButton mobile iconSize={20} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <div className="relative">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (q.trim()) {
                  router.push(`/search?q=${encodeURIComponent(q.trim())}`)
                  setMobileSearchOpen(false)
                  setShowResults(false)
                }
              }}
              className="flex w-full"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="¿Qué estás buscando hoy?"
                className="border border-green-600 rounded-l-md px-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-green-600 flex-grow"
                autoFocus
                onFocus={() => q.trim().length >= 2 && setShowResults(true)}
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 rounded-r-md text-[14px]"
              >
                Buscar
              </button>
            </form>

            {/* Resultados de búsqueda tipo AJAX en móvil */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 max-h-[60vh] overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-[15px]">Buscar por "{q}"</h3>
                    <button 
                      onClick={() => setShowResults(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {Object.entries(groupedResults).map(([category, products]) => (
                    <div key={category} className="mb-4">
                      <h4 className="text-[14px] text-green-600 font-semibold mb-2">{category}</h4>
                      <ul>
                        {products.map(product => (
                          <li key={product.id} className="mb-2">
                            <Link 
                              href={`/product/${product.id}`}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowResults(false);
                                setMobileSearchOpen(false);
                                setTimeout(() => {
                                  router.push(`/product/${product.id}`);
                                }, 10);
                                e.preventDefault();
                              }}
                            >
                              <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium line-clamp-1 text-[14px]">{product.title}</p>
                                <p className="text-[13px] text-gray-500 line-clamp-1">{product.subtitle}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Link 
                      href={`/search?q=${encodeURIComponent(q.trim())}`}
                      className="text-green-600 hover:text-green-700 text-[14px] font-medium flex items-center justify-center w-full"
                      onClick={() => {
                        setShowResults(false)
                        setMobileSearchOpen(false)
                      }}
                    >
                      Ver todos los resultados
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-4 p-4">
            {NAV.map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-800 hover:text-green-600 text-[14px]">
                <Link href={item === 'Inicio' ? '/' : `/categorias/${slugify(item)}`} className="flex items-center gap-2">
                  {item}
                  {(item === 'Vitaminas' || item === 'Suplementos' || item === 'Abarrotes' || item === 'Refrigerados y congelados' || item === 'Cuidado Personal') && (
                    <ChevronDown size={14} />
                  )}
                </Link>
              </li>
            ))}
            
            {/* Elemento Promociones destacado en móvil al final */}
            <li className="flex items-center mt-2">
              <Link href="/promociones" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition-colors flex items-center gap-1 w-full text-center justify-center text-[14px]">
                <span>Promociones</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Header: Logo, Buscador, Acciones */}
      <div className="hidden md:flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        {/* Logo a la izquierda */}
        <div className="flex items-center w-1/4">
          <Link href="/" className="flex">
            <Image src="/logo.svg" alt="Organa" width={150} height={52} priority />
          </Link>
        </div>

        {/* Buscador central con mayor tamaño */}
        <div className="flex-grow flex justify-center w-2/4" ref={searchRef}>
          <div className="w-full max-w-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (q.trim()) {
                  router.push(`/search?q=${encodeURIComponent(q.trim())}`)
                  setShowResults(false)
                }
              }}
              className="flex w-full"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="¿Qué estás buscando hoy?"
                className="border border-green-600 rounded-l-md px-4 py-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-green-600 w-full"
                onFocus={() => q.trim().length >= 2 && setShowResults(true)}
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 rounded-r-md text-[14px]"
              >
                Buscar
              </button>
            </form>

            {/* Resultados de búsqueda tipo AJAX */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute mt-1 w-[400px] bg-white shadow-lg rounded-md z-50 max-h-[80vh] overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-[15px]">Buscar por "{q}"</h3>
                    <button 
                      onClick={() => setShowResults(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {Object.entries(groupedResults).map(([category, products]) => (
                    <div key={category} className="mb-4">
                      <h4 className="text-[14px] text-green-600 font-semibold mb-2">{category}</h4>
                      <ul>
                        {products.map(product => (
                          <li key={product.id} className="mb-2">
                            <Link 
                              href={`/product/${product.id}`}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowResults(false);
                                setTimeout(() => {
                                  router.push(`/product/${product.id}`);
                                }, 10);
                                e.preventDefault();
                              }}
                            >
                              <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium line-clamp-1 text-[14px]">{product.title}</p>
                                <p className="text-[13px] text-gray-500 line-clamp-1">{product.subtitle}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Link 
                      href={`/search?q=${encodeURIComponent(q.trim())}`}
                      className="text-green-600 hover:text-green-700 text-[14px] font-medium flex items-center justify-center w-full"
                      onClick={() => setShowResults(false)}
                    >
                      Ver todos los resultados
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones a la derecha */}
        <div className="flex items-center gap-5 justify-end w-1/4">
          <div className="flex items-center gap-2">
            <Headphones size={18} className="text-green-600" />
            <div className="text-[15px]">
              <p className="font-semibold">+51 932 321 295</p>
              <p className="text-gray-500 text-[13px]">Atención 9 AM–6 PM</p>
            </div>
          </div>
          <span className="w-px h-6 bg-gray-300" />
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-green-600" />
            <div className="text-[15px]">
              <p className="font-semibold">Envíos</p>
              <p className="text-gray-500 text-[13px]">Delivery a todo el Perú</p>
            </div>
          </div>
          <span className="w-px h-6 bg-gray-300" />
          <button aria-label="Mi cuenta">
            <User size={20} />
          </button>
          <CartButton iconSize={20} />
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="relative">
        <nav className="hidden md:block bg-[#fafafa] border-t border-gray-100 text-[14px] font-semibold">
          <div className="container mx-auto px-6 py-3">
            <ul className="flex flex-wrap items-center gap-8">
              {/* Resto del menú */}
              {NAV.map((item) =>
                item === 'Vitaminas' || item === 'Suplementos' || item === 'Abarrotes' || item === 'Refrigerados y congelados' || item === 'Cuidado Personal' ? (
                  <li
                    key={item}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item)}
                  >
                    <Link href={`/categorias/${slugify(item)}`} className="flex items-center gap-1 cursor-pointer hover:text-green-600 text-[14px]">
                      <span>{item}</span>
                      <ChevronDown size={14} className="mt-[2px]" />
                    </Link>
                  </li>
                ) : (
                  <li
                    key={item}
                    className="flex items-center gap-1 cursor-pointer hover:text-green-600 text-[14px]"
                  >
                    <Link href={item === 'Inicio' ? '/' : `/categorias/${slugify(item)}`}>
                      {item}
                      {item !== 'Inicio' && (
                        <ChevronDown size={14} className="mt-[2px]" />
                      )}
                    </Link>
                  </li>
                )
              )}
              
              {/* Elemento Promociones destacado al final */}
              <li>
                <Link href="/promociones" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition-colors flex items-center gap-1">
                  <span>Promociones</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mega Menu que aparece fuera del flujo normal */}
        {activeMenu === 'Vitaminas' && (
          <div 
            className="absolute left-0 w-full bg-white shadow-xl z-50"
            onMouseEnter={() => setActiveMenu('Vitaminas')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-6">
              <MegaMenuVitaminas />
            </div>
          </div>
        )}
        
        {activeMenu === 'Suplementos' && (
          <div 
            className="absolute left-0 w-full bg-white shadow-xl z-50"
            onMouseEnter={() => setActiveMenu('Suplementos')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-6">
              <MegaMenuSuplementos />
            </div>
          </div>
        )}
        
        {activeMenu === 'Abarrotes' && (
          <div 
            className="absolute left-0 w-full bg-white shadow-xl z-50"
            onMouseEnter={() => setActiveMenu('Abarrotes')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-6">
              <MegaMenuAbarrotes />
            </div>
          </div>
        )}
        
        {activeMenu === 'Refrigerados y congelados' && (
          <div 
            className="absolute left-0 w-full bg-white shadow-xl z-50"
            onMouseEnter={() => setActiveMenu('Refrigerados y congelados')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-6">
              <div className="py-6 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Refrigerados</h3>
                  <MegaMenuFrescos />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Congelados</h3>
                  <MegaMenuCongelados />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeMenu === 'Cuidado Personal' && (
          <div 
            className="absolute left-0 w-full bg-white shadow-xl z-50"
            onMouseEnter={() => setActiveMenu('Cuidado Personal')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-6">
              <MegaMenuCuidadoPersonal />
            </div>
          </div>
        )}
      </div>
      {/* Carrito lateral */}
      <CartSidebar />
    </header>
  )
}

// ============================ END =========================================