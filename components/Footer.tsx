export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-4 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p>Sacrament Meeting Planner &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}