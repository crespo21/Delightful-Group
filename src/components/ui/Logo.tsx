import React from 'react';
interface LogoProps {
  isFooter?: boolean;
}
const Logo: React.FC<LogoProps> = ({
  isFooter = false
}) => {
  return <div className="flex flex-col items-center">
      <div className="flex items-center">
        <img src="/IMG_4471.jpg" alt="DelightfulGroup Logo" className={`h-12 md:h-14 ${isFooter ? 'brightness-110' : ''}`} />
        <div className="ml-2">
          <div className={`font-bold text-lg md:text-xl ${isFooter ? 'text-white' : 'text-green-600'}`}>
            DelightfulGroup
          </div>
        </div>
      </div>
    </div>;
};
export default Logo;