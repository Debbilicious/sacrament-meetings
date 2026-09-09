export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-emerald-800 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <p className="text-xl font-bold">Riverside Ward</p>
        <p className="text-sm">{today}</p>
      </div>
    </header>
  );
}