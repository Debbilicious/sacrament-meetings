import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="relative w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src="/temple.jpg"
          alt="A temple exterior on a clear day"
          width={1920}
          height={1440}
          className="w-full h-auto rounded-lg"
          priority
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">Sacrament Meeting Planner</h1>
      <p className="text-lg mb-6">
        Plan, manage, and review sacrament meeting agendas — announcements, hymns,
        prayers, speakers, and ward business, all in one place.
      </p>
      <Link
        href="/meetings"
        className="inline-block bg-emerald-800 text-white px-6 py-3 rounded hover:bg-emerald-900"
      >
        View All Meetings
      </Link>
    </main>
  );
}