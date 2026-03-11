import type { LabelHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
	({ className, ...props }, ref) => {
		return (
			<label
				className={cn('text-sm font-medium leading-none text-text', className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Label.displayName = 'Label';

export { Label };
