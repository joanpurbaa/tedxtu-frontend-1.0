import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const cardVariants = cva(
  'transition-all hover:brightness-110',
  {
    variants: {
      variant: {
        red: "bg-[url('/card/bg-card-vision.webp')] bg-cover text-white",
        black: "bg-[url('/card/bg-card-mission.webp')] bg-cover text-white",
      },
      size: {
        default: 'p-6',
        lg: 'p-8',
        sm: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'red',
      size: 'default',
    },
  }
);

const titleVariants = cva('font-bold tracking-tight', {
  variants: {
    size: {
      default: 'text-2xl md:text-3xl lg:text-4xl',
      lg: 'text-3xl md:text-4xl lg:text-5xl',
      sm: 'text-xl md:text-2xl lg:text-3xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const contentVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      default: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
      sm: 'text-sm md:text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  title: string;
  content: string;
}

const ElementsCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, title, content, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('min-h-[200px] w-full p-1 rounded-[20px]', className)}
        {...props}
      >
        <div
          className={cn(
            'w-full h-full rounded-[16px] overflow-hidden flex items-center',
            cardVariants({ variant, size })
          )}
        >
          <div className='flex flex-row items-center justify-between w-full'>
            {variant === 'red' ? (
              <>
                <div className='w-1/3 pl-6 flex items-center'>
                  <CardHeader className='p-0'>
                    <CardTitle className={cn(titleVariants({ size }))}>
                      {title}
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent
                  className={cn(
                    'w-2/3 !text-white !text-2xl font-[family-name:var(--font-raleway)] p-6 flex items-center',
                    contentVariants({ size })
                  )}
                >
                  {content}
                </CardContent>
              </>
            ) : (
              <>
                <CardContent
                  className={cn(
                    'w-2/3 !text-white !text-2xl font-[family-name:var(--font-raleway)] p-6 flex items-center',
                    contentVariants({ size })
                  )}
                >
                  {content}
                </CardContent>
                <div className='w-1/3 pr-10'>
                  <CardHeader className='p-0'>
                    <CardTitle className={cn('text-right', titleVariants({ size }))}>
                      {title}
                    </CardTitle>
                  </CardHeader>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ElementsCard.displayName = 'ElementsCard';

export { ElementsCard, cardVariants };
