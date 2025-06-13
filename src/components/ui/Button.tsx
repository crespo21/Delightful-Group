import React from 'react';
import { Link } from 'react-router-dom';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  type = 'button'
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-gray-800 hover:bg-gray-900 text-white',
    outline: 'bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
  };
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-8 text-lg'
  };
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  if (href) {
    return <Link to={href} className={styles}>
        {children}
      </Link>;
  }
  return <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>;
};
export default Button;