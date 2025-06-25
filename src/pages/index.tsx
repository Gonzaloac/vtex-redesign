// ==================== VTEX-like Next.js Project (with CategoryGrid) ====================

// 1. pages/index.tsx
import Layout from '@/components/layout/Layout'
import HeroBanner from '@/components/blocks/HeroBanner'
import CategoryGrid from '@/components/blocks/CategoryGrid'
import ProductShelf from '@/components/blocks/ProductShelf'
import BenefitsSection from '@/components/blocks/BenefitsSection'
import SleepRelaxSection from '@/components/blocks/SleepRelaxSection'
import InfoBar from '@/components/blocks/InfoBar'

export default function Home() {
  return (
    <Layout>
      <HeroBanner
        title=""
        subtitle=""
        image="/banner-organa.jpg"
        mobileImage="/Banner-principal-Invierno-moviles-1.png"
        ctaText=""
        ctaLink="#"
      />

      {/* Sección de categorías resaltadas */}
      <CategoryGrid />
      <ProductShelf />
      <BenefitsSection />
      <InfoBar />  {/* Nueva sección de info */}
      <SleepRelaxSection />
     
    </Layout>
  )
}