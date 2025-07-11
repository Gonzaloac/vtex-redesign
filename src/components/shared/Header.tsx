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
  ChevronRight,
  User,
  Menu,
  Search,
  X,
  Heart,
  Home,
  Pill,
  Dumbbell,
  Store,
  Snowflake,
  ShowerHead,
  Tag
} from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
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
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<string[]>([])

  // Cerrar resultados de búsqueda al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
      
      // Close mobile menu when clicking outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && mobileOpen) {
        setMobileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileOpen])
  
  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileOpen(false)
    }
    
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

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
      <div style={{ backgroundColor: '#1ab25a' }} className="text-white text-center py-2">
        <p className="text-[16px] font-medium">Delivery a todo el Perú</p>
      </div>

      {/* Mobile Header: Hamburguesa, Logo, Acciones */}
      <div className="md:hidden bg-white flex flex-col shadow-sm">
        {/* Primera fila: Menú, Logo, Acciones */}
        <div className="flex items-center justify-between px-4 py-3">
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
            <button aria-label="Mi cuenta">
              <User size={20} />
            </button>
            <Link href="/wishlist" aria-label="Mi lista de deseos">
              <Heart size={20} className="text-gray-700 hover:text-red-500 transition-colors" />
            </Link>
            <CartButton mobile iconSize={20} />
          </div>
        </div>
        
        {/* Segunda fila: Barra de búsqueda siempre visible */}
        <div className="bg-white px-4 py-2 border-t border-gray-100">
          <div className="relative">
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
                className="border border-green-600 rounded-l-md px-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-green-600 flex-grow"
                onFocus={() => q.trim().length >= 2 && setShowResults(true)}
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 rounded-r-md text-[14px] flex items-center justify-center"
              >
                <Search size={18} />
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
      </div>

      {/* Mobile Nav Drawer - Ocupa toda la altura */}
      {mobileOpen && (
        <div 
          ref={mobileMenuRef} 
          className="md:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 flex flex-col"
        >
          {/* Cabecera del menú con botón de cierre */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Organa" width={120} height={42} />
            </div>
            <button 
              onClick={() => setMobileOpen(false)} 
              className="text-gray-700 p-2"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Contenido del menú con scroll */}
          <div className="flex-grow overflow-y-auto py-2">
            <ul className="flex flex-col">
              {/* Inicio */}
              <li className="border-b border-gray-100">
                <Link 
                  href="/" 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Home size={20} className="text-green-600" />
                    <span>Inicio</span>
                  </div>
                </Link>
              </li>
              
              {/* Vitaminas */}
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => {
                    if (expandedMobileMenus.includes('Vitaminas')) {
                      setExpandedMobileMenus(expandedMobileMenus.filter(item => item !== 'Vitaminas'))
                    } else {
                      setExpandedMobileMenus([...expandedMobileMenus, 'Vitaminas'])
                    }
                  }} 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                >
                  <div className="flex items-center gap-3">
                    <Pill size={20} className="text-green-600" />
                    <span>Vitaminas</span>
                  </div>
                  {expandedMobileMenus.includes('Vitaminas') ? 
                    <ChevronDown size={18} className="text-gray-400" /> : 
                    <ChevronRight size={18} className="text-gray-400" />
                  }
                </button>
                {expandedMobileMenus.includes('Vitaminas') && (
                  <div className="bg-gray-50 py-2 px-4">
                    <ul className="space-y-4">
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Vitaminas</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/vitaminas/vitamina-b" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Vitamina B</Link></li>
                          <li><Link href="/categorias/vitaminas/vitamina-c" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Vitamina C</Link></li>
                          <li><Link href="/categorias/vitaminas/vitamina-d" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Vitamina D</Link></li>
                          <li><Link href="/categorias/vitaminas/multivitaminas" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Multivitaminas</Link></li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Bienestar</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/vitaminas/omegas" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Omegas</Link></li>
                          <li><Link href="/categorias/vitaminas/antioxidantes" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Antioxidantes</Link></li>
                          <li><Link href="/categorias/vitaminas/antiestres-sueno" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Antiestrés y Sueño</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/categorias/vitaminas" className="text-green-700 font-semibold text-[14px]" onClick={() => setMobileOpen(false)}>Ver todo</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              
              {/* Suplementos */}
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => {
                    if (expandedMobileMenus.includes('Suplementos')) {
                      setExpandedMobileMenus(expandedMobileMenus.filter(item => item !== 'Suplementos'))
                    } else {
                      setExpandedMobileMenus([...expandedMobileMenus, 'Suplementos'])
                    }
                  }} 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                >
                  <div className="flex items-center gap-3">
                    <Dumbbell size={20} className="text-green-600" />
                    <span>Suplementos</span>
                  </div>
                  {expandedMobileMenus.includes('Suplementos') ? 
                    <ChevronDown size={18} className="text-gray-400" /> : 
                    <ChevronRight size={18} className="text-gray-400" />
                  }
                </button>
                {expandedMobileMenus.includes('Suplementos') && (
                  <div className="bg-gray-50 py-2 px-4">
                    <ul className="space-y-4">
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Proteínas</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/suplementos/proteina-whey" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Proteína Whey</Link></li>
                          <li><Link href="/categorias/suplementos/proteina-vegana" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Proteína Vegana</Link></li>
                          <li><Link href="/categorias/suplementos/proteina-isolada" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Proteína Isolada</Link></li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Rendimiento</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/suplementos/pre-entreno" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Pre-entreno</Link></li>
                          <li><Link href="/categorias/suplementos/creatina" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Creatina</Link></li>
                          <li><Link href="/categorias/suplementos/bcaa" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>BCAA</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/categorias/suplementos" className="text-green-700 font-semibold text-[14px]" onClick={() => setMobileOpen(false)}>Ver todo</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              
              {/* Abarrotes */}
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => {
                    if (expandedMobileMenus.includes('Abarrotes')) {
                      setExpandedMobileMenus(expandedMobileMenus.filter(item => item !== 'Abarrotes'))
                    } else {
                      setExpandedMobileMenus([...expandedMobileMenus, 'Abarrotes'])
                    }
                  }} 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                >
                  <div className="flex items-center gap-3">
                    <Store size={20} className="text-green-600" />
                    <span>Abarrotes</span>
                  </div>
                  {expandedMobileMenus.includes('Abarrotes') ? 
                    <ChevronDown size={18} className="text-gray-400" /> : 
                    <ChevronRight size={18} className="text-gray-400" />
                  }
                </button>
                {expandedMobileMenus.includes('Abarrotes') && (
                  <div className="bg-gray-50 py-2 px-4">
                    <ul className="space-y-4">
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Cereales</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/abarrotes/avena" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Avena</Link></li>
                          <li><Link href="/categorias/abarrotes/granola" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Granola</Link></li>
                          <li><Link href="/categorias/abarrotes/quinua" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Quinua</Link></li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Snacks</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/abarrotes/frutos-secos" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Frutos Secos</Link></li>
                          <li><Link href="/categorias/abarrotes/barras" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Barras</Link></li>
                          <li><Link href="/categorias/abarrotes/chips" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Chips</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/categorias/abarrotes" className="text-green-700 font-semibold text-[14px]" onClick={() => setMobileOpen(false)}>Ver todo</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              
              {/* Refrigerados y congelados */}
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => {
                    if (expandedMobileMenus.includes('Refrigerados y congelados')) {
                      setExpandedMobileMenus(expandedMobileMenus.filter(item => item !== 'Refrigerados y congelados'))
                    } else {
                      setExpandedMobileMenus([...expandedMobileMenus, 'Refrigerados y congelados'])
                    }
                  }} 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                >
                  <div className="flex items-center gap-3">
                    <Snowflake size={20} className="text-green-600" />
                    <span>Refrigerados y congelados</span>
                  </div>
                  {expandedMobileMenus.includes('Refrigerados y congelados') ? 
                    <ChevronDown size={18} className="text-gray-400" /> : 
                    <ChevronRight size={18} className="text-gray-400" />
                  }
                </button>
                {expandedMobileMenus.includes('Refrigerados y congelados') && (
                  <div className="bg-gray-50 py-2 px-4">
                    <ul className="space-y-4">
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Refrigerados</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/refrigerados/leches-vegetales" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Leches Vegetales</Link></li>
                          <li><Link href="/categorias/refrigerados/yogures" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Yogures</Link></li>
                          <li><Link href="/categorias/refrigerados/quesos" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Quesos</Link></li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Congelados</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/congelados/frutas" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Frutas</Link></li>
                          <li><Link href="/categorias/congelados/verduras" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Verduras</Link></li>
                          <li><Link href="/categorias/congelados/proteinas" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Proteínas</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/categorias/refrigerados-congelados" className="text-green-700 font-semibold text-[14px]" onClick={() => setMobileOpen(false)}>Ver todo</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              
              {/* Cuidado Personal */}
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => {
                    if (expandedMobileMenus.includes('Cuidado Personal')) {
                      setExpandedMobileMenus(expandedMobileMenus.filter(item => item !== 'Cuidado Personal'))
                    } else {
                      setExpandedMobileMenus([...expandedMobileMenus, 'Cuidado Personal'])
                    }
                  }} 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                >
                  <div className="flex items-center gap-3">
                    <ShowerHead size={20} className="text-green-600" />
                    <span>Cuidado Personal</span>
                  </div>
                  {expandedMobileMenus.includes('Cuidado Personal') ? 
                    <ChevronDown size={18} className="text-gray-400" /> : 
                    <ChevronRight size={18} className="text-gray-400" />
                  }
                </button>
                {expandedMobileMenus.includes('Cuidado Personal') && (
                  <div className="bg-gray-50 py-2 px-4">
                    <ul className="space-y-4">
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Cuidado Facial</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/cuidado-personal/limpiadores" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Limpiadores</Link></li>
                          <li><Link href="/categorias/cuidado-personal/cremas" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Cremas</Link></li>
                          <li><Link href="/categorias/cuidado-personal/mascarillas" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Mascarillas</Link></li>
                        </ul>
                      </li>
                      <li>
                        <p className="font-bold text-gray-900 text-[14px] mb-1">Cuidado Corporal</p>
                        <ul className="space-y-2 pl-3">
                          <li><Link href="/categorias/cuidado-personal/jabones" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Jabones</Link></li>
                          <li><Link href="/categorias/cuidado-personal/lociones" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Lociones</Link></li>
                          <li><Link href="/categorias/cuidado-personal/desodorantes" className="text-gray-700 hover:text-green-600 text-[14px]" onClick={() => setMobileOpen(false)}>Desodorantes</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/categorias/cuidado-personal" className="text-green-700 font-semibold text-[14px]" onClick={() => setMobileOpen(false)}>Ver todo</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              
              {/* Promociones */}
              <li>
                <Link 
                  href="/promociones" 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Tag size={20} className="text-green-600" />
                    <span className="text-green-600 font-medium">Promociones</span>
                  </div>
                </Link>
              </li>
              
              {/* Mi Lista de Deseos */}
              <li>
                <Link 
                  href="/wishlist" 
                  className="flex items-center justify-between p-4 text-gray-800 hover:text-green-600 active:bg-gray-50 text-[16px]"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-red-500" />
                    <span>Mi Lista de Deseos</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Footer del menú */}
          <div className="p-4 border-t border-gray-100">
            <Link 
              href="/mi-cuenta" 
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              <User size={20} className="text-gray-700" />
              <span className="font-medium">Mi Cuenta</span>
            </Link>
            
            {/* Enlaces de contacto y tiendas (Mobile) */}
            <div className="mt-4 flex flex-col gap-2">
              <Link 
                href="/contacto" 
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                <span className="font-medium">CONTÁCTANOS</span>
              </Link>
              <Link 
                href="/tiendas" 
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                <span className="font-medium">NUESTRAS TIENDAS</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header: Logo, Buscador, Acciones */}
      <div className="hidden md:flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        {/* Logo a la izquierda */}
        <div className="flex items-center w-1/4">
          <Link href="/" className="flex">
            <Image src="/logo.svg" alt="Organa" width={170} height={60} priority />
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
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 rounded-r-md text-[14px] flex items-center justify-center"
              >
                <Search size={18} />
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
        <div className="flex items-center gap-3 lg:gap-5 justify-end w-1/4">
          <div className="flex items-center gap-1 lg:gap-2">
            <Headphones size={18} className="text-green-600 hidden sm:block" />
            <div className="text-[13px] lg:text-[15px]">
              <p className="font-semibold whitespace-nowrap">+51 932 321 295</p>
              <p className="text-gray-500 text-[11px] lg:text-[13px] whitespace-nowrap">Atención 9 AM–6 PM</p>
            </div>
          </div>
          <span className="w-px h-6 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-1 lg:gap-2">
            <Truck size={18} className="text-green-600 hidden sm:block" />
            <div className="text-[13px] lg:text-[15px]">
              <p className="font-semibold whitespace-nowrap">Envíos</p>
              <p className="text-gray-500 text-[11px] lg:text-[13px] whitespace-nowrap">Delivery a todo el Perú</p>
            </div>
          </div>
          <span className="w-px h-6 bg-gray-300" />
          <button aria-label="Mi cuenta" className="hover:text-green-600 transition-colors">
            <User size={24} strokeWidth={1.75} />
          </button>
          <Link href="/wishlist" aria-label="Mi lista de deseos" className="hover:text-red-500 transition-colors">
            <Heart size={24} strokeWidth={1.75} />
          </Link>
          <CartButton iconSize={24} />
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="relative">
        <nav className="hidden md:block bg-[#fafafa] border-t border-gray-100 text-[14px] font-semibold">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
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
                  <Link href="/promociones" style={{ backgroundColor: '#1ab25a' }} className="hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition-colors flex items-center gap-1">
                    <span>Promociones</span>
                  </Link>
                </li>
              </ul>
              
              {/* Enlaces de contacto y tiendas */}
              <div className="flex items-center gap-8">
                <Link href="/contacto" className="text-[14px] hover:text-green-600 transition-colors">
                  <span>CONTÁCTANOS</span>
                </Link>
                <Link href="/tiendas" className="text-[14px] hover:text-green-600 transition-colors">
                  <span>NUESTRAS TIENDAS</span>
                </Link>
              </div>
            </div>
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