import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500"
      />
    </label>
  );
}
