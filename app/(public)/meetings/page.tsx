import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { fetchFilteredMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const dynamic = 'force-dynamic';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const meetings = await fetchFilteredMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-6">All Sacrament Meetings</h1>
      <MeetingSearch />
      {meetings.length === 0 ? (
        <p className="text-lg">No meetings found.</p>
      ) : (
        meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
}