import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'small';
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const { theme } = useTheme();

  const baseClasses = 'font-semibold rounded-lg transition-colors';

  const variantClasses = {
    primary: `${theme.button} ${theme.buttonText} px-8 py-3 text-xl`,
    secondary: `bg-transparent border-2 border-current ${theme.text} px-6 py-2 text-lg hover:bg-white/10`,
    small: `${theme.button} ${theme.buttonText} px-4 py-1 text-sm`,
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
