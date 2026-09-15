export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-4 py-2 rounded mb-4">
        Admin area — authentication will be added in Week 05
      </div>
      {children}
    </div>
  );
}