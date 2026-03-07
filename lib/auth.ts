import { cookies } from 'next/headers';

export async function getIsMember(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('club_session')?.value === 'member';
}

export function authReturn(path: string): string {
  return `/auth?return=${encodeURIComponent(path)}`;
}
