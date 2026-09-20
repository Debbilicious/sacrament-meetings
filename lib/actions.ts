'use server';

import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL!);

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    message: 'Please select a valid meeting type.',
  }),
  presiding: z.string().min(2, 'Presiding name is required.'),
  conducting: z.string().min(2, 'Conducting name is required.'),
  openingHymnNumber: z.coerce.number().int().positive('Hymn number is required.'),
  openingHymnTitle: z.string().min(2, 'Hymn title is required.'),
  openingPrayer: z.string().min(2, 'Opening prayer name is required.'),
  sacramentHymnNumber: z.coerce.number().int().positive('Hymn number is required.'),
  sacramentHymnTitle: z.string().min(2, 'Hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().positive('Hymn number is required.'),
  closingHymnTitle: z.string().min(2, 'Hymn title is required.'),
  closingPrayer: z.string().min(2, 'Closing prayer name is required.'),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const d = validatedFields.data;
  const openingHymn = { number: d.openingHymnNumber, title: d.openingHymnTitle };
  const sacramentHymn = { number: d.sacramentHymnNumber, title: d.sacramentHymnTitle };
  const closingHymn = { number: d.closingHymnNumber, title: d.closingHymnTitle };

  try {
    await sql`
      INSERT INTO meetings (
        date, meeting_type, presiding, conducting,
        opening_hymn, opening_prayer, sacrament_hymn,
        closing_hymn, closing_prayer
      ) VALUES (
        ${d.date}, ${d.meetingType}, ${d.presiding}, ${d.conducting},
        ${JSON.stringify(openingHymn)}, ${d.openingPrayer}, ${JSON.stringify(sacramentHymn)},
        ${JSON.stringify(closingHymn)}, ${d.closingPrayer}
      )
    `;
  } catch (error) {
    console.error('Error creating meeting:', error);
    return { message: 'Database Error: Failed to create meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const d = validatedFields.data;
  const openingHymn = { number: d.openingHymnNumber, title: d.openingHymnTitle };
  const sacramentHymn = { number: d.sacramentHymnNumber, title: d.sacramentHymnTitle };
  const closingHymn = { number: d.closingHymnNumber, title: d.closingHymnTitle };

  try {
    await sql`
      UPDATE meetings SET
        date = ${d.date},
        meeting_type = ${d.meetingType},
        presiding = ${d.presiding},
        conducting = ${d.conducting},
        opening_hymn = ${JSON.stringify(openingHymn)},
        opening_prayer = ${d.openingPrayer},
        sacrament_hymn = ${JSON.stringify(sacramentHymn)},
        closing_hymn = ${JSON.stringify(closingHymn)},
        closing_prayer = ${d.closingPrayer}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error updating meeting:', error);
    return { message: 'Database Error: Failed to update meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  try {
    await sql`DELETE FROM meetings WHERE id = ${id}`;
    revalidatePath('/meetings');
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }
}