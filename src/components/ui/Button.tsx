import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  full?: boolean;
};

export default function Button({
  children,
  className,
  variant = 'primary',
  full,
  ...props
}: PropsWithChildren<Props>) {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100'
  };

  return (
    <button
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition',
        variants[variant],
        full && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
