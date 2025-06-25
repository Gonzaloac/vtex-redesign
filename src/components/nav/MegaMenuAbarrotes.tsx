// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// /src/components/nav/MegaMenuAbarrotes.tsx  (submenu columnas)
// -----------------------------------------------------------------------------
export default function MegaMenuAbarrotes() {
    const columns = [
      {
        title: 'Aceites y Vinagres',
        items: ['Aceite De Coco', 'Aceite De Olivo', 'Aceites Especiales', 'Vinagres', 'Otros'],
      },
      {
        title: 'Arroz y Pastas',
        items: ['Arroz', 'Pastas', 'Ver todo'],
      },
      {
        title: 'Avenas',
        items: ['Avenas Orgánicas', 'Avenas Sin Gluten', 'Avenas Funcionales', 'Ver todo'],
      },
      {
        title: 'Café y Cacao',
        items: ['Café', 'Cacao', 'Chocolates', 'Chocolates De Taza', 'Ver todo'],
      },
      {
        title: 'Cereales y Granolas',
        items: ['Cereales', 'Granolas', 'Ver todo'],
      },
      {
        title: 'Endulzantes',
        items: ['Stevia', 'Panela', 'Fruto Del Monje', 'Otros', 'Ver todo'],
      },
      {
        title: 'Salsas y Condimentos',
        items: ['Salsas', 'Condimentos', 'Salsas Y Aderezos', 'Otros', 'Ver todo'],
      },
      {
        title: 'Frutos Secos',
        items: ['Frutos Secos', 'Frutos Deshidratados', 'Ver todo'],
      },
    ]
  
    return (
      <div className="py-8 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
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
