import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

function getMostRecentSunday(): string {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day;
  const sunday = new Date(today.setDate(diff));
  return sunday.toISOString().split("T")[0];
}

export default async function CurrentMeetingPage() {
  const targetDate = getMostRecentSunday();
  const meetings = await getMeetings();

  const exactMatch = meetings.find((m) => m.date === targetDate);

  const fallback = [...meetings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  const meetingToShow = exactMatch ?? fallback;

  if (meetingToShow) {
    redirect(`/meetings/${meetingToShow.id}`);
  }

  redirect("/meetings");
}