import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface SimpleHeaderProps {
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ 
  title, 
  showBackButton = true, 
  backUrl = '/' 
}) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showBackButton && (
              <Link href={backUrl} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
              </Link>
            )}
            
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={120} 
                height={32} 
                className="h-8 w-auto" 
              />
            </Link>
          </div>
          
          <div className="w-[120px]">
            {/* Espacio vacío para mantener el centrado */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
