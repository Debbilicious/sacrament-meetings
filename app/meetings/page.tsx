import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default async function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-6">All Sacrament Meetings</h1>
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}