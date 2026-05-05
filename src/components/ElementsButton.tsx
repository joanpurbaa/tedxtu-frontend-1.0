'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 relative w-36 sm:w-40 md:w-44 h-12 sm:h-14 md:h-16 rounded-full overflow-hidden text-center text-wrap bg-cover bg-center',
  {
    variants: {
        variant: {
          red: "bg-[url('/buttons/red-theme.webp')] bg-cover text-white",
          gold: "bg-[url('/buttons/green-theme.webp')] bg-[length:100%_100%] text-[#A66D03] bg-no-repeat bg-center hover:brightness-110 bg-clip-padding",
        },
        size: {
          default: 'h-12 px-6 text-sm',
          lg: 'h-14 px-6 text-base',
          sm: 'h-10 px-4 text-xs',
        },
      },
      defaultVariants: {
        variant: 'red',
        size: 'default',
      },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Base button
const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
BaseButton.displayName = 'BaseButton';

// Responsive button
export const ElementsButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    const [windowWidth, setWindowWidth] = React.useState(0);

    React.useEffect(() => {
      if (typeof window === 'undefined') return;
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getResponsiveSize = () => {
      if (windowWidth < 640) return 'sm';
      if (windowWidth < 1024) return 'default';
      return 'lg';
    };

    return (
      <BaseButton
        ref={ref}
        variant={variant}
        size={getResponsiveSize()}
        className={className}
        {...props}
      />
    );
  }
);
ElementsButton.displayName = 'ElementsButton';

export { buttonVariants };