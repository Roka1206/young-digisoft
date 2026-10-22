import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Shared social preview: brand mark, a title and a turquoise line on ink.
export async function brandImage({ title, subtitle }: { title: string; subtitle: string }) {
  const mark = await readFile(path.join(process.cwd(), "public/brand/logo-mark.svg"), "utf8");
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(mark.replace("#F1F1F1", "#00adb5")).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#08262b",
        padding: "80px",
        textAlign: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={markSrc} width={168} height={144} alt="" />
      <div
        style={{
          marginTop: 40,
          fontSize: title.length > 30 ? 56 : 72,
          fontWeight: 700,
          color: "#f1f1f1",
          letterSpacing: -1,
          lineHeight: 1.15,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 32,
          color: "#00adb5",
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </div>
    </div>,
    { ...ogSize },
  );
}
