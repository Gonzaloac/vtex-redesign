import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Trash2, CreditCard, Truck, AlertCircle, MapPin, X, Check, ChevronDown, Search, Calendar } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import SimpleLayout from '@/components/layout/SimpleLayout';

// Importación dinámica de componentes de react-leaflet para evitar errores de SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import('react-leaflet').then((mod) => mod.Control.Zoom),
  { ssr: false }
);

// Componente para actualizar la vista del mapa cuando cambian las coordenadas
const ChangeMapView = dynamic(
  () => import('react-leaflet').then((mod) => {
    // Componente personalizado para cambiar la vista del mapa
    return ({ coords }) => {
      const map = mod.useMap();
      map.setView(coords, 15);
      return null;
    };
  }),
  { ssr: false }
);

// Componente para actualizar la vista del mapa
const SetViewOnChange = dynamic(
  () => import('react-leaflet').then((mod) => {
    // Componente personalizado para cambiar la vista del mapa
    return ({ coords, zoom }) => {
      const map = mod.useMap();
      map.setView(coords, zoom);
      return null;
    };
  }),
  { ssr: false }
);

// Datos de tiendas para el modal de selección
const stores = [
  {
    id: 'sanmiguel',
    name: 'ORGANA SAN MIGUEL',
    address: 'Avenida la Marina 2095, San Miguel',
    district: 'San Miguel',
    city: 'Lima',
    distance: '4.2 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.077, -77.083]
  },
  {
    id: 'sanisidro1',
    name: 'ORGANA SAN ISIDRO',
    address: 'Av. Gral. Salaverry 2407, San Isidro',
    district: 'San Isidro',
    city: 'Lima',
    distance: '3.8 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.094, -77.051]
  },
  {
    id: 'magdalena',
    name: 'ORGANA MAGDALENA',
    address: 'Jr. Bolognesi 395, Magdalena del Mar',
    district: 'Magdalena',
    city: 'Lima',
    distance: '5.1 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.097, -77.071]
  },
  {
    id: 'vitaminasmagdalena',
    name: 'VITAMINAS MAGDALENA',
    address: 'Av. Javier Prado Oeste 1458, Magdalena',
    district: 'Magdalena',
    city: 'Lima',
    distance: '5.3 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.088, -77.063]
  },
  {
    id: 'lamolina',
    name: 'ORGANA LA MOLINA',
    address: 'Av. La Molina 1167, La Molina',
    district: 'La Molina',
    city: 'Lima',
    distance: '12.5 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.074, -76.952]
  },
  {
    id: 'lamolina2',
    name: 'ORGANA LA MOLINA 2',
    address: 'Av. La Fontana 790, La Molina',
    district: 'La Molina',
    city: 'Lima',
    distance: '13.2 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.085, -76.948]
  },
  {
    id: 'losolivos',
    name: 'ORGANA LOS OLIVOS',
    address: 'Av. Antunez de Mayolo 830',
    district: 'Los Olivos',
    city: 'Lima',
    distance: '8.5 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-11.991, -77.068]
  },
  {
    id: 'losolivos2',
    name: 'ORGANA LOS OLIVOS 2',
    address: 'Av. Alfredo Mendiola 3583, Los Olivos',
    district: 'Los Olivos',
    city: 'Lima',
    distance: '9.7 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-11.982, -77.058]
  },
  {
    id: 'vitaminaslosolivos',
    name: 'VITAMINAS LOS OLIVOS',
    address: 'Av. Antúnez de Mayolo 1250, Los Olivos',
    district: 'Los Olivos',
    city: 'Lima',
    distance: '9.1 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-11.988, -77.073]
  },
  {
    id: 'pueblolibre',
    name: 'ORGANA PUEBLO LIBRE',
    address: 'Avenida José Leguía y Meléndez 922',
    district: 'Pueblo Libre',
    city: 'Lima',
    distance: '3.2 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.071, -77.063]
  },
  {
    id: 'surco',
    name: 'ORGANA SURCO',
    address: 'Av. Caminos del Inca 1803, Santiago de Surco',
    district: 'Santiago de Surco',
    city: 'Lima',
    distance: '10.4 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.136, -76.981]
  },
  {
    id: 'sanborja',
    name: 'ORGANA SAN BORJA',
    address: 'Av. Aviación 2449',
    district: 'San Borja',
    city: 'Lima',
    distance: '5.5 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.108, -76.998]
  },
  {
    id: 'surquillo',
    name: 'ORGANA SURQUILLO',
    address: 'Av. Angamos Este 1099',
    district: 'Surquillo',
    city: 'Lima',
    distance: '7.3 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.111, -77.021]
  },
  {
    id: 'sanisidro2',
    name: 'ORGANA SAN ISIDRO 2',
    address: 'Av. Conquistadores 605, San Isidro',
    district: 'San Isidro',
    city: 'Lima',
    distance: '4.6 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.103, -77.036]
  },
  {
    id: 'miraflores',
    name: 'ORGANA MIRAFLORES',
    address: 'Av Benavides 455, Miraflores',
    district: 'Miraflores',
    city: 'Lima',
    distance: '6.8 km',
    availability: 'Todos los productos disponibles',
    shipping: 'Gratis',
    deliveryTime: 'Listo en hasta 2 días hábiles',
    coords: [-12.127, -77.030]
  }
];

// Componente Modal para seleccionar tienda
const StorePickupModal = ({ isOpen, onClose, onSelectStore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [mapCenter, setMapCenter] = useState([-12.046, -77.043]); // Lima centro por defecto
  const [mapZoom, setMapZoom] = useState(11);
  const modalRef = useRef(null);

  useEffect(() => {
    const filtered = stores.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleStoreHover = (store) => {
    setMapCenter(store.coords);
    setMapZoom(15);
    setSelectedStoreId(store.id);
  };

  const handleStoreSelect = (store) => {
    onSelectStore(store);
  };

  // Icono personalizado para el marcador
  const storeIcon = new L.Icon({
    iconUrl: '/marker-icon.png',
    iconRetinaUrl: '/marker-icon-2x.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Icono para tienda seleccionada
  const selectedStoreIcon = new L.Icon({
    iconUrl: '/marker-icon-green.png',
    iconRetinaUrl: '/marker-icon-2x-green.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium">Elija un punto de recogida</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por dirección o distrito"
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="flex flex-grow overflow-hidden">
          {/* Lista de tiendas */}
          <div className="w-1/2 overflow-y-auto border-r border-gray-200">
            {filteredStores.map(store => (
              <div 
                key={store.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedStoreId === store.id ? 'bg-green-50' : ''}`}
                onClick={() => handleStoreSelect(store)}
                onMouseEnter={() => handleStoreHover(store)}
              >
                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-1">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{store.name}</h4>
                    <p className="text-sm text-gray-600">{store.address}</p>
                    <p className="text-sm text-gray-600">{store.district}</p>
                    <p className="text-sm text-gray-600">{store.city}</p>
                    <p className="text-sm text-green-600 mt-1">{store.availability}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{store.distance}</p>
                    <p className="text-gray-900 font-medium">{store.shipping}</p>
                    <p className="text-xs">{store.deliveryTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mapa */}
          <div className="w-1/2 h-[500px]">
            <MapContainer 
              center={mapCenter} 
              zoom={mapZoom} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="bottomright" />
              
              {stores.map(store => (
                <Marker 
                  key={store.id} 
                  position={store.coords} 
                  icon={selectedStoreId === store.id ? selectedStoreIcon : storeIcon}
                  eventHandlers={{
                    click: () => handleStoreSelect(store),
                    mouseover: () => handleStoreHover(store)
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-medium">{store.name}</h3>
                      <p className="text-sm">{store.address}</p>
                      <p className="text-sm">{store.district}, {store.city}</p>
                      <button 
                        className="mt-2 text-sm text-white bg-green-600 px-3 py-1 rounded-md"
                        onClick={() => handleStoreSelect(store)}
                      >
                        Seleccionar
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              <SetViewOnChange coords={mapCenter} zoom={mapZoom} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const router = useRouter();
  
  // Estados para el proceso de checkout
  const [activeStep, setActiveStep] = useState(1); // 1: Identificación, 2: Entrega, 3: Pago
  const [mapCoords, setMapCoords] = useState([-12.046373, -77.042755]); // Lima, Perú por defecto
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('debit'); // 'debit', 'credit', 'cash', 'yape'
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(stores[4]); // Default to Pueblo Libre store
  const [formData, setFormData] = useState({
    // Datos de identificación
    email: 'gonzaloac24@gmail.es',
    name: 'Gonzalo',
    lastName: 'ALavrez',
    documentType: 'DNI',
    documentNumber: '71124789',
    phone: '974857841',
    // Datos de entrega
    department: 'Lima',
    province: 'Lima',
    district: 'Miraflores',
    address: 'Av. Arequipa 123',
    reference: 'Cerca al parque Kennedy',
    deliveryMethod: 'delivery',
    // Datos de pago
    paymentMethod: 'card',
    // Datos de facturación
    wantInvoice: false,
    businessName: '',
    ruc: ''
  });
  
  // Configuración del icono de Leaflet
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      // Importar Leaflet dinámicamente
      import('leaflet').then((L) => {
        // Soluciona el problema del icono de marcador faltante en Leaflet con React
        delete L.Icon.Default.prototype._getIconUrl;
        
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
      });
    }
  }, []);
  
  // Función para geocodificar la dirección
  const geocodeAddress = async () => {
    if (!formData.address) return;
    
    setIsSearchingAddress(true);
    
    try {
      // Construir la dirección completa para la búsqueda
      const searchAddress = `${formData.address}, ${formData.district}, ${formData.province}, ${formData.department}, Perú`;
      
      // Usar la API de Nominatim para geocodificar la dirección
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Actualizar las coordenadas del mapa
        setMapCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert('No se encontró la dirección. Por favor, intenta con otra dirección más específica.');
      }
    } catch (error) {
      console.error('Error al geocodificar la dirección:', error);
      alert('Hubo un error al buscar la dirección. Por favor, intenta de nuevo.');
    } finally {
      setIsSearchingAddress(false);
    }
  };

  // Si el carrito está vacío, redirigir a la página principal
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="bg-gray-100 p-6 rounded-full inline-block mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has agregado productos a tu carrito. Explora nuestro catálogo para encontrar lo que necesitas.
          </p>
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors inline-block"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (activeStep === 1) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!showDeliveryOptions) {
        setShowDeliveryOptions(true);
      } else {
        setActiveStep(3);
        setShowDeliveryOptions(false);
      }
    }
  };

  // Función para retroceder al paso anterior
  const prevStep = (step: number) => {
    setActiveStep(step);
    setShowDeliveryOptions(false);
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <SimpleLayout title="Checkout" showBackButton={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/cart" className="text-green-600 hover:text-green-700 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            <span>Volver a carrito</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Proceso de checkout */}
          <div className="lg:col-span-2">
            {/* Sección de identificación */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center">
                <div className={`${activeStep === 1 ? "bg-green-600 text-white" : "bg-white border border-gray-300 text-gray-700"} w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3`}>
                  1
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Identificación</h2>
                {activeStep > 1 && (
                  <button 
                    onClick={() => prevStep(1)}
                    className="ml-auto text-green-600 hover:text-green-700 text-sm"
                  >
                    Editar
                  </button>
                )}
              </div>
              
              {activeStep === 1 && (
                <form className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
                        Tipo de documento
                      </label>
                      <select
                        id="documentType"
                        name="documentType"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={formData.documentType}
                        onChange={handleChange}
                      >
                        <option value="dni">DNI</option>
                        <option value="passport">Pasaporte</option>
                        <option value="foreignId">Carnet de Extranjería</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">
                        Número de documento
                      </label>
                      <input
                        type="text"
                        id="documentNumber"
                        name="documentNumber"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={formData.documentNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="invoice"
                      name="invoice"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      checked={formData.wantInvoice}
                      onChange={(e) => setFormData({...formData, wantInvoice: e.target.checked})}
                    />
                    <label htmlFor="invoice" className="ml-2 block text-sm text-gray-500">
                      Quiero factura
                    </label>
                  </div>
                  
                  {formData.wantInvoice && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 mt-4">
                      <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                          Razón Social
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                          value={formData.businessName}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">
                          RUC
                        </label>
                        <input
                          type="text"
                          id="ruc"
                          name="ruc"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                          value={formData.ruc}
                          onChange={handleChange}
                          maxLength={11}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                      onClick={() => setActiveStep(2)}
                    >
                      Ir a la entrega
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Sección de entrega - siempre visible pero contenido condicional */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center">
                <div className={`${activeStep === 2 ? "bg-green-600 text-white" : "bg-white border border-gray-300 text-gray-700"} w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3`}>
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Entrega</h2>
                {activeStep > 2 && (
                  <button 
                    onClick={() => prevStep(2)}
                    className="ml-auto text-green-600 hover:text-green-700 text-sm"
                  >
                    Editar
                  </button>
                )}
              </div>
              
              {activeStep === 2 && (
                <div className="mt-4">
                  {/* Sección de Envío */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Envío</h3>
                    
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-4">
                      <button
                        type="button"
                        className={`flex-1 py-3 px-4 text-center ${formData.deliveryMethod === 'delivery' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => setFormData({...formData, deliveryMethod: 'delivery'})}
                      >
                        <span>Enviar</span>
                        <span className="block text-xs">a la dirección</span>
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-3 px-4 text-center ${formData.deliveryMethod === 'pickup' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => setFormData({...formData, deliveryMethod: 'pickup'})}
                      >
                        <span>Recoger</span>
                        <span className="block text-xs">en la tienda</span>
                      </button>
                    </div>
                  </div>
                  
                  {formData.deliveryMethod === 'delivery' ? (
                    <>
                      {/* Mapa y campos de dirección */}
                      <div className="mb-6">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                              Dirección
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                className="flex-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Ingresa tu dirección"
                              />
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={geocodeAddress}
                                disabled={isSearchingAddress || !formData.address}
                              >
                                {isSearchingAddress ? (
                                  <span className="animate-spin">⌛</span>
                                ) : (
                                  <Search size={18} />
                                )}
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                Distrito
                              </label>
                              <input
                                type="text"
                                id="district"
                                name="district"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={formData.district}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                                Provincia
                              </label>
                              <input
                                type="text"
                                id="province"
                                name="province"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={formData.province}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full h-48 bg-gray-200 rounded-md mb-4 overflow-hidden">
                          {typeof window !== 'undefined' && (
                            <MapContainer 
                              center={mapCoords} 
                              zoom={15} 
                              style={{ height: '100%', width: '100%' }}
                            >
                              <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />
                              <Marker position={mapCoords}>
                                <Popup>
                                  {formData.address}
                                </Popup>
                              </Marker>
                              <ChangeMapView coords={mapCoords} />
                            </MapContainer>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Si no coincide con su dirección puede buscar otra ubicación.</p>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="button"
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                          onClick={nextStep}
                        >
                          CONTINUAR
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={18} className="text-green-600" />
                          <h4 className="text-sm font-medium text-gray-700">{selectedStore.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{selectedStore.address}</p>
                        <p className="text-sm text-gray-600 ml-6">{selectedStore.district}</p>
                        <p className="text-sm text-gray-600 ml-6">{selectedStore.city}</p>
                        <button className="text-sm text-green-600 ml-6 mt-1">Ver más detalles</button>
                      </div>
                      
                      <button 
                        className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-md text-sm font-medium mb-4"
                        onClick={() => setIsStoreModalOpen(true)}
                      >
                        Vea todos los puntos de recogida disponibles
                      </button>
                      
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            id="schedule-all"
                            name="scheduleOption"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            checked
                            readOnly
                          />
                          <label htmlFor="schedule-all" className="ml-2 block text-sm font-medium text-gray-700">
                            Programar todos
                          </label>
                        </div>
                        
                        <button 
                          className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2"
                          onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                          <Calendar size={16} />
                          {selectedDate ? selectedDate : "Elija una fecha de entrega"}
                        </button>
                        
                        {showDatePicker && (
                          <div className="mt-2 border border-gray-200 rounded-lg p-4 bg-white shadow-md">
                            <div className="text-center mb-2">
                              <h4 className="text-sm font-medium">julio 2025</h4>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                              <div className="text-gray-500">lu</div>
                              <div className="text-gray-500">ma</div>
                              <div className="text-gray-500">mi</div>
                              <div className="text-gray-500">ju</div>
                              <div className="text-gray-500">vi</div>
                              <div className="text-gray-500">sá</div>
                              <div className="text-gray-500">do</div>
                              
                              <div className="text-gray-400">30</div>
                              <div>1</div>
                              <div>2</div>
                              <div>3</div>
                              <div>4</div>
                              <div>5</div>
                              <div>6</div>
                              
                              <div>7</div>
                              <div>8</div>
                              <div>9</div>
                              <div>10</div>
                              <div 
                                className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto cursor-pointer"
                                onClick={() => {
                                  setSelectedDate("11 de julio de 2025");
                                  setShowDatePicker(false);
                                }}
                              >11</div>
                              <div>12</div>
                              <div>13</div>
                              
                              <div>14</div>
                              <div>15</div>
                              <div>16</div>
                              <div>17</div>
                              <div className="text-gray-400">18</div>
                              <div className="text-gray-400">19</div>
                              <div className="text-gray-400">20</div>
                              
                              <div className="text-gray-400">21</div>
                              <div className="text-gray-400">22</div>
                              <div className="text-gray-400">23</div>
                              <div className="text-gray-400">24</div>
                              <div className="text-gray-400">25</div>
                              <div className="text-gray-400">26</div>
                              <div className="text-gray-400">27</div>
                              
                              <div className="text-gray-400">28</div>
                              <div className="text-gray-400">29</div>
                              <div className="text-gray-400">30</div>
                              <div className="text-gray-400">31</div>
                              <div className="text-gray-400">1</div>
                              <div className="text-gray-400">2</div>
                              <div className="text-gray-400">3</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                        onClick={nextStep}
                      >
                        Ir para el pago
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Sección de Pago */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center">
                <div className={`${activeStep === 3 ? "bg-green-600 text-white" : "bg-white border border-gray-300 text-gray-700"} w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3`}>
                  3
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Pago</h2>
              </div>
              
              {activeStep === 3 && (
                <div className="mt-4">
                  <div className="border border-green-600 rounded-lg overflow-hidden">
                    {/* Opciones de método de pago */}
                    <div className="grid grid-cols-4">
                      <button
                        type="button"
                        className={`py-3 px-4 text-center ${paymentMethod === 'debit' ? 'bg-green-100 text-green-700 font-medium' : 'bg-white text-gray-700'}`}
                        onClick={() => setPaymentMethod('debit')}
                      >
                        Tarjeta de débito
                      </button>
                      <button
                        type="button"
                        className={`py-3 px-4 text-center ${paymentMethod === 'cash' ? 'bg-green-100 text-green-700 font-medium' : 'bg-white text-gray-700'}`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        Efectivo
                      </button>
                      <button
                        type="button"
                        className={`py-3 px-4 text-center ${paymentMethod === 'yape' ? 'bg-green-100 text-green-700 font-medium' : 'bg-white text-gray-700'}`}
                        onClick={() => setPaymentMethod('yape')}
                      >
                        Yape
                      </button>
                      <button
                        type="button"
                        className={`py-3 px-4 text-center ${paymentMethod === 'credit' ? 'bg-green-100 text-green-700 font-medium' : 'bg-white text-gray-700'}`}
                        onClick={() => setPaymentMethod('credit')}
                      >
                        Tarjeta de crédito
                      </button>
                    </div>
                    
                    {/* Contenido según método de pago seleccionado */}
                    <div className="p-6">
                      {paymentMethod === 'debit' && (
                        <>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Número
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="0000 0000 0000 0000"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="installments" className="block text-sm font-medium text-gray-700">
                                Cuotas disponibles:
                              </label>
                              <div className="mt-1 relative">
                                <select
                                  id="installments"
                                  name="installments"
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                >
                                  <option>Total - S/ 236.70</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <ChevronDown size={16} />
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                                Nombre y Apellido como figura en la tarjeta
                              </label>
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                  Fecha de Vencimiento
                                </label>
                                <div className="mt-1 flex gap-2">
                                  <div className="w-1/2 relative">
                                    <select
                                      id="expiryMonth"
                                      name="expiryMonth"
                                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                    >
                                      <option>MM</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                      <ChevronDown size={16} />
                                    </div>
                                  </div>
                                  <div className="w-1/2 relative">
                                    <select
                                      id="expiryYear"
                                      name="expiryYear"
                                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                    >
                                      <option>AA</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                      <ChevronDown size={16} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">
                                  Código de Seguridad
                                </label>
                                <input
                                  type="text"
                                  id="securityCode"
                                  name="securityCode"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                id="sameAddress"
                                name="sameAddress"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                defaultChecked
                              />
                              <label htmlFor="sameAddress" className="ml-2 block text-sm text-gray-700">
                                La dirección de la factura de la tarjeta es Jirón Loreto , 587
                              </label>
                            </div>
                            
                            <div className="text-green-600 text-sm">
                              Pagar con 2 tarjetas
                            </div>
                          </div>
                        </>
                      )}
                      
                      {paymentMethod === 'credit' && (
                        <>
                          <div className="space-y-4">
                            <div className="flex justify-end mb-2">
                              <div className="flex gap-2">
                                <img src="/tarjetas-credito-logos.png" alt="Tarjetas de crédito" className="h-6" />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Número
                              </label>
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="0000 0000 0000 0000"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="installments" className="block text-sm font-medium text-gray-700">
                                Cuotas disponibles:
                              </label>
                              <div className="mt-1 relative">
                                <select
                                  id="installments"
                                  name="installments"
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                >
                                  <option>¿En cuántas cuotas deseas pagar?</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <ChevronDown size={16} />
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                                Nombre y Apellido como figura en la tarjeta
                              </label>
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                  Fecha de Vencimiento
                                </label>
                                <div className="mt-1 flex gap-2">
                                  <div className="w-1/2 relative">
                                    <select
                                      id="expiryMonth"
                                      name="expiryMonth"
                                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                    >
                                      <option>MM</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                      <ChevronDown size={16} />
                                    </div>
                                  </div>
                                  <div className="w-1/2 relative">
                                    <select
                                      id="expiryYear"
                                      name="expiryYear"
                                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                    >
                                      <option>AA</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                      <ChevronDown size={16} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">
                                  Código de Seguridad
                                </label>
                                <input
                                  type="text"
                                  id="securityCode"
                                  name="securityCode"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                id="sameAddress"
                                name="sameAddress"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                defaultChecked
                              />
                              <label htmlFor="sameAddress" className="ml-2 block text-sm text-gray-700">
                                La dirección de la factura de la tarjeta es Jirón Loreto , 587
                              </label>
                            </div>
                            
                            <div className="text-green-600 text-sm">
                              Pagar con 2 tarjetas
                            </div>
                          </div>
                        </>
                      )}
                      
                      {paymentMethod === 'cash' && (
                        <>
                          <div className="py-4">
                            <p className="text-gray-700">
                              Después de confirmar la compra, podrá seleccionar uno de los métodos de pago en efectivo disponibles, así como visualizar cómo y dónde puede realizar el pago.
                            </p>
                          </div>
                        </>
                      )}
                      
                      {paymentMethod === 'yape' && (
                        <>
                          <div className="flex flex-col items-center py-4">
                            <img src="/yape-logo.png" alt="Yape" className="h-12 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">¡Paga con Yape</h3>
                            <p className="text-center mb-6">en pocos minutos!</p>
                            
                            <div className="w-full space-y-6">
                              <div className="flex items-center">
                                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-600 mr-3">
                                  1
                                </div>
                                <p>Al continuar, te aparecerá un formulario para completar tus datos.</p>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-600 mr-3">
                                  2
                                </div>
                                <p>Ingresa el celular asociado a Yape y pega el código de aprobación desde la app.</p>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center text-purple-600 mr-3">
                                  3
                                </div>
                                <p>Confirma tu pago ¡y listo!</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        He leído y acepto los términos y condiciones y política de datos personales.
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      className="flex items-center text-gray-700 hover:text-gray-900"
                      onClick={() => prevStep(2)}
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      <span>Volver atrás</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Columna derecha: Resumen de compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Resumen de la compra</h2>
                <Link href="/cart" className="text-green-600 hover:text-green-700 text-sm">
                  Volver a carrito
                </Link>
              </div>
              
              {/* Lista de productos en el resumen */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100">
                    <div className="relative">
                      <span className="absolute -top-1 -left-1 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                      <p className="text-sm font-medium text-gray-900">S/ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Código de promoción */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">¿Tienes un cupón? Ingrésalo aquí (opcional)</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Código de cupón" 
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ab25a] focus:border-transparent"
                  />
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Añadir
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                    onClick={() => alert('¡Gracias por tu compra! Este sistema se integrará con VTEX.')}
                  >
                    Confirmar pedido
                  </button>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <AlertCircle size={14} />
                    <span>
                      Al confirmar, aceptas nuestros términos y condiciones
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  <img src="/tarjetas-credito-logos.png" alt="Tarjetas de crédito" className="h-16 w-auto max-w-[300px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para seleccionar tienda */}
      <StorePickupModal 
        isOpen={isStoreModalOpen} 
        onClose={() => setIsStoreModalOpen(false)} 
        onSelectStore={(store) => {
          setSelectedStore(store);
          setIsStoreModalOpen(false);
        }} 
      />
    </SimpleLayout>
  );
};

export default CheckoutPage;
