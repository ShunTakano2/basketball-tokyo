import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type EventOccurrence = {
  id: string;
  title: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  area: string;
  venue_name: string | null;
  participation_type: "spot" | "regular";
  fee_yen: number | null;
  source_site: string;
  source_url: string;
  status: "draft" | "published" | "hidden";
};

function formatParticipationType(value: "spot" | "regular") {
  return value === "spot" ? "スポット" : "定期";
}

function formatFee(value: number | null) {
  if (value === null) return "未設定";
  return `${value.toLocaleString()}円`;
}

function formatTime(start: string | null, end: string | null) {
  if (!start && !end) return "時間未設定";
  if (start && end) return `${start.slice(0, 5)}〜${end.slice(0, 5)}`;
  if (start) return `${start.slice(0, 5)}〜`;
  return `〜${end!.slice(0, 5)}`;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("event_occurrences")
    .select(
      "id, title, event_date, start_time, end_time, area, venue_name, participation_type, fee_yen, source_site, source_url, status"
    )
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !event) {
    notFound();
  }

  const item = event as EventOccurrence;

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Link href="/tokyo-basketball">← 一覧に戻る</Link>
      </div>

      <h1 style={{ marginBottom: "16px" }}>{item.title}</h1>

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          display: "grid",
          gap: "10px",
        }}
      >
        <div>日付: {item.event_date}</div>
        <div>時間: {formatTime(item.start_time, item.end_time)}</div>
        <div>地域: {item.area}</div>
        <div>会場: {item.venue_name ?? "未設定"}</div>
        <div>種別: {formatParticipationType(item.participation_type)}</div>
        <div>費用: {formatFee(item.fee_yen)}</div>
        <div>掲載元: {item.source_site}</div>

        <div style={{ marginTop: "8px" }}>
          <a href={item.source_url} target="_blank" rel="noreferrer">
            元サイトを見る
          </a>
        </div>
      </section>
    </main>
  );
}