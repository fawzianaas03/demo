import React from "react";
import QRCode from "qrcode";
import { Img, staticFile } from "remotion";
import { ACADEMY } from "../data/academy";
import { COLORS } from "../styles/theme";
import { khatam } from "./Geometry";

/** The academy logo on an ivory disc inside a drawn double gold ring. */
export const LogoMedallion: React.FC<{ size: number; ring?: number; reveal?: number; glow?: number }> = ({
  size,
  ring = 1,
  reveal = 1,
  glow = 1,
}) => {
  const r = size / 2;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: -size * 0.35,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(231,215,162,0.45) 0%, rgba(212,175,55,0.15) 40%, rgba(212,175,55,0) 70%)",
          opacity: glow,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: size * 0.06,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 42%, #FFFFFF 0%, #FFFFFF 52%, ${COLORS.ivory} 72%, #E6DDC6 100%)`,
          boxShadow: "inset 0 0 22px rgba(120,90,20,0.35), 0 12px 40px rgba(0,0,0,0.5)",
          overflow: "hidden",
          opacity: reveal,
          scale: String(0.9 + 0.1 * reveal),
        }}
      >
        {/* multiply drops the JPEG's white box into the disc */}
        <Img src={staticFile(ACADEMY.logo)} style={{ position: "absolute", left: "5%", top: "4%", width: "90%", height: "90%", objectFit: "contain", mixBlendMode: "multiply" }} />
      </div>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <circle cx={r} cy={r} r={r - 2} fill="none" stroke={COLORS.gold} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform={`rotate(-90 ${r} ${r})`} />
        <circle cx={r} cy={r} r={r + 10} fill="none" stroke={COLORS.champagne} strokeWidth={1} opacity={0.7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform={`rotate(90 ${r} ${r})`} />
        {[0, 90, 180, 270].map((a) => (
          <polygon
            key={a}
            points={khatam(r + Math.cos((a * Math.PI) / 180) * (r + 10), r + Math.sin((a * Math.PI) / 180) * (r + 10), 7 * ring)}
            fill={COLORS.gold}
          />
        ))}
      </svg>
    </div>
  );
};

/** A generic paper-plane glyph (not a trademarked logo). */
export const PaperPlane: React.FC<{ size: number; color?: string }> = ({ size, color = COLORS.gold }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M 4 22 L 44 6 L 36 42 L 24 32 L 18 40 L 17 29 Z" fill="none" stroke={color} strokeWidth={2.6} strokeLinejoin="round" />
    <path d="M 17 29 L 44 6" stroke={color} strokeWidth={2.2} />
  </svg>
);

/** Crisp QR code generated from the official link, drawn in deep emerald on ivory. */
export const QrCodeSvg: React.FC<{ value: string; size: number }> = ({ value, size }) => {
  const qr = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const quiet = 2;
  const cell = size / (n + quiet * 2);
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (qr.modules.get(x, y)) {
        rects.push(<rect key={`${x}-${y}`} x={(x + quiet) * cell} y={(y + quiet) * cell} width={cell + 0.3} height={cell + 0.3} />);
      }
    }
  }
  return (
    <svg width={size} height={size} style={{ background: COLORS.ivory, borderRadius: 14 }}>
      <g fill={COLORS.forest}>{rects}</g>
    </svg>
  );
};

/**
 * The join block of the end screen. Shows a QR from ACADEMY.telegramUrl (or a
 * supplied QR image) plus the printed link. With neither configured it renders
 * nothing, so the end screen never shows an invented address.
 */
export const JoinCode: React.FC<{ size: number }> = ({ size }) => {
  const url = ACADEMY.telegramUrl;
  const image = ACADEMY.qrImage;
  if (!url && !image) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ padding: 10, borderRadius: 22, background: "linear-gradient(145deg, #F6E7B0, #D4AF37 50%, #9C7A1E)", boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}>
        {url ? (
          <QrCodeSvg value={url} size={size} />
        ) : (
          <Img src={staticFile(image)} style={{ width: size, height: size, borderRadius: 14, background: COLORS.ivory, objectFit: "contain", display: "block" }} />
        )}
      </div>
      {(ACADEMY.telegramLabel || url) && (
        <div style={{ fontFamily: "Tajawal", fontWeight: 500, fontSize: size * 0.13, color: COLORS.champagne, direction: "ltr", letterSpacing: 0.5 }}>
          {ACADEMY.telegramLabel || url.replace(/^https?:\/\//, "")}
        </div>
      )}
    </div>
  );
};
