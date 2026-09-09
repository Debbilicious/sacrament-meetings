import { SacramentMeeting } from './types';

export const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Taylor',
    announcements: ['Ward temple trip on May 10th', 'Youth activity Wednesday at 6pm'],
    openingHymn: { number: 19, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [{ description: 'Sustaining of new Primary teacher' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Brother Smith', topic: 'Faith in Christ', type: 'speaker' },
      { name: 'Sister Lee', topic: 'Service', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Davis'
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Taylor',
    announcements: ['Fast and testimony meeting today'],
    openingHymn: { number: 30, title: 'Come, O Thou King of Kings' },
    openingPrayer: 'Sister Martinez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'In Humility, Our Savior' },
    speakers: [],
    closingHymn: { number: 136, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Wilson'
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Taylor',
    announcements: ['New member class starts next week'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Clark',
    wardBusiness: [{ description: 'Release of Relief Society secretary' }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Sister Adams', topic: 'Family History', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Musical Number', type: 'musical-number' }
    ],
    closingHymn: { number: 219, title: 'Have I Done Any Good?' },
    closingPrayer: 'Sister Turner'
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'President Roberts',
    conducting: 'President Roberts',
    announcements: ['Stake conference today — no regular sacrament meeting'],
    openingHymn: { number: 249, title: 'Called to Serve' },
    openingPrayer: 'Elder Harris',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'President Roberts', topic: 'Stake Direction', type: 'speaker' }
    ],
    closingHymn: { number: 223, title: 'Israel, Israel, God Is Calling' },
    closingPrayer: 'Sister Baker'
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'Bishop Anderson',
    conducting: 'Bishop Anderson',
    announcements: ['General Conference viewing today'],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Brother Young',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [],
    closingHymn: { number: 2, title: 'The Spirit of God' },
    closingPrayer: 'Sister Green'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}