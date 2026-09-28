import { signOut } from '@/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-4 py-2 rounded mb-4 flex justify-between items-center">
        <span>Admin area</span>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button type="submit" className="underline hover:text-yellow-900">
            Sign Out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}