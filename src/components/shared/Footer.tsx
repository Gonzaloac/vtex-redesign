import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-500 text-white">
      {/* Footer principal */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image src="/logo.svg" alt="Organa" width={150} height={52} className="white" />
            </Link>
            <div className="mt-4">
              <Link href="/libro-de-reclamaciones" className="flex flex-col items-center md:items-start">
                <div className="bg-white p-2 rounded-md mb-2">
                  <Image 
                    src="/libro-reclamaciones.png" 
                    alt="Libro de Reclamaciones" 
                    width={120} 
                    height={80} 
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">INFORMACIÓN</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link href="/nosotros" className="hover:underline">Nosotros</Link></li>
              <li><Link href="/tiendas" className="hover:underline">Nuestras tiendas</Link></li>
              <li><Link href="/contactanos" className="hover:underline">Contáctanos</Link></li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">AYUDA</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link href="/preguntas-frecuentes" className="hover:underline">Preguntas frecuentes</Link></li>
              <li><Link href="/promociones" className="hover:underline">Promociones y campañas</Link></li>
              <li><Link href="/privacidad" className="hover:underline">Políticas de privacidad</Link></li>
              <li><Link href="/despacho" className="hover:underline">Políticas de despacho</Link></li>
              <li><Link href="/terminos" className="hover:underline">Términos y condiciones</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">CONTACTO</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <Link href="https://instagram.com" className="hover:text-green-200">
                <Instagram size={20} />
              </Link>
              <Link href="https://facebook.com" className="hover:text-green-200">
                <Facebook size={20} />
              </Link>
            </div>
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} />
                <span>+51 932 217196</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} />
                <span>contacto@organa.com.pe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior de copyright */}
      <div className="bg-green-600 py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p> Organa {new Date().getFullYear()} | Todos los derechos reservados</p>
          <p className="mt-2 md:mt-0">Desarrollado por Harborl</p>
        </div>
      </div>
    </footer>
  )
}