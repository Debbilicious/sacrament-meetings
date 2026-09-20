import CreateMeetingForm from './create-meeting-form';

export default function NewMeetingPage() {
  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold mb-6">Create Meeting</h1>
      <CreateMeetingForm />
    </main>
  );
}