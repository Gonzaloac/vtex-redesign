import React, { useState } from 'react';
import Link from 'next/link';

const ImmuneDefenseSection: React.FC = () => {
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left banner - Inmune Defense */}
          <Link href="/product/immune-defense" className="md:w-1/2 block">
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.02]"
              onMouseEnter={() => setHoverLeft(true)}
              onMouseLeave={() => setHoverLeft(false)}
            >
              <img 
                src="/banner1.jpg" 
                alt="Inmune Defense" 
                className="w-full h-auto transition-transform duration-500 ease-in-out"
                style={{ transform: hoverLeft ? 'scale(1.05)' : 'scale(1)' }}
              />
            </div>
          </Link>
          
          {/* Right banner - Ang Maria LaJusticia */}
          <Link href="/product/lecitina-soja" className="md:w-1/2 block">
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.02]"
              onMouseEnter={() => setHoverRight(true)}
              onMouseLeave={() => setHoverRight(false)}
            >
              <img 
                src="/banner2.jpg" 
                alt="Ang Maria LaJusticia" 
                className="w-full h-auto transition-transform duration-500 ease-in-out"
                style={{ transform: hoverRight ? 'scale(1.05)' : 'scale(1)' }}
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImmuneDefenseSection;
