import React from 'react';
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
    wazeUrl: 'https://waze.com/ul?q=Av+La+Marina+2355+San+Miguel&navigate=yes'
  },
  {
    id: 'sanisidro',
    name: 'ORGANA SAN ISIDRO',
    image: '/sanisidro2.webp',
    address: 'Av. Gral. Salaverry 2407, San Isidro',
    phone: '(+51) 944 209 570',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+San+Miguel+Av+La+Marina+2355',
    wazeUrl: 'https://waze.com/ul?q=Av+La+Marina+2355+San+Miguel&navigate=yes'
  },
  {
    id: 'magdalena',
    name: 'ORGANA MAGDALENA',
    image: '/magdalena.webp',
    address: 'Jr. Bolognesi 395, Magdalena del Mar',
    phone: '(+51)989 960 536',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Magdalena+Av+Javier+Prado+Oeste+1650',
    wazeUrl: 'https://waze.com/ul?q=Av+Javier+Prado+Oeste+1650+Magdalena&navigate=yes'
  },
  {
    id: 'vitaminasmagdalena',
    name: 'VITAMINAS MAGDALENA',
    image: '/vitaminasmagdalena.webp',
    address: 'Av. Javier Prado Oeste 1458, Magdalena',
    phone: '(01) 500-2058',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Vitaminas+Magdalena+Av+Javier+Prado+Oeste+1458',
    wazeUrl: 'https://waze.com/ul?q=Av+Javier+Prado+Oeste+1458+Magdalena&navigate=yes'
  },
  {
    id: 'lamolina',
    name: 'ORGANA LA MOLINA',
    image: '/lamolina.webp',
    address: 'Av. La Molina 1167, La Molina',
    phone: '(01) 500-2059',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+La+Molina+Av+La+Molina+1167',
    wazeUrl: 'https://waze.com/ul?q=Av+La+Molina+1167+La+Molina&navigate=yes'
  },
  {
    id: 'lamolina2',
    name: 'ORGANA LA MOLINA 2',
    image: '/lamolina2.webp',
    address: 'Av. La Fontana 790, La Molina',
    phone: '(01) 500-2060',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+La+Molina+2+Av+La+Fontana+790',
    wazeUrl: 'https://waze.com/ul?q=Av+La+Fontana+790+La+Molina&navigate=yes'
  },
  {
    id: 'losolivos',
    name: 'ORGANA LOS OLIVOS',
    image: '/losolivos.webp',
    address: 'Av. Antunez de Mayolo 830',
    phone: '(+51)963 732 504',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Los+Olivos+Av+Carlos+Izaguirre+880',
    wazeUrl: 'https://waze.com/ul?q=Av+Carlos+Izaguirre+880+Los+Olivos&navigate=yes'
  },
  {
    id: 'losolivos',
    name: 'ORGANA LOS OLIVOS 2',
    image: '/losolivos.webp',
    address: 'Av. Alfredo Mendiola 3583, Los Olivos',
    phone: '(+51)988 546 764',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Los+Olivos+Av+Carlos+Izaguirre+880',
    wazeUrl: 'https://waze.com/ul?q=Av+Carlos+Izaguirre+880+Los+Olivos&navigate=yes'
  },
  {
    id: 'vitaminaslosolivos',
    name: 'VITAMINAS LOS OLIVOS',
    image: '/vitaminaslosolivos.webp',
    address: 'Av. Antúnez de Mayolo 1250, Los Olivos',
    phone: '(01) 500-2062',
    schedule: 'Lunes a Domingo: 9:00am - 10:00pm',
    mapUrl: 'https://maps.google.com/?q=Vitaminas+Los+Olivos+Av+Antunez+de+Mayolo+1250',
    wazeUrl: 'https://waze.com/ul?q=Av+Antunez+de+Mayolo+1250+Los+Olivos&navigate=yes'
  },
  {
    id: 'pueblolibre',
    name: 'ORGANA PUEBLO LIBRE',
    image: '/pueblolibre.webp',
    address: 'Av. Leguía y Melendez 922, Pueblo Libre',
    phone: '(+51)948 358 794',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Pueblo+Libre+Av+Sucre+585',
    wazeUrl: 'https://waze.com/ul?q=Av+Sucre+585+Pueblo+Libre&navigate=yes'
  },
  {
    id: 'surco',
    name: 'ORGANA SURCO',
    image: '/surco.webp',
    address: 'Av. Caminos del Inca 1803, Santiago de Surco',
    phone: '(+51) 920 517 582',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Surco+Av+El+Polo+670',
    wazeUrl: 'https://waze.com/ul?q=Av+El+Polo+670+Santiago+de+Surco&navigate=yes'
  },
  {
    id: 'sanborja',
    name: 'ORGANA SAN BORJA',
    image: '/sanborja.webp',
    address: 'Av. Aviación 2449, San Borja',
    phone: '(+51) 944 596 281',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+San+Borja+Av+San+Luis+2195',
    wazeUrl: 'https://waze.com/ul?q=Av+San+Luis+2195+San+Borja&navigate=yes'
  },
  {
    id: 'surquillo',
    name: 'ORGANA SURQUILLO',
    image: '/surquillo.webp',
    address: 'Av. Angamos Este 1099',
    phone: '(+51)997 830 093',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Surquillo+Av+Republica+de+Panama+4295',
    wazeUrl: 'https://waze.com/ul?q=Av+Republica+de+Panama+4295+Surquillo&navigate=yes'
  },
  {
    id: 'sanisidro',
    name: 'ORGANA SAN ISIDRO',
    image: '/sanisidro.webp',
    address: 'Av. Gral. Salaverry 2407, San Isidro',
    phone: '(+51) 944 209 570',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+San+Isidro+Av+Conquistadores+605',
    wazeUrl: 'https://waze.com/ul?q=Av+Conquistadores+605+San+Isidro&navigate=yes'
  },
  {
    id: 'miraflores',
    name: 'ORGANA MIRAFLORES',
    image: '/miraflores.webp',
    address: 'Av Benavides 455, Miraflores',
    phone: '(+51)943 541 768',
    schedule: 'Lunes a Domingo: 9:00am - 9:00pm',
    mapUrl: 'https://maps.google.com/?q=Organa+Miraflores+Av+Larco+345',
    wazeUrl: 'https://waze.com/ul?q=Av+Larco+345+Miraflores&navigate=yes'
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
        <div className="absolute top-0 left-0 bg-green-500 text-white py-1 px-3 m-2 text-sm font-medium">
          {store.name}
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-start mb-1.5">
          <MapPin size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{store.address}</p>
        </div>
        
        <div className="flex items-start mb-1.5">
          <Phone size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{store.phone}</p>
        </div>
        
        <div className="flex items-start mb-3">
          <Clock size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm">{store.schedule}</p>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href={store.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded text-sm flex-1 text-center transition-colors font-medium"
          >
            Ver en Google Maps
          </a>
          <a 
            href={store.wazeUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-green-500 text-green-500 hover:bg-green-50 py-1.5 px-3 rounded text-sm flex-1 text-center transition-colors font-medium"
          >
            Ver en Waze
          </a>
        </div>
      </div>
    </div>
  );
};

const StoreGrid: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {stores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreGrid;
