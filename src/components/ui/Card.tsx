import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  title?: string;
  action?: ReactNode;
}

export default function Card({ title, action, children }: PropsWithChildren<Props>) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-soft">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h2 className="text-lg font-semibold text-slate-900">{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
