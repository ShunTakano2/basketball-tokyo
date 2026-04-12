export default function AboutPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1>運営情報</h1>

      <p style={{ lineHeight: 1.8 }}>
        本サイトは、公開されている東京のバスケ開催情報を整理して掲載する情報サイトです。
      </p>

      <section style={{ marginTop: "24px" }}>
        <h2>更新方針</h2>
        <p style={{ lineHeight: 1.8 }}>
          掲載情報は定期的に更新し、過去開催や募集終了情報は順次整理します。
        </p>
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>注意事項</h2>
        <p style={{ lineHeight: 1.8 }}>
          最新情報や参加条件は、必ず元の募集ページもあわせてご確認ください。
        </p>
      </section>
    </main>
  );
}