import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import EditMeetingForm from './edit-meeting-form';

export default async function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold mb-6">Edit Meeting</h1>
      <EditMeetingForm meeting={meeting} />
    </main>
  );
}