import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/blocks/ContactForm';
import { MapPin, Clock, Phone, Mail, Store } from 'lucide-react';

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Banner */}
      <div className="bg-green-500 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-50"></div>
        <div className="absolute inset-0 bg-pattern opacity-10" style={{ backgroundImage: 'url("/pattern-dots.png")' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-md">Contáctanos</h1>
            <p className="text-white text-xl opacity-90">
              Estamos aquí para ayudarte. Envíanos tus consultas y estaremos encantados de atenderte.
            </p>
          </div>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="/" className="text-gray-500 hover:text-green-500">Inicio</a>
                <span className="mx-2 text-gray-500">/</span>
              </li>
              <li className="text-green-600 font-medium">Contacto</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg">
              Nos encantaría saber de ti. Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </div>
      
      {/* Mapa y ubicaciones */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Nuestras Ubicaciones</h2>
            <p className="text-gray-600">Visítanos en cualquiera de nuestros puntos de venta</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-300">
                {/* Aquí iría un iframe de Google Maps */}
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">Mapa de ubicaciones</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Tiendas Organa</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Sede Principal</h4>
                    <p className="text-gray-600">Av. Principal 123, Lima</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Centro Comercial MegaPlaza</h4>
                    <p className="text-gray-600">Local 42, Nivel 2</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Centro Comercial Jockey Plaza</h4>
                    <p className="text-gray-600">Local 105, Nivel 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
