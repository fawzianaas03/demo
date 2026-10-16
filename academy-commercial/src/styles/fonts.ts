import { continueRender, delayRender, staticFile } from "remotion";
import faces from "./fonts.generated.json";

// Fonts are bundled locally (scripts/fetch-fonts.mjs) so renders never depend
// on the network. The Arabic and Latin subsets are declared with their
// unicode-range, exactly as Google Fonts serves them.

const STYLE_ID = "academy-fonts";

if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const handle = delayRender("Loading Arabic fonts");
  const css = faces
    .map(
      (f) => `@font-face{font-family:'${f.family}';font-weight:${f.weight};font-style:normal;font-display:block;src:url('${staticFile(
        `fonts/${f.file}`,
      )}') format('woff2');unicode-range:${f.unicodeRange};}`,
    )
    .join("\n");
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);

  const loads = faces.map((f) =>
    document.fonts.load(`${f.weight} 32px '${f.family}'`, f.subset === "arabic" ? "عربي" : "Aa"),
  );
  Promise.all(loads)
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}
