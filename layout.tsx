// app/admin/layout.tsx
import { verifyToken } from '../lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '../components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication check
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login');
  }

  const user = await verifyToken(token);
  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar user={user} />
      <main className="md:ml-64 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}