import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";

function getMostRecentSunday(): string {
  const today = new Date();
  const day = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - day);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const date = String(sunday.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export default async function CurrentMeetingPage() {
  const targetDate = getMostRecentSunday();
  const meetings = await getMeetings();

  const exactMatch = meetings.find((meeting) => meeting.date === targetDate);

  if (!exactMatch) {
    return (
      <div className="mx-auto mt-16 max-w-xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">No Meeting Scheduled This Week</h1>
        <p className="mt-3 text-slate-600">
          There is no sacrament meeting record for this week yet.
        </p>
        <div className="mt-6">
          <Link
            href="/meetings"
            className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View All Meetings
          </Link>
        </div>
      </div>
    );
  }

  const { redirect } = await import("next/navigation");
  redirect(`/meetings/${exactMatch.id}`);
}