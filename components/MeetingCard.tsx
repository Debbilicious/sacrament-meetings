import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="p-4 border-l-4 border-emerald-800 bg-gray-50 rounded mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-1">
        {new Date(meeting.date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </h2>
      <p className="text-sm text-gray-600 mb-2 capitalize">
        Meeting type: {meeting.meetingType}
      </p>
      <p className="text-gray-700 mb-3">Presiding: {meeting.presiding}</p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="text-emerald-800 hover:underline"
      >
        View Full Program
      </Link>
    </article>
  );
}