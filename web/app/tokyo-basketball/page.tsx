import Link from "next/link";
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

export default async function TokyoBasketballPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("event_occurrences")
    .select(
      "id, title, event_date, start_time, end_time, area, venue_name, participation_type, fee_yen, source_site, source_url, status"
    )
    .eq("status", "published")
    .order("event_date", { ascending: true });

  const eventList = (events ?? []) as EventOccurrence[];

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ marginBottom: "8px" }}>東京バスケ開催情報</h1>
      <p style={{ marginTop: 0, marginBottom: "24px", color: "#555" }}>
        東京のバスケ開催情報を、日付・地域・参加タイプで探せるサイトです。
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>日にち</div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>地域</div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>
            スポット / 定期
          </div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>費用</div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
          </select>
        </div>
      </section>

      <div style={{ marginBottom: "16px" }}>
        <Link href="/about">運営情報</Link>
      </div>

      {error ? (
        <p style={{ color: "red" }}>
          データ取得に失敗しました: {error.message}
        </p>
      ) : eventList.length === 0 ? (
        <p>掲載中のイベントはまだありません。</p>
      ) : (
        <section style={{ display: "grid", gap: "16px" }}>
          {eventList.map((event) => (
            <article
              key={event.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <h2 style={{ marginTop: 0, marginBottom: "8px" }}>{event.title}</h2>

              <div style={{ display: "grid", gap: "6px", color: "#444" }}>
                <div>日付: {event.event_date}</div>
                <div>時間: {formatTime(event.start_time, event.end_time)}</div>
                <div>地域: {event.area}</div>
                <div>会場: {event.venue_name ?? "未設定"}</div>
                <div>
                  種別: {formatParticipationType(event.participation_type)}
                </div>
                <div>費用: {formatFee(event.fee_yen)}</div>
                <div>掲載元: {event.source_site}</div>
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                <Link href={`/event/${event.id}`}>詳細を見る</Link>
                <a href={event.source_url} target="_blank" rel="noreferrer">
                  元サイト
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}