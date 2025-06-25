// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// /src/components/nav/MegaMenuCuidadoPersonal.tsx  (submenu columnas)
// -----------------------------------------------------------------------------
export default function MegaMenuCuidadoPersonal() {
    const columns = [
      {
        title: 'Aceites Esenciales',
        items: ['Aromaterapia', 'Aceites Puros', 'Aceites Comestibles', 'Aceites Tópicos', 'Otros', 'Ver todo'],
      },
      {
        title: 'Cuidado Facial y Corporal',
        items: ['Cremas Faciales', 'Cremas Corporales', 'Protección Solar', 'Otros', 'Ver todo'],
      },
      {
        title: 'Aseo Personal',
        items: ['Pastas Dentales', 'Jabones', 'Desodorantes', 'Cuidado Femenino', 'Otros', 'Ver todo'],
      },
      {
        title: 'Cuidado del Cabello',
        items: ['Shampoo', 'Acondicionador', 'Tintes Naturales', 'Tratamientos Capilares', 'Ver todo'],
      },
      {
        title: 'Hogar',
        items: ['Difusores', 'Lámparas De Sal', 'Termos De Cuarzo', 'Vasos Aromáticos', 'Inciensos', 'Masajeadores', 'Ver todo'],
      },
    ]
  
    return (
      <div className="py-8 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {columns.map(col => (
            <div key={col.title} className="space-y-2">
              <p className="font-bold text-gray-900 uppercase text-[13px] mb-1">{col.title}</p>
              <ul className="space-y-1">
                {col.items.map(item => (
                  item !== 'Ver todo' ? (
                    <li key={item}>
                      <a href="#" className="hover:text-green-600 block">{item}</a>
                    </li>
                  ) : null
                ))}
                <li className="pt-1">
                  <a href="#" className="text-green-700 font-semibold">Ver todo</a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
