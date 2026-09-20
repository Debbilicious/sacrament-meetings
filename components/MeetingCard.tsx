import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="p-4 border-l-4 border-emerald-800 bg-gray-50 rounded mb-4">
      <h2 className="text-lg font-bold text-gray-900 mb-1">
        {new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
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
      <div className="flex gap-4 items-center">
        <Link
          href={`/meetings/${meeting.id}`}
          className="text-emerald-800 hover:underline"
        >
          View Full Program
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-blue-700 hover:underline"
        >
          Edit
        </Link>
        <form action={deleteMeeting.bind(null, meeting.id)}>
          <button type="submit" className="text-red-700 hover:underline">
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}