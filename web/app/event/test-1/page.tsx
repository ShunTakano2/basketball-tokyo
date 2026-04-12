export default function EventDetailPage() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "16px" }}>調布で社会人向けバスケ開催</h1>

      <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
        <div>
          <strong>開催日:</strong> 2026/4/27(日)
        </div>
        <div>
          <strong>時間:</strong> 18:00-21:00
        </div>
        <div>
          <strong>地域:</strong> 調布市
        </div>
        <div>
          <strong>会場:</strong> 大町スポーツ施設
        </div>
        <div>
          <strong>費用:</strong> 500円
        </div>
        <div>
          <strong>参加タイプ:</strong> スポット
        </div>
        <div>
          <strong>主催:</strong> Neighbor
        </div>
      </div>

      <section>
        <h2 style={{ marginBottom: "8px" }}>イベント内容</h2>
        <p style={{ lineHeight: 1.8 }}>
          初心者歓迎の社会人向けバスケです。軽くアップをしてからゲーム中心で進めます。
          室内シューズを持参してください。
        </p>
      </section>
    </main>
  );
}