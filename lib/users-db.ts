import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string): Promise<UserAccount | null> {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (rows.length === 0) return null;
  return rows[0] as UserAccount;
}