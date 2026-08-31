import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0e11",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #262c33 1px, transparent 0)",
          backgroundSize: "24px 24px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#e2694b" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#d4a24c" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#35d0a0" }} />
        </div>
        <div style={{ display: "flex", color: "#d4a24c", fontSize: 28 }}>
          Senior Backend Engineer
        </div>
        <div style={{ display: "flex", color: "#edeff2", fontSize: 64, fontWeight: 700, marginTop: 12 }}>
          Urvi Solanki
        </div>
        <div style={{ display: "flex", color: "#7c8792", fontSize: 26, marginTop: 24, maxWidth: 900 }}>
          Payment orchestration · event-driven pipelines · real-time infrastructure
        </div>
      </div>
    ),
    { ...size },
  );
}
