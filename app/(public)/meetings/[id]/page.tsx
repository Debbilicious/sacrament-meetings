import type { Metadata } from "next";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return { title: "Meeting Not Found" };
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return { title: "Meeting Not Found" };
  }

  const formattedDate = new Date(meeting.date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    title: formattedDate,
    description: `Sacrament meeting program for ${formattedDate}, presided over by ${meeting.presiding}.`,
  };
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="py-12">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}