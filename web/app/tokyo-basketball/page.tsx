import Link from "next/link";

export default function TokyoBasketballPage() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>東京バスケ開催情報</h1>
      <div style={{ marginBottom: "16px" }}>
        <Link href="/about">運営情報</Link>
        </div>
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
            <option>今日以降</option>
            <option>今週</option>
            <option>今週末</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>地域</div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
            <option>23区</option>
            <option>多摩</option>
            <option>新宿区</option>
            <option>世田谷区</option>
            <option>調布市</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>
            スポット / 定期
          </div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
            <option>スポット</option>
            <option>定期</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: "14px", marginBottom: "6px" }}>費用</div>
          <select style={{ width: "100%", padding: "8px" }}>
            <option>すべて</option>
            <option>無料</option>
            <option>500円以下</option>
            <option>1000円以下</option>
            <option>1001円以上</option>
          </select>
        </div>
      </section>

      <div style={{ marginBottom: "16px", fontWeight: 700 }}>3件</div>

      <section style={{ display: "grid", gap: "16px" }}>
        <article
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            4/27(日) 18:00-21:00
          </div>
          <h2 style={{ margin: "0 0 10px", fontSize: "22px" }}>
            調布で社会人向けバスケ開催
          </h2>
          <div style={{ display: "grid", gap: "6px", color: "#333" }}>
            <div>調布市 / 大町スポーツ施設</div>
            <div>スポット / 500円</div>
            <div>主催: Neighbor</div>
          </div>

          <Link
            href="/event/test-1"
            style={{ display: "inline-block", marginTop: "12px", fontWeight: 700 }}
          >
            詳細を見る
          </Link>
        </article>

        <article
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            4/28(月) 19:00-21:00
          </div>
          <h2 style={{ margin: "0 0 10px", fontSize: "22px" }}>
            新宿エリア 夜バスケ
          </h2>
          <div style={{ display: "grid", gap: "6px", color: "#333" }}>
            <div>新宿区 / 新宿区内体育館</div>
            <div>スポット / 800円</div>
            <div>主催: Shinjuku Hoops</div>
          </div>
        </article>

        <article
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            5/1(木) 18:30-20:30
          </div>
          <h2 style={{ margin: "0 0 10px", fontSize: "22px" }}>
            世田谷 定期バスケサークル
          </h2>
          <div style={{ display: "grid", gap: "6px", color: "#333" }}>
            <div>世田谷区 / 世田谷区内体育館</div>
            <div>定期 / 1000円</div>
            <div>主催: Setagaya Basketball Circle</div>
          </div>
        </article>
      </section>
    </main>
  );
}