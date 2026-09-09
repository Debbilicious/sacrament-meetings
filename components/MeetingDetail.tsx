import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {new Date(meeting.date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </h1>
      <p className="text-sm text-gray-600 mb-4 capitalize">
        Meeting type: {meeting.meetingType}
        {meeting.stakeBusiness && ' • Stake Business'}
      </p>

      <p className="mb-1"><strong>Presiding:</strong> {meeting.presiding}</p>
      <p className="mb-4"><strong>Conducting:</strong> {meeting.conducting}</p>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-1">Announcements</h2>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.announcements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mb-1">
        <strong>Opening Hymn:</strong> #{meeting.openingHymn.number} — {meeting.openingHymn.title}
      </p>
      <p className="mb-4"><strong>Opening Prayer:</strong> {meeting.openingPrayer}</p>

      {meeting.wardBusiness.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-1">Ward Business</h2>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.wardBusiness.map((item, i) => (
              <li key={i}>{item.description}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mb-4">
        <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
      </p>

      {meeting.speakers.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 mb-1">Speakers & Musical Numbers</h2>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.speakers.map((item, i) => (
              <li key={i}>
                {item.name} — {item.topic} ({item.type === 'musical-number' ? 'Musical Number' : 'Speaker'})
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mb-1">
        <strong>Closing Hymn:</strong> #{meeting.closingHymn.number} — {meeting.closingHymn.title}
      </p>
      <p><strong>Closing Prayer:</strong> {meeting.closingPrayer}</p>
    </article>
  );
}