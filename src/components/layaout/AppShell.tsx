import { PropsWithChildren } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="app-container">{children}</main>
      <BottomNav />
    </div>
  );
}
