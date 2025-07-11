import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';

// Definición de la interfaz para los datos de la tienda
interface Store {
  id: string;
  name: string;
  image: string;
  address: string;
  phone: string;
  schedule: string;
  mapUrl: string;
  wazeUrl: string;
  type: 'conventional' | 'vitaminas'; // Nuevo campo para el tipo de tienda
}

const stores: Store[] = [
  {
    id: 'sanmiguel',
    name: 'ORGANA SAN MIGUEL',
    image: '/sanmiguel.webp',
    address: 'Avenida la Marina 2095, San Miguel',
    phone: '(+51)986 434 162',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+San+Miguel+Av+La+Marina+2355',
    wazeUrl: 'https://waze.com/ul?q=Av+La+Marina+2355+San+Miguel&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'sanisidro',
    name: 'ORGANA SAN ISIDRO',
    image: '/sanisidro.webp',
    address: 'Av. Gral. Salaverry 2407, San Isidro',
    phone: '(+51) 944 209 570',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+San+Isidro+Av+Conquistadores+605',
    wazeUrl: 'https://waze.com/ul?q=Av+Conquistadores+605+San+Isidro&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'magdalena',
    name: 'ORGANA MAGDALENA',
    image: '/magdalena.webp',
    address: 'Jr. Bolognesi 395, Magdalena del Mar',
    phone: '(+51)989 960 536',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Magdalena+Av+Javier+Prado+Oeste+1650',
    wazeUrl: 'https://waze.com/ul?q=Av+Javier+Prado+Oeste+1650+Magdalena&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'vitaminasmagdalena',
    name: 'VITAMINAS MAGDALENA',
    image: '/vitaminasmagdalena.webp',
    address: 'Av. Javier Prado Oeste 1458, Magdalena',
    phone: '(01) 500-2058',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Vitaminas+Magdalena+Av+Javier+Prado+Oeste+1458',
    wazeUrl: 'https://waze.com/ul?q=Av+Javier+Prado+Oeste+1458+Magdalena&navigate=yes',
    type: 'vitaminas'
  },
  {
    id: 'lamolina',
    name: 'ORGANA LA MOLINA',
    image: '/lamolina.webp',
    address: 'Av. La Molina 1167, La Molina',
    phone: '(01) 500-2059',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+La+Molina+Av+La+Molina+1167',
    wazeUrl: 'https://waze.com/ul?q=Av+La+Molina+1167+La+Molina&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'lamolina2',
    name: 'ORGANA LA MOLINA 2',
    image: '/lamolina2.webp',
    address: 'Av. La Fontana 790, La Molina',
    phone: '(01) 500-2060',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+La+Molina+2+Av+La+Fontana+790',
    wazeUrl: 'https://waze.com/ul?q=Av+La+Fontana+790+La+Molina&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'losolivos',
    name: 'ORGANA LOS OLIVOS',
    image: '/losolivos.webp',
    address: 'Av. Antunez de Mayolo 830',
    phone: '(+51)963 732 504',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Los+Olivos+Av+Carlos+Izaguirre+880',
    wazeUrl: 'https://waze.com/ul?q=Av+Carlos+Izaguirre+880+Los+Olivos&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'losolivos2',
    name: 'ORGANA LOS OLIVOS 2',
    image: '/losolivos.webp',
    address: 'Av. Alfredo Mendiola 3583, Los Olivos',
    phone: '(+51)988 546 764',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Los+Olivos+Av+Carlos+Izaguirre+880',
    wazeUrl: 'https://waze.com/ul?q=Av+Carlos+Izaguirre+880+Los+Olivos&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'vitaminaslosolivos',
    name: 'VITAMINAS LOS OLIVOS',
    image: '/vitaminaslosolivos.webp',
    address: 'Av. Antúnez de Mayolo 1250, Los Olivos',
    phone: '(01) 500-2062',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Vitaminas+Los+Olivos+Av+Antunez+de+Mayolo+1250',
    wazeUrl: 'https://waze.com/ul?q=Av+Antunez+de+Mayolo+1250+Los+Olivos&navigate=yes',
    type: 'vitaminas'
  },
  {
    id: 'pueblolibre',
    name: 'ORGANA PUEBLO LIBRE',
    image: '/pueblolibre.webp',
    address: 'Av. Leguía y Melendez 922, Pueblo Libre',
    phone: '(+51)948 358 794',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Pueblo+Libre+Av+Sucre+585',
    wazeUrl: 'https://waze.com/ul?q=Av+Sucre+585+Pueblo+Libre&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'surco',
    name: 'ORGANA SURCO',
    image: '/surco.webp',
    address: 'Av. Caminos del Inca 1803, Santiago de Surco',
    phone: '(+51) 920 517 582',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Surco+Av+El+Polo+670',
    wazeUrl: 'https://waze.com/ul?q=Av+El+Polo+670+Santiago+de+Surco&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'sanborja',
    name: 'ORGANA SAN BORJA',
    image: '/sanborja.webp',
    address: 'Av. Aviación 2449, San Borja',
    phone: '(+51) 944 596 281',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+San+Borja+Av+San+Luis+2195',
    wazeUrl: 'https://waze.com/ul?q=Av+San+Luis+2195+San+Borja&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'surquillo',
    name: 'ORGANA SURQUILLO',
    image: '/surquillo.webp',
    address: 'Av. Angamos Este 1099',
    phone: '(+51)997 830 093',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Surquillo+Av+Republica+de+Panama+4295',
    wazeUrl: 'https://waze.com/ul?q=Av+Republica+de+Panama+4295+Surquillo&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'miraflores',
    name: 'ORGANA MIRAFLORES',
    image: '/miraflores.webp',
    address: 'Av Benavides 455, Miraflores',
    phone: '(+51)943 541 768',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Miraflores+Av+Larco+345',
    wazeUrl: 'https://waze.com/ul?q=Av+Larco+345+Miraflores&navigate=yes',
    type: 'conventional'
  },
  {
    id: 'vitaminasjesus',
    name: 'ORGANA VITAMINAS JESUS MARIA',
    image: '/vitaminasjesus.webp',
    address: 'Av. República Dominicana 254, Jesús María',
    phone: '(+51) 986 021 000',
    schedule: 'Lunes a Sábado 9:00 am a 9:00 pm Domingo 9 am a 6 pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Vitaminas+Jesus+Maria+Av+Republica+Dominicana+254',
    wazeUrl: 'https://waze.com/ul?q=Av+Republica+Dominicana+254+Jesus+Maria&navigate=yes',
    type: 'vitaminas'
  },
  {
    id: 'vitaminassjl',
    name: 'ORGANA VITAMINAS SAN JUAN DE LURIGANCHO',
    image: '/vitaminassjl.webp',
    address: 'Av. Gran Chimú 349-A, Urb. Zárate',
    phone: '(+51) 907 497 685',
    schedule: 'Lunes a Sábado 9:00 am a 9:00 pm Domingo 9 am a 6 pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Vitaminas+San+Juan+de+Lurigancho+Av+Gran+Chimu+349A',
    wazeUrl: 'https://waze.com/ul?q=Av+Gran+Chimu+349A+Urb+Zarate+San+Juan+de+Lurigancho&navigate=yes',
    type: 'vitaminas'
  }
];

const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-transform hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={store.image} 
          alt={`Tienda ${store.name}`} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 left-0 bg-[#1AB25A] text-white py-1 px-3 m-2 text-sm font-medium">
          {store.name}
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-start mb-1.5">
          <MapPin size={16} className="text-[#1AB25A] mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{store.address}</p>
        </div>
        
        <div className="flex items-start mb-1.5">
          <Phone size={16} className="text-[#1AB25A] mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{store.phone}</p>
        </div>
        
        <div className="flex items-start mb-3">
          <Clock size={16} className="text-[#1AB25A] mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{store.schedule}</p>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href={store.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#1AB25A] hover:bg-[#159a4e] text-white py-1.5 px-3 rounded text-sm flex-1 text-center transition-colors font-medium"
          >
            Ver en Google Maps
          </a>
          <a 
            href={store.wazeUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-[#1AB25A] text-[#1AB25A] hover:bg-green-50 py-1.5 px-3 rounded text-sm flex-1 text-center transition-colors font-medium"
          >
            Ver en Waze
          </a>
        </div>
      </div>
    </div>
  );
};

const StoreGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'conventional' | 'vitaminas'>('all');
  
  // Filtrar tiendas según el tipo seleccionado
  const filteredStores = filter === 'all' 
    ? stores 
    : stores.filter(store => store.type === filter);

  return (
    <div>
      {/* Filtros */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              filter === 'all'
                ? 'bg-[#1AB25A] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Todas las tiendas
          </button>
          <button
            type="button"
            onClick={() => setFilter('conventional')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'conventional'
                ? 'bg-[#1AB25A] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-t border-b border-gray-200'
            }`}
          >
            Tiendas Organa
          </button>
          <button
            type="button"
            onClick={() => setFilter('vitaminas')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              filter === 'vitaminas'
                ? 'bg-[#1AB25A] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Tiendas de Vitaminas
          </button>
        </div>
      </div>

      {/* Grid de tiendas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredStores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreGrid;
