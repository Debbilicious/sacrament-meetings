import { neon } from '@neondatabase/serverless';
import { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

interface MeetingRow {
  id: number;
  date: string | Date;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: { number: number; title: string };
  opening_prayer: string;
  ward_business: { description: string }[] | null;
  stake_business: boolean;
  sacrament_hymn: { number: number; title: string };
  speakers: { name: string; topic: string; type: 'speaker' | 'musical-number' }[] | null;
  closing_hymn: { number: number; title: string };
  closing_prayer: string;
}

const ITEMS_PER_PAGE = 5;

function mapRowToMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date instanceof Date
      ? `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`
      : row.date,
    meetingType: row.meeting_type as SacramentMeeting['meetingType'],
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  if (date) {
    const rows = await sql`SELECT * FROM meetings WHERE date = ${date} ORDER BY date`;
    return (rows as MeetingRow[]).map(mapRowToMeeting);
  }
  const rows = await sql`SELECT * FROM meetings ORDER BY date`;
  return (rows as MeetingRow[]).map(mapRowToMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`SELECT * FROM meetings WHERE id = ${id}`;
  if (rows.length === 0) return null;
  return mapRowToMeeting(rows[0] as MeetingRow);
}

export async function fetchFilteredMeetings(query: string, currentPage: number): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT * FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR speakers::text ILIKE ${searchTerm}
    ORDER BY date
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return (rows as MeetingRow[]).map(mapRowToMeeting);
}

export async function getMeetingsTotalPages(query: string): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE presiding ILIKE ${searchTerm}
       OR conducting ILIKE ${searchTerm}
       OR meeting_type ILIKE ${searchTerm}
       OR speakers::text ILIKE ${searchTerm}
  `;
  const count = Number(rows[0].count);
  return Math.ceil(count / ITEMS_PER_PAGE);
}