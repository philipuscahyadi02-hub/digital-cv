import { ImageResponse } from "next/og";
import { profile } from "@/data/resume";

export const alt = `${profile.name} — ${profile.roles.join(" / ")}`;
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
          backgroundColor: "#07070b",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(125,211,192,0.16), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7dd3c0",
            fontFamily: "monospace",
          }}
        >
          {profile.location}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#7dd3c0",
            marginTop: 16,
            fontFamily: "monospace",
          }}
        >
          {profile.roles.join("  /  ")}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
            marginTop: 40,
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
