import React, { ReactNode } from 'react';
import SimpleHeader from '@/components/shared/SimpleHeader';

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ 
  children,
  title,
  showBackButton = true,
  backUrl = '/'
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SimpleHeader 
        title={title} 
        showBackButton={showBackButton} 
        backUrl={backUrl} 
      />
      <main className="flex-grow">
        {children}
      </main>
      <div className="bg-gray-100 py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Organa. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleLayout;
