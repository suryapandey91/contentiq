/** A small CSS-drawn illustration of the workspace, standing in for the
 *  design prototype's <image-slot> screenshot placeholder — there's no real
 *  screenshot to drop in, so this renders a stylized mock of the generated
 *  card + chart instead. */
export default function WorkspaceMockup() {
  const bars = [38, 62, 45, 80, 55];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: 22,
        background: "var(--color-surface)",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent-300)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent-300)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent-300)" }} />
      </div>
      <div
        style={{
          flex: 1,
          background: "var(--color-bg)",
          border: "1px solid var(--color-divider)",
          borderRadius: 4,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ width: "70%", height: 12, borderRadius: 2, background: "var(--color-divider)" }} />
        <div style={{ width: "45%", height: 8, borderRadius: 2, background: "var(--color-divider)" }} />
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            height: 90,
            paddingTop: 10,
            borderTop: "2px solid var(--color-divider)",
          }}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                background: "var(--color-accent-200)",
                borderTop: "2px solid var(--color-accent)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
