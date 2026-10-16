import React from "react";
import { Img, staticFile } from "remotion";
import { ACADEMY } from "../data/academy";
import { COLORS } from "../styles/theme";
import { PaperPlane } from "./Brand";
import { StarPattern } from "./Geometry";

// A generic messaging-app screen. No real chats, names or messages: content
// rows are abstract placeholders, so nothing is attributed to the academy
// that it did not publish.

const Bar: React.FC<{ w: number | string; o?: number }> = ({ w, o = 0.35 }) => (
  <div style={{ height: 10, width: w, borderRadius: 5, background: `rgba(248,245,237,${o})` }} />
);

const Bubble: React.FC<{ children: React.ReactNode; appear: number; side?: "start" | "end" }> = ({ children, appear, side = "start" }) => (
  <div
    style={{
      alignSelf: side === "start" ? "flex-start" : "flex-end",
      maxWidth: "82%",
      background: side === "start" ? "rgba(10,70,52,0.92)" : "rgba(212,175,55,0.22)",
      border: `1px solid rgba(231,215,162,${side === "start" ? 0.18 : 0.35})`,
      borderRadius: 18,
      padding: 14,
      opacity: appear,
      translate: `0 ${(1 - appear) * 30}px`,
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    }}
  >
    {children}
  </div>
);

export const PhoneMockup: React.FC<{ width?: number; messages: number[] }> = ({ width = 400, messages }) => {
  const h = width * 2.06;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: width * 0.14,
        padding: width * 0.035,
        background: "linear-gradient(145deg, #2b2b2b, #0c0c0c 40%, #1d1d1d)",
        boxShadow: `0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(231,215,162,0.35), 0 0 0 1px rgba(0,0,0,0.8)`,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: width * 0.11, overflow: "hidden", background: "#041d16" }}>
        <StarPattern width={width} height={h} tile={70} stroke="rgba(212,175,55,0.08)" strokeWidth={1} />
        {/* Header */}
        <div dir="rtl" style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "56px 18px 14px", display: "flex", alignItems: "center", gap: 12, background: "rgba(6,44,36,0.96)", borderBottom: "1px solid rgba(231,215,162,0.2)" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.ivory, overflow: "hidden", flexShrink: 0, boxShadow: `0 0 0 2px ${COLORS.gold}` }}>
            <Img src={staticFile(ACADEMY.logo)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
            <div style={{ fontFamily: "Tajawal", fontWeight: 700, fontSize: 19, color: COLORS.ivory, lineHeight: 1.2 }}>{ACADEMY.name}</div>
            <Bar w="45%" o={0.25} />
          </div>
        </div>
        {/* Messages */}
        <div dir="rtl" style={{ position: "absolute", top: 150, left: 16, right: 16, bottom: 90, display: "flex", flexDirection: "column", gap: 14, justifyContent: "flex-end" }}>
          <Bubble appear={messages[0] ?? 1}>
            <div style={{ height: 120, borderRadius: 12, overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #0a5c46, #062c24)", marginBottom: 12 }}>
              <StarPattern width={300} height={120} tile={60} stroke="rgba(212,175,55,0.5)" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Bar w="80%" o={0.55} />
              <Bar w="60%" />
            </div>
          </Bubble>
          <Bubble appear={messages[1] ?? 1}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderRight: `14px solid ${COLORS.forest}`, marginRight: 4 }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, height: 34 }}>
                {[10, 20, 14, 28, 18, 30, 12, 24, 16, 26, 10, 20, 14, 22, 8, 18].map((v, i) => (
                  <div key={i} style={{ width: 4, height: v, borderRadius: 2, background: i < 6 ? COLORS.champagne : "rgba(231,215,162,0.4)" }} />
                ))}
              </div>
            </div>
          </Bubble>
          <Bubble appear={messages[2] ?? 1}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 52, borderRadius: 8, border: `2px solid ${COLORS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 22, height: 3, background: COLORS.gold, boxShadow: `0 8px 0 ${COLORS.gold}, 0 -8px 0 ${COLORS.gold}` }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 170 }}>
                <Bar w="90%" o={0.55} />
                <Bar w="50%" />
              </div>
            </div>
          </Bubble>
          <Bubble appear={messages[3] ?? 1} side="end">
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 150 }}>
              <Bar w="100%" o={0.5} />
              <Bar w="60%" />
            </div>
          </Bubble>
        </div>
        {/* Composer */}
        <div style={{ position: "absolute", bottom: 18, left: 16, right: 16, height: 54, borderRadius: 27, background: "rgba(248,245,237,0.08)", border: "1px solid rgba(231,215,162,0.2)", display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 10px" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PaperPlane size={22} color={COLORS.forest} />
          </div>
        </div>
      </div>
    </div>
  );
};
