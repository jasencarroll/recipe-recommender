import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-white hover:bg-primary/90',
				secondary: 'bg-accent text-text hover:bg-accent/80',
				outline: 'border border-border bg-transparent hover:bg-surface',
				ghost: 'hover:bg-surface',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 px-3 text-xs',
				lg: 'h-11 px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
