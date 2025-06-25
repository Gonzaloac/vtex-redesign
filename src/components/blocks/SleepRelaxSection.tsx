import React from 'react';
import CategoryShelf from './CategoryShelf';
import { sleepProducts } from '@/data/sleepProducts';

const SleepRelaxSection: React.FC = () => {
  return (
    <CategoryShelf
      title="Sueño y Relajación"
      description="Productos naturales para mejorar tu descanso"
      backgroundImage="/Categoria-de-impulso-sueño-1.png"
      products={sleepProducts}
      showBannerText={false}
    />
  );
};

export default SleepRelaxSection;
