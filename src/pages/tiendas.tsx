import React from 'react';
import Layout from '@/components/layout/Layout';
import StoreGrid from '@/components/blocks/StoreGrid';

export default function StoresPage() {
  return (
    <Layout>
      {/* Hero Banner - Simple green header */}
      <div className="bg-green-500 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">Nuestras Tiendas</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <StoreGrid />
        </div>
      </div>
    </Layout>
  );
}
