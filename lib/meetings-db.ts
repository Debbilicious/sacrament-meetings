import { neon } from '@neondatabase/serverless';
import { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

function mapRowToMeeting(row: any): SacramentMeeting {
  return {
    id: row.id,
    date: row.date instanceof Date
      ? `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`
      : row.date,
    meetingType: row.meeting_type,
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
    return rows.map(mapRowToMeeting);
  }
  const rows = await sql`SELECT * FROM meetings ORDER BY date`;
  return rows.map(mapRowToMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`SELECT * FROM meetings WHERE id = ${id}`;
  if (rows.length === 0) return null;
  return mapRowToMeeting(rows[0]);
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
  return rows.map(mapRowToMeeting);
}

export async function fetchMeetingsPages(query: string): Promise<number> {
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

// Stub functions - will be wired to the database in Week 04
export async function addMeeting(meeting: Omit<SacramentMeeting, 'id'>): Promise<SacramentMeeting> {
  throw new Error('addMeeting not yet implemented - coming in Week 04');
}

export async function updateMeeting(id: number, meeting: Partial<SacramentMeeting>): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting not yet implemented - coming in Week 04');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error('deleteMeeting not yet implemented - coming in Week 04');
}