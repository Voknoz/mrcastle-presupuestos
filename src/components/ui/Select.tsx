import { SelectHTMLAttributes, PropsWithChildren } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function Select({ label, children, ...props }: PropsWithChildren<Props>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <select
        {...props}
        className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
      >
        {children}
      </select>
    </label>
  );
}
