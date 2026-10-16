import { useVideoConfig } from "remotion";

/** Layout facts every scene needs to adapt between 16:9 and 9:16. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  // 1 unit = 1px on a 1920×1080 or 1080×1920 canvas.
  const u = Math.min(width, height) / 1080;
  return { width, height, portrait, u };
};
