export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-4xl mx-auto px-4">
      {children}
    </main>
  );
}