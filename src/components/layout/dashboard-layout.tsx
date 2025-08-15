
'use client';

import { Header } from '@/components/layout/header';
import { useUser } from '@/context/UserContext';


export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();

    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <Header user={user} />
            <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
                {children}
            </main>
        </div>
    )
}
