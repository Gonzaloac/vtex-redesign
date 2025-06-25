// -----------------------------------------------------------------------------
// 8. components/blocks/InfoBar.tsx
// -----------------------------------------------------------------------------
import React from 'react'
import { Truck, Headphones, CreditCard, Package } from 'lucide-react'

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

export default function InfoBar() {
  return (
    <section className="bg-green-600 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
        {infoItems.map(item => (
          <div key={item.id} className="flex flex-col items-center gap-3">
            {item.icon}
            <h4 className="font-semibold text-[18px] leading-snug">{item.title}</h4>
            <p className="text-[18px] leading-snug font-light">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}