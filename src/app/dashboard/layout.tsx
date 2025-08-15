import { UserProvider } from '@/context/UserContext';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
        <DashboardLayout>
            {children}
        </DashboardLayout>
    </UserProvider>
  )
}
