import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";

async function getAllMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch("http://localhost:3000/api/meetings", { cache: "no-store" });
  const data = await res.json();
  return data.meetings;
}

export default async function MeetingsPage() {
  const meetings = await getAllMeetings();

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-6">All Sacrament Meetings</h1>
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}